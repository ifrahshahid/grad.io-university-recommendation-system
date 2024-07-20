import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config';
export default function ThirdDash() {

    const [preferences, setPreferences] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/show_user_preference_admin`)
            .then(response => response.json())
            .then(data => {
                if (data.preferences) {
                    setPreferences(data.preferences);
                }
            })
            .catch(error => {
                console.error('Error fetching user preferences:', error);
            });
    }, []);


    return (
        <>
           <main>
                <div className="head-title">
                    <div className="left">
                        <h1>User Preferences</h1>
                    </div>
                </div>

                <div className="table-data">
                    <div className="order">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>User Names</th>
                                    <th>Email</th>
                                    <th>Interest</th>
                                </tr>
                            </thead>
                            <tbody>
                                {preferences.map(preference => (
                                    <tr key={preference.id}>
                                        <td>
                                            <p className='User_name_Preference'>{preference.name}</p>
                                        </td>
                                        <td>{preference.email}</td>
                                        <td className='usePreference_txt'>{preference.user_target}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}
