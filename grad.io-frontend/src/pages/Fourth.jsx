import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { Link, Navigate } from 'react-router-dom';
import floatwomen from '../images/floatwomen.png';
import doodle2 from '../images/doodle2.png';
import floatmen from '../images/float-men.png';
import { BASE_URL } from '../config';
import Confetti from 'react-confetti'
function Fourth() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [userResponses, setUserResponses] = useState([]);
  const [totalZeroWeight, setTotalZeroWeight] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mappingData, setMappingData] = useState([]);
  const [suggestedUniversityPrograms, setSuggestedUniversityPrograms] = useState([]);
  const [data, setData] = useState(null);

  const [values, setValues] = useState({
    // user_id: "1",
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
    axios.post(`${BASE_URL}/getuserresponse`, { "userId": localStorage.getItem('userId') }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`

      }
    })
      .then(res => {
        const { disciplinesResult, userTarget } = res.data;
        console.log('user response:', disciplinesResult, userTarget);
        axios.post("http://209.97.144.39/get-data", { disciplinesResult, userTarget }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

      })
      .catch(error => {
        console.error('Error fetching user response:', error);
      })
      .finally(() => {
        setLoading(false);
      });


  }, []);


  return (
    <div className="">
      {loading ? (
        <div></div>
      ) : auth ? (
        <div className="">
          <Navbar />
          {auth ? (

            <div className="container mt-1 ">
              <hr />
              <Confetti />


              <div className="container">
                <div className="fourth_main_height d-flex justify-content-center  d-flex ">
                  <div className="">
                    <h2 className='fourt-main-heading-home'>Thanks your response has been <br /> submitted!</h2>
                    <h4 className='second-heading-home mt-3'>You are very close to your result.</h4>
                    <div class="row justify-content-center mt-5">
                      <div class="col-auto">
                        <Link to='/Finalresult'>

                          <button class="animated-button">
                            <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z">
                              </path>
                            </svg>
                            <span class="text">Proceed further</span>
                            <span class="circle"></span>
                            <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z">
                              </path>
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>




            </div>
          ) : (
            <div>
              <h3>You are not Authorized </h3>
              <Link to="/" className="btn btn-primary">
                Login
              </Link>
            </div>
          )}
        </div>

      ) : (
        <Navigate to='/' replace />
      )}
    </div>
  );
}

export default Fourth;
