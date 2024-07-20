import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config';
import finalimg from '..//images/final-img.png'
import ref from '..//images/ref.png'
import ref2 from '..//images/ref2.png'
import ref3 from '..//images/ref3.png'

function Finalresult() {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [matchedUniversities, setMatchedUniversities] = useState([]);
    const [countdown, setCountdown] = useState(30); // Countdown timer state
    const imageRefs = [ref, ref2, ref3];

    useEffect(() => {
        const fetchResults = () => {
            axios.defaults.withCredentials = true;

            axios.post(`${BASE_URL}/getResults`, { "userId": localStorage.getItem("userId") }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`

                }
            })
                .then(res => {
                    console.log("/getResult", res.data)
                    if (res.status === 200) {
                        setMatchedUniversities(res.data.university
                        );
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
        };

        const timer = setTimeout(fetchResults, 30000); // 30 seconds delay

        const countdownInterval = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown > 0) {
                    return prevCountdown - 1;
                } else {
                    clearInterval(countdownInterval);
                    return 0;
                }
            });
        }, 1000);

        return () => {
            clearTimeout(timer); // Cleanup the timeout if the component unmounts
            clearInterval(countdownInterval); // Cleanup the interval if the component unmounts
        };
    }, []);

    return (
        <div className="">
            {loading ? (
                <div>
                    <div className="container">
                        <div className=""></div>
                        <p className='text-center pancakes-text mt-5'>Please wait your result is calculating</p>
                        <div className="waiting-contain d-flex justify-content-center align-items-center ">
                            <div className="spinnnner_cont mt-5">

                                <div class="spinner">
                                    <div class="spinner1"></div>
                                </div>
                                <p className='Counter_txt txt-grad2'>{countdown}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : auth ? (
                <div className="">
                    <Navbar />
                    <div className="container finalpagecontainer">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-md-6">
                                <p className="final_first-txt">FEATURED</p>
                                <h4 className="final_first-txt2">Here's Your Customized list of Top</h4>
                                <h4 className="final_first-txt2">Universities...</h4>
                            </div>
                            <div className="col-md-6 d-flex justify-content-center">
                                <img className="finalpageimg" src={finalimg} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="container mb-5 mt-5">
                        {matchedUniversities.map((university, index) => (
                            <div className="mb-3" key={index}>
                                <div className="finalresultcontainer">
                                    <div className="">
                                        <p className="m-2 rank-txt">#{index + 1}</p>
                                        <p className="m-2 rank-txt2">{university.University_name}</p>
                                        <h6 className="m-2">Eligibility: <span className="rank-txt-3">{university.Percentage}</span></h6>
                                        <p className="m-2 rank-txt4">The  {university.University_name} is located in {university.location} and belongs to the {university.Sector} Sector.</p>
                                        <p className="m-2 mt-2">Recommended Degree Program: <br /> <span className="rank-txt-3">{university.program}</span></p>

                                        <p className='text-end'>
                                            <a
                                                className='text-end View-Website mt-5'
                                                href={university.URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Website
                                                <i class="mx-1 fa-solid fa-angles-right"></i>
                                            </a>
                                        </p>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            ) : (
                // <Navigate to='/' replace />
                <div className="container">
                    dbl a
                </div>
            )}
        </div>
    );
}

export default Finalresult;
