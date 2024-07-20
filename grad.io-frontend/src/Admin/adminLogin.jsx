import React from 'react';
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import AOS from 'aos';
import { BASE_URL } from '../config';
import { useEffect } from 'react'

export default function adminLogin() {

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
        axios.post(`${BASE_URL}/adminsigninonly`, values,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
        })
            .then(res => {
                if (res.data.errors) {
                    setbackendError(res.data.errors);
                } else {
                    if (res.data.Status === "success") {
                        navigate("/admin_dashboard")
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
        <div className="admin-login-page d-flex justify-content-center align-items-center ">
            <div className='admin-section-1 p-5'>
                <div className="forms login-form admin-login-form  shadow p-3 mb-5 bg-body rounded">
                    <h5 className='text-center m-3 admin-paga-txt1'>Admin Login</h5>
                    <form className="form form-login"  onSubmit={handleSubmit}>
                        <div className="input-block">
                            <input className='form-input' id="login-email" onChange={e => setValues({ ...values, email: e.target.value })} type="email" required />
                        </div>

                        <div className="input-block">
                            <input className='form-input' placeholder='Password' onChange={e => setValues({ ...values, password: e.target.value })} id="login-password" type='password' required />
                        </div>
                        <button type="submit" className="btn-login">Login</button>
                        <div className='d-flex justify-content-center'>


                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
