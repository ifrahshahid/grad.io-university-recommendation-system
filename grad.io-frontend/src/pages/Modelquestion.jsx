import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { useNavigate, Navigate } from 'react-router-dom';
import floatwomen from '../images/floatwomen.png';
import doodle2 from '../images/doodle2.png';
import { BASE_URL } from '../config';

export default function Modelquestion() {

    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [questions, setQuestions] = useState([]);
    const [userResponses, setUserResponses] = useState({});
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(`${BASE_URL}/home`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
      
            }
          })
            .then(res => {
                console.log(res);
                if (res.data.Status === 'success') {
                    setAuth(true);
                    setName(res.data.name);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => {
                console.error('Error:', err);
            })
            .finally(() => {
                setLoading(false);
            });


        axios.get(`${BASE_URL}/getmodelsquestions`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
      
            }
          })
            .then(res => {
                setQuestions(res.data.questions);
                // Initialize userResponses object with default values for each question
                const initialUserResponses = {};
                res.data.questions.forEach(question => {
                    initialUserResponses[question.QuestionID] = '';
                });
                setUserResponses(initialUserResponses);
            })
            .catch(err => {
                console.error('Error fetching questions:', err);
            });
    }, []);

    const handleInputChange = (questionID, value) => {
        setUserResponses(prevResponses => ({
            ...prevResponses,
            [questionID]: value
        }));
    };

    const handleSubmit = () => {
        // Send user responses to the backend
        axios.post(`${BASE_URL}/submituserresponses`, { userResponses }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`
            }
          })
            .then(res => {
                console.log(res.data);
                // Redirect or show success message as needed
            })
            .catch(err => {
                console.error('Error submitting user responses:', err);
                // Handle error
            });
    };

    const getOptionsForQuestion = (questionID) => {
        // Customize options based on question ID
        switch (questionID) {
            case 'Gender':
                return [{ text: "Male", value: 1 }, { text: "Female", value: 2 }, { text: "Other", value: 3 }];
            case 'Engnat':
                return [{ text: "Yes", value: 1 }, { text: "No", value: 2 }];
            case 'Urban':
                return [{ text: "Rural (countryside)", value: 1 }, { text: "Suburban", value: 2 }, { text: "Urban (town, city)", value: 3 }];

            case 'Hand':
                return [{ text: "Right", value: 1 }, { text: "Left", value: 2 }, { text: "Both", value: 3 }];
            case 'Religion':
                return [{ text: "Agnostic", value: 1 }, { text: "Atheist", value: 2 }, { text: "Buddhist", value: 3 },
                { text: "Christian (Catholic)", value: 4 }, { text: "Christian (Mormon)", value: 5 }, { text: "Christian (Protestant)", value: 6 }, { text: "Christian (Other)", value: 7 }, { text: "Hindu", value: 8 }, { text: "Jewish", value: 9 }, { text: "Muslim", value: 10 }, { text: "Sikh", value: 11 }, { text: "Other", value: 12 }];

            case 'Orientation':
                return [{ text: "Heterosexual", value: 1 }, { text: "Bisexual", value: 2 }, { text: "Homosexual", value: 3 }, { text: "Asexual", value: 4 }, { text: "Other", value: 5 }];
            case 'Race':
                return [{ text: "Asian", value: 1 }, { text: "Arab", value: 2 }, { text: "Black", value: 3 }, { text: "Indigenous Australian / Native American / White", value: 4 }, { text: "Other", value: 5 }];
            case 'Education':
                return [{ text: "Less than high school", value: 1 }, { text: "High school", value: 2 }, { text: "University degree", value: 3 }, { text: "Graduate degree", value: 4 }];
            default:
                return [{ text: "Disagree strongly", value: 1 }, { text: "Disagree moderately", value: 2 }, { text: "Disagree a little", value: 3 }, { text: "Neither agree nor disagree", value: 4 }, { text: "Agree a little", value: 5 }, { text: "Agree a little", value: 5 }, { text: "Agree moderately", value: 6 }, { text: "Agree strongly", value: 7 }];

        }
    };

    return (
        <div className="">
            {loading ? (
                <div></div>
            ) : auth ? (
                <div>
                    <Navbar />
                    <div className="container mt-1">
                        <h4 className='second-first-text'>Let us know a little bit about you</h4>
                        <div className="row second-page-row mb-5">
                            <div className="col-md-6 second-page-firstcolumn mt-2">
                                {questions.filter(question => question.QuestionID.startsWith('TIPI')).map(question => (
                                    <div key={question.QuestionID} className="pt-4">
                                        <h3 id={`modelquestion_${question.QuestionID}`} className='secQ1 question'>{question.QuestionText}</h3>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={userResponses[question.QuestionID]}
                                            onChange={(e) => handleInputChange(question.QuestionID, e.target.value)}
                                        >
                                            <option value="">Select an option</option>
                                            {getOptionsForQuestion(question.QuestionID).map((option, index) => (
                                                <option key={index} value={option.value}>{option.text}</option>
                                            ))}
                                        </select>

                                    </div>
                                ))}
                            </div>
                            <div className="col-md-6 second-page-firstcolumn ">
                                {questions.filter(question => !question.QuestionID.startsWith('TIPI')).map(question => (
                                    <div key={question.QuestionID} className="pt-4">
                                        <h3 id={`modelquestion_${question.QuestionID}`} className='secQ1 question'>{question.QuestionText}</h3>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={userResponses[question.QuestionID]}
                                            onChange={(e) => handleInputChange(question.QuestionID, e.target.value)}
                                        >
                                            <option value="">Select an option</option>
                                            {getOptionsForQuestion(question.QuestionID).map((option, index) => (
                                                <option key={index} value={option.value}>{option.text}</option>
                                            ))}
                                        </select>

                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-secondary second-proceed-btn ms-1 mt-4"
                                    onClick={handleSubmit}
                                >
                                    Proceed
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to='/' replace />
            )}
        </div>
    );
}