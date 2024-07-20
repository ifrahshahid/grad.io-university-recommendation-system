import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './admin.css'
import logo from '../images/logo.png';
import AdminNavbar from './AdminNavbar';
import { FileInput, GraduationCap, UserRound, MessageSquareMore, TextSearch } from 'lucide-react';

function PersonalityTraitTest() {

    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    axios.defaults.withCredentials = true;


    useEffect(() => {
        axios.get('http://localhost:8081/home')
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

    const [values, setValues] = useState({
        QuestionText: "",
        TraitType: "",
        TraitWeight: "",
    })

    // const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/submitquestion', values)
            .then(res => {
                console.log(res)
                if (res.data.Status === "sucess") {
                    // navigate("/signin")
                    Swal.fire({
                        title: "Successful !",
                        text: "Your question is submitted!",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Question not submitted",
                        text: "Please try again",
                    });
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Question not submitted",
                    text: "Please try again",
                });
            });
    };


    const handleDelete = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                window.location.reload(true);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="">
            {auth ? (
                <div className='admin-body'>
                    <AdminNavbar />
                    <nav role='navigation'>
                        <ul className="main">
                            <li className="dashboard">
                                <a href="#admindashboard">
                                    <span className='px-1'> <FileInput size={20} strokeWidth={2} /></span>Questions
                                </a>
                            </li>
                            <li className="edit">
                                <a href="#"><span className='px-1'><GraduationCap size={20} strokeWidth={2} /></span>Edit Universites
                                </a>
                            </li>
                            <li className="write">
                                <a href="#"><span className='px-1'><TextSearch size={20} /></span>Records</a>
                            </li>
                            <li className="comments">

                                <a href="#"> <span className='px-1'><MessageSquareMore size={20} strokeWidth={2} /></span>Feedbacks</a>
                            </li>
                            <li className="comments">

                                <a href="#"> <span className='px-1'><UserRound size={20} strokeWidth={2} /></span>Manage Users</a>
                            </li>

                        </ul>
                    </nav>

                    <main role="main">
                        <section className="panel important shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                            <h2>Enter Personality Traits Test Question</h2>
                            <form action="" className='m-3' onSubmit={handleSubmit}>

                                <textarea
                                    className='ptt-textarea shadow p-3 mb-5 bg-body-tertiary rounded'
                                    placeholder="Enter New Question Here" required
                                    onChange={e => setValues({ ...values, QuestionText: e.target.value })}
                                ></textarea>

                                <div className="d-flex input-que-box">

                                    <div className="input-block">
                                        <input className='form-input-que shadow p-3 bg-body-tertiary rounded' id="TraitType" placeholder='Enter Trait Type' onChange={e => setValues({ ...values, TraitType: e.target.value })} type="text" required />
                                    </div>

                                    <div className="input-block">
                                        <input className='form-input-que shadow p-3 bg-body-tertiary rounded' id="login-email" placeholder='Enter Trait Weight' onChange={e => setValues({ ...values, TraitWeight: e.target.value })} type="text" required />
                                    </div>
                                </div>


                                <br />
                                <button type="submit" className="btn btn-secondary second-proceed-btn ms-1 mt-4">Submit</button>

                            </form>

                        </section>



                    </main>
                </div>
            ) : (
                <div>

                    <Link to='/' className='btn btn-primary'>
                        Login
                    </Link>
                </div>
            )}
        </div>
    );
}

export default PersonalityTraitTest;
