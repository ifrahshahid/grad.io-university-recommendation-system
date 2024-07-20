import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { Link, Navigate } from 'react-router-dom';
import { BASE_URL } from '../config';

function Fifth() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [matchedUniversities, setMatchedUniversities] = useState([]);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    // Fetch user's preferences and matched universities
    axios.get(`${BASE_URL}/getResults`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`

      }
    })
      .then(res => {
        if (res.status === 200) {
          setMatchedUniversities(res.data.university);
          setAuth(true);
        } else {
          console.error('Error:', res.data.error);
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
        <div>Loading...</div>
      ) : auth ? (
        <div className="">
          <Navbar />
          <div className="container mt-1">
            <h4 className='text-center matched-data'>
                <span className='text-butifer'>

                Matched Universities with your academic detail
                </span>
                </h4>
            <table className="table">
              <thead>
                <tr>
                  <th>University Name</th>
                  <th>Program</th>
                  <th>Percentage</th>
                  <th>Sector</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {matchedUniversities.map((university, index) => (
                  <tr key={index}>
                    <td>{university.University_name}</td>
                    <td>{university.program}</td>
                    <td>{university.Percentage}</td>
                    <td>{university.Sector}</td>
                    <td>{university.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  );
}

export default Fifth;
