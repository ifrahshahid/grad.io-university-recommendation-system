import React, { useState, useEffect } from 'react';
import { initializeSidebar } from './Adminscript.js';
import './admin.css';
import usermain from '.././images/usermain.png';
import Maindash from './Admin_section/Maindash.jsx';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import SecondDash from './Admin_section/SecondDash.jsx';
import ThirdDash from './Admin_section/ThirdDash.jsx';
import FourthDash from './Admin_section/FourthDash.jsx';
import FifthDash from './Admin_section/FifthDash.jsx';
import SixthDash from './Admin_section/SixthDash.jsx';
import { BASE_URL } from '../config';
import axios from 'axios';

export default function Newadmin() {

    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    axios.defaults.withCredentials = true;

    const [sidebarVisible, setSidebarVisible] = useState(true);

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
                    setAuth(true);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => {
                console.error('Error:', err);
            })
            .finally(() => {
                setLoading(false);
            });

        // initializeSidebar();
        
    }, []);

    const toggleSidebar = () => {
        setSidebarVisible(prevState => !prevState);
    };

    const [selectedComponent, setSelectedComponent] = useState('Dashboard');

    const handleMenuClick = (componentName) => {
        setSelectedComponent(componentName);
    };

    const handledelete = () => {
        axios.get(BASE_URL+'/logout')
            .then(res => {
                location.reload(true);
                localStorage.clear();
            }).catch(err => console.log(err));
    }

    
    return (
        <>

            <div>
                {loading ? (
                    <div></div>
                ) : (
                    <div>


                        {/* <!-- SIDEBAR --> */}
                        <section id="sidebar" className={sidebarVisible ? '' : 'hide'}>
                            <a href="#" className="brand">
                                <img className="pt-5" src="https://gradio-firebase.web.app/assets/logo-qX6NgRv-.png" alt="" />
                            </a>
                            <ul className="side-menu top">
                                <li className={selectedComponent === 'Dashboard' ? 'active' : ''}>
                                    <Link to="#" onClick={() => handleMenuClick('Dashboard')}>
                                        <i className='bx bxs-dashboard' ></i>
                                        <span className="text">Dashboard</span>
                                    </Link>
                                </li>
                                <li className={selectedComponent === 'Question' ? 'active' : ''}>
                                    <Link to="#" onClick={() => handleMenuClick('Question')}>
                                        <i className='bx bxs-edit' ></i>
                                        <span className="text">Add Question</span>
                                    </Link>
                                </li>
                                <li className={selectedComponent === 'EditUniversity' ? 'active' : ''}>
                                    <Link to="#" onClick={() => handleMenuClick('EditUniversity')}>
                                        <i className='bx bxs-institution' ></i>
                                        <span className="text">Edit Universities</span>
                                    </Link>
                                </li>
                                <li className={selectedComponent === 'Preferences' ? 'active' : ''}>
                                    <Link to="#" onClick={() => handleMenuClick('Preferences')}>
                                        <i className='bx bxs-doughnut-chart' ></i>
                                        <span className="text">User Preferences</span>
                                    </Link>
                                </li>
                                <li className={selectedComponent === 'Feedback' ? 'active' : ''}>
                                    <Link to="#" onClick={() => handleMenuClick('Feedback')}>
                                        <i className='bx bxs-message-dots' ></i>
                                        <span className="text">Feedback</span>
                                    </Link>
                                </li>
                                <li className={selectedComponent === 'UserRecords' ? 'active' : ''}>
                                    <Link to="#" onClick={() => handleMenuClick('UserRecords')}>
                                        <i className='bx bxs-group' ></i>
                                        <span className="text">User Records</span>
                                    </Link>
                                </li>

                            </ul>
                            <ul className="side-menu">
                                <li>
                                    <a href="#">
                                        <i className='bx bxs-cog' ></i>
                                        <span className="text">Settings</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="logout" onClick={handledelete}>
                                        <i className='bx bxs-log-out-circle' ></i>
                                        <span className="text">Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </section>
                        {/* <!-- SIDEBAR --> */}



                        {/* <!-- CONTENT --> */}
                        <section id="content">
                            {/* <!-- NAVBAR --> */}
                            <nav>
                                <i className='bx bx-menu' onClick={toggleSidebar}></i>
                                <form action="#">
                                    <div className="form-input">
                                        <input type="search" placeholder="Search..." />
                                        <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
                                    </div>
                                </form>
                                <input type="checkbox" id="switch-mode" hidden />
                                <label htmlFor="switch-mode" className="switch-mode"></label>
                                <a href="#" className="notification">
                                    <i className='bx bxs-bell' ></i>
                                    <span className="num">8</span>
                                </a>
                                <a href="#" className="profile">
                                    <img src={usermain} />
                                </a>
                            </nav>
                            {/* <!-- NAVBAR --> */}

                            {/* <!-- MAIN --> */}

                            {selectedComponent === 'Dashboard' && <Maindash />}
                            {selectedComponent === 'Question' && <SecondDash />}
                            {selectedComponent === 'Preferences' && <ThirdDash />}
                            {selectedComponent === 'Feedback' && <FourthDash />}
                            {selectedComponent === 'EditUniversity' && <FifthDash />}
                            {selectedComponent === 'UserRecords' && <SixthDash />}



                            {/* <!-- MAIN --> */}
                        </section>
                        {/* <!-- CONTENT --> */}


                    </div>

                )}
            </div>


        </>
    )
}
