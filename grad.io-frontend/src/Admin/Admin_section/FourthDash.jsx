import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';

export default function FourthDash() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        async function fetchFeedbacks() {
            try {
                const response = await axios.get(`${BASE_URL}/get_user_feedbacks_form`);
                setFeedbacks(response.data.preferences);
            } catch (error) {
                console.error('Error fetching user feedbacks:', error);
            }
        }

        fetchFeedbacks();
    }, []);

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>User Feedbacks | Query</h1>
                    </div>
                </div>
                <div className="table-data">
                    <div className="order">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>User Names</th>
                                    <th>Email</th>
                                    <th>Feedbacks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.map((feedback) => (
                                    <tr key={feedback.id}>
                                        <td>
                                            <p className='User_name_Preference'>{feedback.name}</p>
                                        </td>
                                        <td>{feedback.email}</td>
                                        <td className='usePreference_txt'>{feedback.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}
