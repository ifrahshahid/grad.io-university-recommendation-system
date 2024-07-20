import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png"
import sparkler from '../images/sparkler.png'


export default function NavbarHome() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
                <div className="container-fluid mx-3">
                    <Link to="/"><img className='Homelogo' src={Logo} alt="" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarText">
                        <ul className="navbar-nav mb-2 mb-lg-0 text-center li-nav-home">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#gradio-home">Home</a>
                            </li>
                             <li className="nav-item">
                                <a className="nav-link active" href="/#index-contact">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#about-gradio">About</a>
                            </li>
                           
                        </ul>
                        <div className="d-flex py-3 justify-content-center">

                        <Link to='/signin'>
                        <button type="button" className="btn btn-primary button-for-mobile" ><span><img className='sprakel' src={sparkler} alt="" /></span>Lets Begin!</button>
                        
                        </Link>
                        </div>
                        
                    </div>
                    <div className="button-for-desktop12">

                    <Link to='/signin'>
                    <button type="button" className="btn btn-primary button-for-desktop"><span cla><img src={sparkler} className='sprakel' alt="" /></span>Lets Begin!</button> </Link>
                    </div>
                        

                </div>
            </nav>

        </>

    )
}
