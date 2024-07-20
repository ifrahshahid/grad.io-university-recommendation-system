import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import floatmen from '../images/float-men.png';
import floatwomen from '../images/floatwomen.png';
import doodle1 from '../images/doodle1.png';
import doodle2 from '../images/doodle2.png';
import { BASE_URL } from '../config';

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

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
  }, []);



  return (
    <div className="">
      {loading ? (
        <div></div>
      ) : auth ? (
        <div>
          <Navbar />

          <div className="container mt-3">
            <div className="row">
              <div className="col-md-3 test-box  ">
                <div className="d-flex justify-content-end">

                  <img className="m-2 doodle1 doodle1-for-moblie" src={doodle1} alt="Logo" />
                </div>
                <div className='d-flex align-items-end'>

                  <div className='d-flex 2cartoon-for-mobile '>

                    <img className="floatmen floatmen-for-moblie m-2" src={floatmen} alt="Logo" />

                    <img className="floatwomen-for-desktop  m-2" src={floatwomen} alt="Logo" />

                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className='d-flex flex-column justify-content-center align-items-center'>
                  <h2 className='First-heading-home'>The start of your dream career
                  </h2>

                  <h4 className='second-heading-home mt-5'>Discover top-notch universities from all corners of Pakistan that perfectly suit your needs.</h4>
                  <Link to="/academic">
                    <button type="button" class="btn start-now-btn mt-4">Start Now </button></Link>


                </div>

              </div>
              <div className="col-md-3 test-box ">
                <div className=''>
                  <img className="floatwomen floatwomen-for-moblie m-2" src={floatwomen} alt="Logo" />

                  <div className=''>
                    <img className="doodle2 m-2" src={doodle2} alt="Logo" />

                  </div>

                </div>
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

export default Home;