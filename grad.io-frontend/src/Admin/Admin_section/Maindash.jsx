import React, { useState, useEffect } from 'react';
import axios from 'axios';
import usermain from '../../images/usermain.png'
import { BASE_URL } from '../../config';

export default function Maindash() {

    const [feedbacks, setFeedbacks] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totaluniversities, setuniversities] = useState(0);
    const [totalquestion, setQuestion] = useState(0);
    const [recentUsers, setRecentUsers] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const totalUsersResponse = await axios.get(`${BASE_URL}/get_total_users`);
                setTotalUsers(totalUsersResponse.data.totalUsers);
    
                const feedbacksResponse = await axios.get(`${BASE_URL}/get_user_feedbacks_form`);
                setFeedbacks(feedbacksResponse.data.preferences);
    
                const universities = await axios.get(`${BASE_URL}/get_total_university`);
                setuniversities(universities.data.university);
    
                const Question = await axios.get(`${BASE_URL}/get_total_question`);
                setQuestion(Question.data.question);
    
                const recentUsersResponse = await axios.get(`${BASE_URL}/all_registered_users`);
                setRecentUsers(recentUsersResponse.data.users);  // Set to the correct data field
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    
        fetchData();
    }, []);
    

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Admin Dashboard</h1>
                        <ul className="breadcrumb">
                            <li>
                                <a href="#">Dashboard</a>
                            </li>
                            <li>
                                <a className="active" href="#">Home</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <ul className="box-info">
                    <li className='shadow-lg'>
                        <i className='bx bxs-calendar-check' ></i>
                        <span className="text">
                            <h3>210</h3>
                            <p>Universities Registered</p>
                        </span>
                    </li>
                    <li className='shadow-lg'>
                        <i className='bx bxs-group' ></i>
                        <span className="text">
                            <h3>{totalUsers}</h3>
                            <p>Total Users</p>
                        </span>
                    </li>
                    <li className='shadow-lg'>
                        <i className='bx bxs-calendar-check' ></i>
                        <span className="text">
                            <h3>{totalquestion}</h3>
                            <p>Riasec Questions</p>
                        </span>
                    </li>
                </ul>


                <div className="table-data">
                    <div className="order">
                        <div className="head">
                            <h3 className='ms-3'>Recent Users</h3>
                            <i className='bx bx-search' ></i>
                            <i className='bx bx-filter' ></i>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>User Names</th>
                                    <th>Email </th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {recentUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <p>{user.name}</p>
                                        </td>
                                        <td>
                                            <p>{user.email}</p>
                                        </td>
                                        <td>
                                            <span className="status completed">Registered</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="todo">



                        <div className="head">
                            <h3>User Queries</h3>
                            <i className='bx bx-filter' ></i>
                        </div>

                        {feedbacks.map((feedback) => (

                            <div className="row myred my-2 " key={feedback.id}>
                                <div className="col-md-2 ">
                                    <img className='usermain_admin' src={usermain} alt="" />
                                </div>
                                <div className="col-md-10 p-0">
                                    <div className="">

                                        <h6 className='user_name_admin'>{feedback.name}</h6>
                                        <p className='user_query_admin'>{feedback.message}</p>



                                    </div>
                                </div>
                            </div>


                        ))}



                    </div>
                </div>
            </main>
        </>
    )
}
