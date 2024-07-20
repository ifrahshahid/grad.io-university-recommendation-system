import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png"


export default function FooterHome() {
    return (
        <>
            <div className="container-fluid footer-container pb-3 ">
                <div className="container">
                    <div className="row pt-5">
                        <div className="col-md-4 col-sm-12 pb-4">
                            <div className="">
                                <img src={Logo} alt="" />
                                <p className='footer-first-txt ms-3 mt-2'>We empower students to discover their passions and launch fulfilling careers through self-discovery and personalized guidance.
                                </p>

                                <div className="d-flex main-cont-icon ms-3 ">
                                    <div className="cont-icon1"><i class="fa-brands fa-facebook-f"></i></div>
                                    <div className="cont-icon1"><i class="fa-solid fa-envelope" id='gmail-icon1'></i></div>
                                    <div className="cont-icon1"><i class="fa-brands fa-instagram">
                                    </i></div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-8 col-sm-12">
                            <div className="d-flex justify-content-between">
                                <div className="row">
                                    <div className="col-md-6">

                                    </div>
                                    <div className="col-md-6"></div>
                                </div>
                                <div className="">
                                    <h4 className='foonter-txt2 '><span className='foonter-txt mb-5'>Quick</span> Links</h4>
                                    <ul className='foonter-ul mt-1'><li>Home</li>
                                        <li>Sign in</li>
                                        <li>Sign up</li>
                                        <li>About us</li>
                                        <li>Contact us</li>
                                    </ul>
                                </div>
                                <div className="">
                                    <h4 className='foonter-txt2'><span className='foonter-txt'>Get  in </span>touch</h4>
                                    <div className="d-flex gapit44 mt-4">

                                        <div className="">
                                            <i class="fa-solid fa-location-dot loction-footer pt-1"></i>
                                        </div>
                                        <div className=""></div>
                                        <div className="">
                                            <h5 className='find-us'>Find us</h5>
                                            <p className='loc-footer-txt'>Main University Road, <br />Karachi Pakistan</p>
                                        </div>
                                    </div>
                                    <div className="d-flex gapit44 ">

                                        <div className="">
                                            <i class="fa-solid fa-envelope loction-footer pt-1"></i>
                                        </div>
                                        <div className=""></div>
                                        <div className="">
                                            <h5 className='find-us'>Mail us</h5>
                                            <p className='loc-footer-txt'>gradio.info@gmail.com</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="">
                                    <h4 className='foonter-txt2'></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                            <div className="copy-right">
                                <hr className='mx-3 mt-4' />
                                <h6 className='text-center footer-first-txt px-4'>Copyright © 2024 | All Right Reserved Grad.io</h6>
                            </div>
                </div>
            </div>
        </>
    )
}
