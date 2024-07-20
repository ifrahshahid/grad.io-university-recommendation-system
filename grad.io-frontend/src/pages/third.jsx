import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import floatwomen from '../images/floatwomen.png';
import doodle2 from '../images/doodle2.png';
import { Navigate } from 'react-router-dom';
import { BASE_URL } from '../config';



function PersonalityTraitTest() {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState(Array(5).fill(0));
  const navigate = useNavigate();
  const [showtest, setShowtest] = useState(true);
  const [showForm, setshowForm] = useState(false);
  const [values, setValues] = useState({
    userId: localStorage.getItem("userId"),
    user_desire: "",
    user_target: "",

  })

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

    axios.get(`${BASE_URL}/getRandomQuestions`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`

      }
    })
      .then(res => {
        setQuestions(res.data.questions);
      })
      .catch(err => {
        console.error('Error fetching questions:', err);
      });
  }, []);

  const handleDelete = () => {
    axios.get(`${BASE_URL}/logout`)
      .then(res => {
        location.reload(true);
      }).catch(err => console.log(err));
  }

  const handleNextPage = () => {
    setCurrentQuestionIndex(prevIndex => (prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handlePrevPage = () => {
    setCurrentQuestionIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleRadioChange = (option) => {
    setUserResponses(prevResponses => {
      const newResponses = [...prevResponses];
      newResponses[currentQuestionIndex] = option;
      return newResponses;
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleTestForm();
    }
  };


  const handleTestForm = () => {
    setshowForm(true);
    setShowtest(false);
  }

  const handleSubmitResponses = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if user_desire and user_target are not empty
    if (!values.user_target.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill something in input box",
      });
      return;
    }


    try {
      // First request to submit responses
      const responsesRes = await axios.post(`${BASE_URL}/submitResponses`, {
        userId: localStorage.getItem("userId"),
        userResponses,
        questions, // Include the questions array in the request
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`

        }
      });
      console.log(responsesRes);
      console.log("Response saved:", responsesRes.data);

      // Second request to submit user preference
      const preferenceRes = await axios.post(`${BASE_URL}/submituser_preference`, values, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`

        }
      });
      console.log("Response Status:", preferenceRes.data.Status);

      if (preferenceRes.data.Status === "success") {
        Swal.fire({
          title: "Successful!",
          text: "Your preference is submitted!",
          icon: "success"
        }).then(() => {
          navigate('/Fourth');
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please try again",
        });
      }
    } catch (err) {
      console.error('Error:', err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please try again",
      });
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
            <h4 className='second-first-text'>Personality Traits Test</h4>



            {showtest && (
              <div className="container second-page-row p-4">
                <div className="container ppt-cont">
                  <div className="pt-5">
                    <div className="row raisec-question-main-cont px-5">
                      <div className="col-md-6">
                        {/* page1 */}
                        {currentPage === 1 && questions.length > 0 && questions[currentQuestionIndex] && (
                          <div className="page">
                            <div className='quest-style'>
                              <p>{currentQuestionIndex + 1}. </p>
                              <p>{questions[currentQuestionIndex].QuestionText}</p>
                            </div>
                            {/* Radio buttons for options */}
                            <div className="radio-buttons mt-3">
                              {["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].map(option => (
                                <div key={option} className="radio-button quest-style py-1">
                                  <input
                                    type="radio"
                                    className='ptt-radio'
                                    id={`option-${option}`}
                                    name={`question-${currentQuestionIndex + 1}`}
                                    value={option}
                                    checked={userResponses[currentQuestionIndex] === option}
                                    onChange={() => handleRadioChange(option)}
                                  />
                                  <label htmlFor={`option-${option}`} className='ptt-radio-Lable'>{option}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex justify-content-end">
                          <img className="floatwomen2 " src={floatwomen} alt="Logo" />
                        </div>
                        <div className='d-flex justify-content-center'>
                          <img className="doodle12" src={doodle2} alt="Logo" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container mt-3 p-0 d-flex justify-content-between">
                  <button id="prevPage" className='ptt-buttons' onClick={handlePrevPage}>Back</button>
                  <div id="pageId">{currentQuestionIndex + 1}/{questions.length}</div>
                  {currentQuestionIndex === questions.length - 1 ? (
                    <button id="submitResponses" className='ptt-buttons' onClick={handleTestForm}>Submit</button>
                  ) : (
                    <>
                      {currentQuestionIndex === questions.length - 1 ? (
                        <button id="nextPage" className='ptt-buttons' onClick={handleNextPage}>Submit</button>
                      ) : (
                        <button id="nextPage" className='dis-ptt-button'>Submit</button>
                      )}
                    </>
                  )}
                </div>

              </div>
            )}


            {showForm && (
              <div className="container second-page-row p-4">
                <div className="container ppt-cont">
                  <div className="pt-5">
                    <div className="row ps-5">
                      <div className="col-md-6">
                        <form className="mt-1 mb-3 last-user-input-box  d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmitResponses}>
                          <div>
                            {/* <textarea
                              className='fourth-textarea shadow-lg p-3 mb-2 bg-body-tertiary rounded'
                              placeholder="What is your desired domain?"
                              required
                              onChange={e => setValues({ ...values, user_desire: e.target.value })}
                            ></textarea> */}
                          </div>
                          <div>
                            <textarea
                              className='fourth-textarea shadow-lg p-3 mb-2 bg-body-tertiary rounded'
                              placeholder="What are your current areas of interest?"
                              required
                              onChange={e => setValues({ ...values, user_target: e.target.value })}
                            ></textarea>
                          </div>

                          <button id="submitResponses" className='ptt-buttons' type='submit'>Submit</button>
                          {/* {values.user_target.trim() ? (
                          ) : (
                            <button className='ptt-buttons' onClick={() => alert('Please enter some text')}>Submit</button>
                          )} */}
                        </form>

                      </div>
                      <div className="col-md-6">
                        <div className="d-flex justify-content-end">
                          <img className="floatwomen2 " src={floatwomen} alt="Logo" />
                        </div>
                        <div className='d-flex justify-content-center'>
                          <img className="doodle12" src={doodle2} alt="Logo" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}



          </div>
        </div>
      ) : (
        <Navigate to='/' replace />
      )}
    </div>
  );
}

export default PersonalityTraitTest;