import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../admin.css'
import { FileInput, GraduationCap, UserRound, MessageSquareMore } from 'lucide-react';
import Navbar from '../AdminNavbar';

function User() {

    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);


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
            })
            .finally(() => {
                setLoading(false);
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
            {loading ? (
                <div></div>
            ) : auth ? (
                <div >
                    <Navbar />

                    <div className="py-5 check-it">

                        <div className="inner-cont-admin container">

                            <div className="container sec-cont-admin  d-flex align-items-center ">
                                <div className="tedy ">
                                    <ul className='admin-side-bar'>
                                        <li className='py-2'>
                                            <Link to="/personality-trait-type-question">
                                                <span className='px-1'>  <FileInput size={20} strokeWidth={2} /> </span>
                                            </Link>
                                        </li>
                                        <li className='py-2'>
                                            <Link to="/manage-users">
                                                <span className='px-1'>  <UserRound size={20} strokeWidth={2} /> </span>
                                            </Link>
                                        </li>
                                        <li className='py-2'>
                                            <Link to="">
                                                <span className='px-1'>  <GraduationCap size={20} strokeWidth={2} /> </span>
                                            </Link>
                                        </li>


                                        <li className='py-2'>
                                            <Link to="">
                                                <span className='px-1'>
                                                    <MessageSquareMore size={20} />
                                                </span>
                                                <span className=''>
                                                </span>
                                            </Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>









                </div>

            ) : (
                <Navigate to='/' replace />
            )}
        </div>
    );
}

export default User;
