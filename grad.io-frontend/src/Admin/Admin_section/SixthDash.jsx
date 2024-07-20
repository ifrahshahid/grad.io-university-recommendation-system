import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';

export default function SixthDash() {
    const [academicData, setAcademicData] = useState([]);

    useEffect(() => {
        // Fetch academic data from backend
        const fetchAcademicData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/get_academic_data`);
                console.log(response.data);
                setAcademicData(response.data.results);
            } catch (error) {
                console.error('Error fetching academic data:', error);
            }
        };

        fetchAcademicData();
    }, []);

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>User Academic Records</h1>
                    </div>
                </div>
                <div className="table-data">
                    <div className="order">
                        <table id="example" className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Percentage</th>
                                    <th>Gender</th>
                                    <th>University Sector</th>
                                    <th>Selected City</th>
                                </tr>
                            </thead>
                            <tbody>
                                {academicData && academicData.length > 0 ? (
                                    academicData.map((data, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.name || 'Null'}</td>
                                            <td>{data.email || 'Null'}</td>
                                            <td>{data.percentage || 'Null'}</td>
                                            <td>{data.gender || 'Null'}</td>
                                            <td>{data.universitySector || 'Null'}</td>
                                            <td>{data.selectedCity || 'Null'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}
