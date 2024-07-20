import React, { useEffect, useState } from 'react';
import NavbarHome from '../Components/NavbarHome';
import HomeWoman from '../images/womenhome.png';
import womanbh from "../images/womanbg.png";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import HomeMen from "../images/homemen.png";
import MyContact from '../images/contact-img.png';
import AOS from 'aos';
import axios from 'axios';
import "aos/dist/aos.css";
import FooterHome from '../Components/FooterHome';
import Runnerword from '../Components/Runnerword';
import Cardicon from '../images/card-icon.png';
import Cardicon1 from '../images/Card-icon1.png';
import Cardicon2 from "../images/card-icon2.png";
import { BASE_URL } from '../config';
export default function index() {

    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
    })

    const HandleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/user_feedbacks_form`, values);
            setValues({
                name: '',
                email: '',
                message: '',
            });
            Swal.fire({
                title: "Great!",
                text: "We will reach out to you shortly!",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error('Error saving form:', error);
        }
    };


    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <NavbarHome />
            <div className="">

                <div className="container-fluid home-main-cont">
                    <div className="mx-4" id='gradio-home'>
                        <div className="row how-row">
                            <div className="col-md-6 col-sm-12 d-flex align-items-center">
                                <div className="">

                                </div>
                                <div className="left-top-main-index">
                                    <p className='hometxt-1'>Feed your career</p>
                                    <h2 className='hometxt-2 '>Discover your future and let <span className='txt-grad' >Grad.io</span>  guide you through the process </h2>
                                    <p className='hometxt-3' >Uncover your genuine vocation through our tailored career recommendations. Allow us to lead you toward a gratifying journey where your skills and passions seamlessly converge. </p>
                                    <Link to='/signin'>

                                        <button type="button" id='get-started-btn' className="btn btn-primary button-for-desktop2">Get Started<i className="fa-solid fa-arrow-right mx-2"></i></button>
                                    </Link>
                                </div>

                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="bg-add-img img-main-div">
                                    <img className='fix-with' src={womanbh} alt="" />
                                    <div className="img-main-div2">

                                        <img className='HomeWoman' src={HomeWoman} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mt-3 pb-5">
                    <div className="row clr-this-item shadow">
                        <div className="col-md-6 o2">
                            <img data-aos="fade-right" data-aos-duration="2000" className='HomeMen ' src={HomeMen} alt="" />

                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                            <div className="animated-content pb-3">
                                <h2 className='hometxt-2' data-aos="fade-up" data-aos-duration="2000">Confused to choose the right discipline?</h2>
                                <p className='hometxt-3' data-aos="fade-up" data-aos-duration="2000">Stop guessing about your future! Grad.io uses cutting-edge tech to match you with your dream major...</p>

                                <ul data-aos="fade-up" data-aos-duration="2000">
                                    <li className='icon-size'><i className="fa-regular fa-circle-check fa-2x"></i><span className='hometxt-3 mx-2'>100% Guarantee of a secure future.</span></li>
                                    <li className='icon-size'><i className="fa-regular fa-circle-check fa-2x"></i><span className='hometxt-3 mx-2'>Guided security to help you achieve your dreams.</span></li>
                                    <li className='icon-size'><i className="fa-regular fa-circle-check fa-2x"></i><span className='hometxt-3 mx-2'>Suggest disciplines based on the current market trend.</span></li>
                                </ul>
                            </div>


                        </div>
                    </div>
                </div>

                <div className="container pb-5" id='index-contact'>
                    <h1 className='text-center hometxt-5' >Contact us</h1>
                    <p className='text-center ctact-txt'>Team Grad.io is here to assist you!</p>

                    <div className="d-flex main-cont-icon justify-content-center">
                        <div className="cont-icon " data-aos="zoom-out-up" data-aos-duration="2000"><i className="fa-brands fa-facebook-f"></i></div>
                        <div className="cont-icon " data-aos="zoom-out-up" data-aos-duration="2000"><i className="fa-solid fa-envelope" id='gmail-icon'></i></div>
                        <div className="cont-icon " data-aos="zoom-out-up" data-aos-duration="2000"> <i className="fa-brands fa-instagram"></i></div>
                    </div>
                </div>
                <div className="contact-form-main">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-center">
                                    <div className="">

                                        <h3 className='hometxt-5' id='facing-issue'>Facing any kind of issue?</h3>
                                        <img data-aos="fade-right" data-aos-duration="2000" className='MyContact-img' src={MyContact} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex justify-content-center pt-5">

                                    <form data-aos="fade-up" data-aos-duration="2000" onSubmit={HandleFormSubmit}
                                    >
                                        <div className="input-wrapper">
                                            <input type="text" onChange={e => setValues({ ...values, name: e.target.value })} placeholder="Enter your name..." name="text" className="input-contact shadow-sm"  required/>
                                        </div>
                                        <div className="input-wrapper my-3">
                                            <input type="email" onChange={e => setValues({ ...values, email: e.target.value })} placeholder="Enter your email..." name="text" className="input-contact shadow-sm" required />
                                        </div>
                                        <div className="input-wrapper my-3">
                                            <textarea id="the-contact-textarea" onChange={e => setValues({ ...values, message: e.target.value })} className='input-contact text-are-contact' name="" placeholder='Enter Your Message...' required></textarea>
                                        </div>

                                        <button className='contact-form-btn shadow'>Submit</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pb-5" id='about-gradio'>
                    <div className=" pt-5">
                        <h1 className='text-center hometxt-5' >About us</h1>
                        <p className='text-center ctact-txt'>We working hard to make your future better!</p>
                        <div className="">

                            <div className="the-whole-container gapit123">
                                <div className="container-glass " data-aos="flip-left" data-aos-duration="2000">
                                    <h4 className='text-center card-txt'>Grad.io Mission</h4>
                                    <p className="text">
                                        Our mission is to ignite the spark within every student.  We achieve this by fostering self-discovery and connecting their passions with fulfilling career paths.  Through personalized guidance and exploration tools, we empower students to make informed decisions that launch them towards a future filled with purpose and success.
                                    </p>
                                    {/* <button className="btn">Read more</button> */}
                                </div>
                                <div className="container-glass" data-aos="flip-right" data-aos-duration="2000">
                                    <h4 className='text-center card-txt'>Grad.io Vission</h4>
                                    <p className="text">
                                        We aspire to a world where every student boldly embraces a career path that sparks their passion and fully leverages their distinctive talents. Envisioning a future where empowered individuals make meaningful contributions to their respective fields, attaining personal fulfillment and professional success.
                                    </p>
                                    {/* <button className="btn">Read more</button> */}
                                </div>
                            </div>



                        </div>

                    </div>
                    <div className="mt-5">
                        <Runnerword />

                    </div>
                    <div className="container ">

                        <section id="advertisers" className="advertisers-service-sec pt-5 ">
                            <div className="container">
                                <div className="row">

                                </div>
                                <div className="row mt-1 mt-md-4 row-cols-1 row-cols-sm-1 row-cols-md-3 justify-content-center">

                                    <div className="col">
                                        <div className="service-card" data-aos="fade-up" data-aos-duration="2000">
                                            <div className="icon-wrapper">
                                                <img className='Cardicon-index' src={Cardicon1} alt="" />
                                            </div>
                                            <h3>The RIASEC personality test</h3>
                                            <p>
                                            helps individuals identify their dominant interest areas and suggests career paths
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="col">
                                        <div className="service-card" data-aos="fade-up" data-aos-duration="2000">
                                            <div className="icon-wrapper">
                                                <img className='Cardicon-index' src={Cardicon2} alt="" />
                                            </div>
                                            <h3>Career Suggestions</h3>
                                            <p>
                                            The suggestions often include a list of occupations and sometimes educational pathways.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="service-card" data-aos="fade-up" data-aos-duration="2000">
                                            <div className="icon-wrapper">
                                                <img className='Cardicon-index' src={Cardicon} alt="" />
                                            </div>
                                            <h3>Career growth guidance </h3>
                                            <p>
                                                Navigate career paths effectively, receive tailored guidance for growth and advancement.
                                            </p>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <FooterHome />

            </div>
        </>
    )
}
