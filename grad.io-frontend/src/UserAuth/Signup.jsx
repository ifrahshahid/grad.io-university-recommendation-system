import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import pic1 from "../images/pic1.png";
import AOS from 'aos';
import { BASE_URL } from '../config';
import "aos/dist/aos.css";

export default function Signup() {
    useEffect(() => {
        AOS.init({ duration: 2500 });
    }, []);

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [backendError, setbackendError] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (values.password.length < 6 || values.confirmPassword.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Password must be at least 6 characters long",
            });
            return;
        }

        if (values.password !== values.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Passwords don't match",
            });
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/signup`, values);

            if (response.data && response.data.errors) {
                setbackendError(response.data.errors);
            } else {
                if (response.data && response.data.Status === "success") {
                    navigate("/signin");
                    Swal.fire({
                        title: "Successful!",
                        text: "Your account has been created!",
                        icon: "success"
                    });
                } else {
                    throw new Error("Registration failed");
                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Registration failed",
                text: error.response?.data?.message || "An error occurred",
            });
        }
    };

    return (
       <>
         <div className="login-section">
                <div className="login-section2">
                    <div className="d-flex align-items-center justify-content-center another-try">
                        <div className="d-flex justify-content-center">
                            <div className='kojo'>
                                <h2 className='loging-text-1'>Sign in to</h2>
                                <h5 className='second-text'>Navigate Your Future, <br /> Excel with Grad.io!</h5>
                                <p className='third-text'>
                                    If you have an account, Login <br />
                                    You can <span className='Regis'>
                                        <Link to="/signin" className='Register-login-text' style={{ textDecoration: 'none', fontWeight: 600 }}>Login here!</Link>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <img className='female' src={pic1} alt="Picture not found" />
                        </div>
                        <div className="pb-5">
                            <section className="mt-5">
                                <div className="form-box form-box2" data-aos="fade-down" id='form-boxx'>
                                    <div className="form-value">
                                        <form onSubmit={handleSubmit}>
                                            <h2>Signup</h2>
                                            <div className="inputbox">
                                                <ion-icon name="mail-outline"></ion-icon>
                                                <input onChange={e => setValues({ ...values, email: e.target.value })} type="email" required />
                                                <label>Email</label>
                                            </div>
                                            <div className="inputbox">
                                                <ion-icon name="person-outline"></ion-icon>
                                                <input onChange={e => setValues({ ...values, name: e.target.value })} type="text" required />
                                                <label>Username</label>
                                            </div>
                                            <div className="inputbox">
                                                <ion-icon name="lock-closed-outline"></ion-icon>
                                                <input onChange={e => setValues({ ...values, password: e.target.value })} type="password" required />
                                                <label>Password</label>
                                            </div>
                                            <div className="inputbox">
                                                <ion-icon name="lock-closed-outline"></ion-icon>
                                                <input onChange={e => setValues({ ...values, confirmPassword: e.target.value })} type="password" required />
                                                <label>Confirm Password</label>
                                            </div>
                                            <button type='submit' className="login-button shadow">Register</button>
                                            <div className="register">
                                                <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
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
    );
}
