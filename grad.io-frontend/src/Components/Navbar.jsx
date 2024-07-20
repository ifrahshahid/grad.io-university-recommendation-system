import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../images/logo.png';
import Profilelogo from '../images/acc-profile-logo.png';
import { BASE_URL } from '../config';


export default function Navbar() {

    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(`${BASE_URL}/home`,{
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
            });
    }, []);

    const handledelete = () => {
        axios.get(`${BASE_URL}/logout`,)
            .then(res => {
                localStorage.clear()
                window.location.href="/"
            }).catch(err => console.log(err));
    }


    return (
        <div><nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <img className="logo m-2" src={logo} alt="Logo" />

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-lg-0">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img className="Profilelogo m-2" src={Profilelogo} alt="Logo" />
                                My Account
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item">Name: {name}</a></li>
                                <li><a className="dropdown-item logout-for-home " onClick={handledelete} style={{ fontWeight: 600 }} >Logout </a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        </div>
    )
}
