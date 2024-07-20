import re
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import nltk
from nltk.stem import PorterStemmer, WordNetLemmatizer
from spellchecker import SpellChecker
from sentence_transformers import SentenceTransformer, util
import os

nltk.download("punkt")
nltk.download("wordnet")
nltk.download("omw-1.4")
nltk.download("stopwords")

app = Flask(__name__)
CORS(app)

# Initialize the results variable as an empty list
results = []

def main(discipline_data, user_input):
    global results  # Use the global results variable
    
    all_text = set()
    for discipline in discipline_data:
        all_text.update(discipline["discipline_title"].split())

    all_text_ready = [
        re.sub(r"[^a-zA-Z]", "", wt).lower()
        for wt in all_text
        if re.sub(r"[^a-zA-Z]", "", wt)
    ]

    if not user_input or re.match(r"^[\s\W]+$", user_input):
        return []

    user_input = nltk.word_tokenize(user_input)
    user_input_ready = [
        re.sub(r"[^a-zA-Z]", "", word).lower()
        for word in user_input
        if re.sub(r"[^a-zA-Z]", "", word)
    ]

    final_input = [word for word in user_input_ready if word in all_text_ready]

    spell = SpellChecker()
    for word in user_input_ready:
        candidate = spell.candidates(word)
        if candidate:
            candidate = list(candidate)
            first_candidate = candidate[0]
            if first_candidate not in final_input:
                final_input.append(first_candidate)

    ps = PorterStemmer()
    wnl = WordNetLemmatizer()
    combined_input = user_input_ready + final_input

    root_word = []
    for word in combined_input:
        stemmed = ps.stem(word)
        lemmatized = wnl.lemmatize(word)
        root_word.append(stemmed)
        if lemmatized not in root_word:
            root_word.append(lemmatized)

    for text in all_text_ready:
        for root in root_word:
            if ps.stem(text) == root or wnl.lemmatize(text) == root:
                if text not in final_input:
                    final_input.append(text)

    if final_input:
        model = SentenceTransformer("all-mpnet-base-v2")
        sentence_embedding = model.encode(
            [d["discipline_title"] for d in discipline_data],
            show_progress_bar=True,
            normalize_embeddings=True,
        )
        user_embeddings = model.encode(
            final_input, show_progress_bar=True, normalize_embeddings=True
        )

        results = util.semantic_search(
            user_embeddings, sentence_embedding, top_k=10, score_function=util.cos_sim
        )

        matched_disciplines = []
        for result in results[0]:
            if result["score"] <= 0.9:
                matched_disciplines.append({
                    "code": discipline_data[result["corpus_id"]]["trait_type_combination"],
                    "discipline": discipline_data[result["corpus_id"]]["discipline_title"],
                    "score": result["score"]
                })

        # Store the matched disciplines in the global results variable
        results = matched_disciplines

        # Return the matched disciplines directly if needed (optional)
        return matched_disciplines

    return []

@app.route("/get-data", methods=["POST"])
@cross_origin(supports_credentials=True)
def index():
    data = request.get_json()
    disciplines = data["disciplinesResult"]
    user_input = data["userTarget"]

    matched_disciplines = main(disciplines, user_input)

    return jsonify({"matched_disciplines": matched_disciplines})

@app.route("/get-results", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_results():
    global results  # Use the global results variable
    disciplines_only = [result["discipline"] for result in results]
    return jsonify({"disciplines": disciplines_only})

if __name__ == "__main__":
    port = os.environ.get("PORT",5000)
    app.run(port=port, host="0.0.0.0", debug=True)
