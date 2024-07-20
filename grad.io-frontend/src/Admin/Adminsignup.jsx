import React from 'react';
import { useState } from 'react'
import pic1 from "../images/pic1.png";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Pic1 from "../images/pic1.png"
import AOS from 'aos';
import { BASE_URL } from '../config';
import "aos/dist/aos.css";
import { useEffect } from 'react'

export default function Adminsignup() {

    useEffect(() => {
        AOS.init({ duration: 2500 });
    }, []);

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [backendError, setbackendError] = useState([]);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/adminsignuponly`, values);

            if (response.data && response.data.errors) {
                setbackendError(response.data.errors);
            } else {
                if (response.data && response.data.Status === "success") {
                    navigate("/adminlogin");
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
                text: "Passwords don't match",
            });

        }
    };

    return (
        <>
            <div className="admin-login-page d-flex justify-content-center align-items-center ">
                <div className='admin-section-1 p-5'>
                    <div className="forms login-form admin-login-form  shadow p-3 mb-5 bg-body rounded">
                        <h5 className='text-center m-3 admin-paga-txt1'> Register New Admin </h5>
                        <form className="form form-login" onSubmit={handleSubmit}  >
                            <div className="input-block">
                                <input className='form-input' id="login-email" placeholder='Enter email address' onChange={e => setValues({ ...values, email: e.target.value })} type="email" required />
                            </div>
                            <div className="input-block">
                                <input className='form-input' id="login-username" placeholder='Enter your username' onChange={e => setValues({ ...values, name: e.target.value })} type="text" required />
                            </div>

                            <div className="input-block">
                                <input className='form-input' placeholder='Password' onChange={e => setValues({ ...values, password: e.target.value })} type="password" id="login-password" required />
                            </div>
                            <div className="input-block">
                                <input className='form-input' placeholder='Confirm Password' onChange={e => setValues({ ...values, confirmPassword: e.target.value })} type="password" id="login-confirm-password" required />
                            </div>
                            <button type="submit" className="btn-login">Register</button>
                            <div className='d-flex justify-content-center'>


                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
