import natural from "natural";
import Sentiment from 'sentiment';
const sentiment = new Sentiment();

const stemmer = natural.PorterStemmer;
const TfIdf = natural.TfIdf;
const TextAnalysis = new TfIdf();

//ghantalelo
//onichan118@gmail.com

function analyzeDisciplines(desiredField, interest, disciplines) {
    const allText = (desiredField + " " + interest);
    TextAnalysis.addDocument(allText);
    TextAnalysis.addDocument(disciplines.join(' '));
    const sentimentAnalysis = sentiment.analyze(allText);
    
    // const WordsInText = TextAnalysis.listTerms(0).reduce((counts, term) => {
    //     counts[term.term] = term.tf;
    //     return counts;
    // }, {});
    const WordsInText = TextAnalysis.listTerms(0)
    console.log(WordsInText)
    
    const topNTerms = Object.keys(WordsInText).sort((a, b) => WordsInText[b] - WordsInText[a]).slice(0, 4);
    
    const suggestedDisciplines = disciplines.filter((discipline) => topNTerms.some(term => stemmer.stem(discipline.toLowerCase()).includes(stemmer.stem(term.toLowerCase()))));
    
    console.log("Suggested Disciplines:", suggestedDisciplines);
    
    if (sentimentAnalysis.score > 0) {
        console.log(`You are very much Positive about learning these disciplines: ${suggestedDisciplines}`);
    } else if (sentimentAnalysis.score < 0) {
        console.log(`You will most likely won't find these disciplines interesting: ${suggestedDisciplines}`);
    } else {
        console.log(`You are neutral about these disciplines: ${suggestedDisciplines}`);
    }
}


const desiredField = "Theory (like math equations) and practical stuff we see every day.";
const interest = "I love math and physics! Solving tricky math problems and understanding how things move and work in the world really excites me. Math iIn the future, I see myself using math to solve real-world problems in physics. I want to be someone who can connect the dots between ts like solving puzzles, and physics helps me understand how things like energy and motion work.";
//I love math and physics! Solving tricky math problems and understanding how things move and work excite me. In the future, I see myself using math to solve real-world problems in physics. I want to be someone who can connect the dots between ts like solving puzzles, and physics helps me understand how things like energy and motion work.
//Theory (like math equations) and practical stuff we see every day.
const disciplines = [
    'Actuarial Science (ASC)',
    'Agribusiness & Applied Economics (FAES)',
    'Aviation (ENGR)',
    'Business: Finance (FCOB)',
    'Business: Information Systems (FCOB)',
    'Business: Logistics Management (FCOB)',
    'Business: Operations Management (FCOB)',
    'Computer Science (ASC or ENGR)',
    'Consumer & Family Financial Services (EHE)',
    'Data Analytics (ASC)',
    'Education: Business Education Teacher (EHE)',
    'Engineering (ENGR)',
    'Environmental Policy & Decision Making (ENR)',
    'Family & Consumer Sciences Education (EHE)',
    'Health Information Management Systems (HRS)',
    'Health Sciences (HRS)',
    'Nutrition (EHE)',
    'Political Science (ASC)',
    'Social Sciences Air Transportation (ASC)'
];

analyzeDisciplines(desiredField, interest, disciplines);


//usman114@gmail.com