import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { useNavigate, Navigate } from 'react-router-dom';
import { BASE_URL } from '../config';



function Academic() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [markingCriteria, setMarkingCriteria] = useState('');
  const [percentage, setPercentage] = useState('');
  const [gender, setgender] = useState('Male');
  const [universitySector, setUniversitySector] = useState('Private');
  const [selectedCity, setSelectedCity] = useState('Karachi');

  const handlePercentageChange = (e) => {

    let value = e.target.value;
    if (!value.includes('%')) {
      value += '%';
    }
    setPercentage(value);
  };


  const handlegenderChange = (e) => {
    setgender(e.target.value);
  };

  const handleUniversitySectorChange = (e) => {
    setUniversitySector(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleProceed = () => {
    const token = localStorage.getItem("token")
    if (!percentage.trim()) {
      alert("Please enter percentage");
      return;
    }
    const data = {
      userId:localStorage.getItem("userId"),
      percentage,
      gender,
      universitySector,
      selectedCity
    };

    axios.post(`${BASE_URL}/save-academic-data`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token

      }
    },)
      .then(res => {
        console.log(res.data);
        navigate("/PersonalityTraitTest");
        console.log("Data saved successfully");
      })
      .catch(err => {
        console.error('Error:', err);
      });
  };


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



  const handledelete = () => {
    axios.get(`${BASE_URL}/logout`)
      .then(res => {
        location.reload(true);
      }).catch(err => console.log(err));
  }

  return (
    <div className="">
      {loading ? (
        <div></div>
      ) : auth ? (
        <div>
          <Navbar />

          <div className="container mt-1">
            <h4 className='second-first-text'>Enter Academic Records
            </h4>
            <hr />

            <div className="container">

              <div className="mt-4">
                <h3 className='secQ1'>Enter percentage that you secured in high school</h3>
                <input onChange={handlePercentageChange} required type="text" className='academic-input-field' placeholder='e.g 85%' />
              </div>


              <div className="mt-4">
                <h3 className='secQ1'>Select your preferred city For University</h3>
                <select
                  className="academic-input-field"
                  aria-label="Default select example"
                  value={selectedCity}
                  onChange={handleCityChange}>
                  <option value="Karachi" >Karachi, Pakistan</option>
                  <option value="Lahore">Lahore, Pakistan</option>
                  <option value="Islamabad">Islamabad, Pakistan</option>
                  <option value="Peshawar">Peshawar, Pakistan</option>
                </select>
              </div>

              <div className="mt-4">
                <h3 className='secQ1'>Select  your preferred University Sector</h3>
                <select
                  className="academic-input-field"
                  aria-label="Default select example"
                  value={universitySector}
                  onChange={handleUniversitySectorChange}>
                  <option value="Private">Private</option>
                  <option value="Govt.">Govt.</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              <div className="mt-4">
                <h3 className='secQ1'>Select  your gender</h3>
                <select
                  className="academic-input-field"
                  aria-label="Default select example"
                  value={gender}
                  onChange={handlegenderChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

            </div>
            <div className="d-flex justify-content-end me-2 mb-5">
              <button
                type="button"
                className="btn btn-secondary second-proceed-btn ms-1 mt-4"
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>

          </div>
        </div>

      ) : (
        <Navigate to='/' replace />
      )}
    </div>
  );
}

export default Academic;
