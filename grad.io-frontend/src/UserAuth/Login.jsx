import React from 'react';
import { useState } from 'react'
import pic1 from "../images/pic1.png";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Pic1 from "../images/pic1.png"
import AOS from 'aos';
import "aos/dist/aos.css";
import { BASE_URL } from '../config';
import { useEffect } from 'react'
export default function Login() {
    useEffect(() => {
        AOS.init({ duration: 2500 });
    }, []);
    
    const [values, setValues] = useState({
        email: "",
        password: "",

    })


    const [backendError, setbackendError] = useState([]);

    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate();
    axios.defaults.withCredentials = true
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${BASE_URL}/signin`, values)
            .then(res => {
                if (res.data.errors) {
                    setbackendError(res.data.errors);
                } else {
                    if (res.data.Status === "success") {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("userId", res.data.userId);
                        navigate("/home")
                        // Redux / Context 
                        Swal.fire({
                            title: "Welcome!",
                            text: "Your ultimate future guide!",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Sorry",
                            text: "Invalid Email or Password",
                        });
                    }
                }

            })
            .catch(err => {
                console.error("Error:", err);
                // Handle the error, show an alert, redirect, or perform other actions
            });
    };

    return (
        <>

            <div className="login-section">
                <div className="login-section2">
                    <div className="d-flex align-items-center justify-content-center  another-try">
                        <div className="d-flex justify-content-center " >
                            <div className='kojo ' >

                                <h2 className='loging-text-1'>Sign in to</h2>
                                <h5 className='second-text'>Navigate Your Future, <br /> Excel with Grad.io!</h5>
                                <p className='third-text'>
                                    If you don’t have an account, register <br />
                                    You can <span className='Regis' >
                                        <Link to="/signup" className='Register-login-text' style={{ textDecoration: 'none', fontWeight: 600 }}>Register here!</Link>
                                    </span>
                                </p>


                            </div>
                        </div>
                        <div className="">
                            <img className='female' src={Pic1} alt="Picture not found" />
                        </div>
                        <div className="pb-5">
                            <section class="mt-5" >
                                <div class="form-box" id='form-boxx'  data-aos="fade-down">
                                    <div class="form-value">
                                        <form onSubmit={handleSubmit}>
                                            <h2>Login</h2>
                                            <div class="inputbox">
                                                <ion-icon name="mail-outline"></ion-icon>
                                                <input onChange={e => setValues({ ...values, email: e.target.value })} type="email" required />
                                                <label>Email</label>
                                            </div>
                                            <div class="inputbox">
                                                <ion-icon name="lock-closed-outline"></ion-icon>
                                                <input onChange={e => setValues({ ...values, password: e.target.value })}
                                                    id="login-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    required />
                                                <label>Password</label>
                                            </div>
                                        
                                                <p className='forget-password text-end' onClick={() => setShowPassword(!showPassword)}>
                                                    <i className="me-1 fa-solid fa-eye"></i>
                                                    {showPassword ? 'Hide Password' : 'Show Password'}
                                                </p>
                                            <button type='submit' class="login-button shadow">Log In</button>
                                            <div class="register">
                                                <p>Don't have an account? <Link to='/signup' >Sign Up</Link></p>
                                                {
                                                    backendError ? backendError.map(e => (
                                                        <p className='text-danger validation'>{e.msg}</p>
                                                    )) : <span></span>
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                
                            </section>
                        </div>

                    </div>


                </div>

            </div>

        </>
    )
}
