import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';

export default function FifthDash() {
    const [values, setValues] = useState({
        URL: '',
        program: '',
        Percentage: '',
        University_name: '',
        Location: '',
        sector: ''
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if any input field is empty
        if (!values.University_name || !values.URL || !values.program || !values.Location || !values.sector || !values.Percentage) {
            Swal.fire({
                icon: "error",
                title: "Please Fill all the field",

            });
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/addUniversitydata`, values);
            console.log(response.data);

            // Reset form values after successful submission
            setValues({
                URL: '',
                program: '',
                Percentage: '',
                University_name: '',
                Location: '',
                sector: ''
            });
            window.location.reload();
        } catch (error) {
            console.error('Error adding university:', error);
        }
    };

    const [universities, setUniversities] = useState([]);
    const fetchUniversities = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/all_universities`);
            setUniversities(response.data);
        } catch (error) {
            console.error('Error fetching universities:', error);
        }
    };

    useEffect(() => {
        fetchUniversities();
    }, []);


    const confirmDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteUniversity(id);
            }
        });
    };


    const deleteUniversity = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/deleteUniversity/${id}`);
            console.log(response.data);
            fetchUniversities();
            Swal.fire({
                title: "Deleted!",
                text: "Your university has been deleted.",
                icon: "success"
            });
        } catch (error) {
            console.error('Error deleting university:', error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while deleting the university.",
                icon: "error"
            });
        }
    };


    const [editValues, setEditValues] = useState({});

    const handleInputChange = (e, id, field) => {
        const newValue = e.target.value;
        setEditValues(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [field]: newValue
            }
        }));
    };

    const handleUpdate = async (e, id, originalValues) => {
        e.preventDefault();

        const updatedValues = editValues[id];
        const finalValues = { ...updatedValues }; // Copy the updated values

        // Check each field, if the value is not changed, use the original value
        for (const key in originalValues) {
            if (updatedValues && updatedValues.hasOwnProperty(key)) {
                finalValues[key] = updatedValues[key];
            } else {
                finalValues[key] = originalValues[key];
            }
        }

        try {
            const response = await axios.put(`${BASE_URL}/updateUniversity/${id}`, finalValues);
            console.log(response.data);

            fetchUniversities(); // Fetch updated universities list after update
            Swal.fire({
                title: "Updated!",
                text: "Your university has been updated.",
                icon: "success"
            }).then(() => {
                // Close the modal
                const modal = document.getElementById(`exampleModal2-${id}`);
                const modalInstance = bootstrap.Modal.getInstance(modal);
                modalInstance.hide();
            });
        } catch (error) {
            console.error('Error updating university:', error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while updating the university.",
                icon: "error"
            });
        }
    };




    const handleEdit = (university) => {
        if (university) {
            setEditValues({
                ...editValues,
                [university.id]: {
                    University_name: university.University_name || '',
                    Location: university.Location || '',
                    URL: university.URL || '',
                    program: university.program || '',
                    Percentage: university.Percentage || '',
                    sector: university.sector || ''
                }
            });
        }
    };
    
    

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Edit University</h1>

                    </div>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='adduniversitybtn'><span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg> Add New University
                    </span></button>


                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className='text-center'>Register New University</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
                                        <div className="">
                                        
                                            <div className="input-wrapper">
                                                <input type="text" onChange={e => setValues({ ...values, University_name: e.target.value })} placeholder="Enter University Name" name="text" className="input-contact shadow-sm" />
                                            </div>
                                            <div className="input-wrapper my-3">
                                                <input type="text" onChange={e => setValues({ ...values, Location: e.target.value })} placeholder="Enter University Location" name="text" className="input-contact shadow-sm" />
                                            </div>
                                            <div className="input-wrapper my-3">
                                                <input type="text" onChange={e => setValues({ ...values, URL: e.target.value })} placeholder="Enter University Link Address" name="text" className="input-contact shadow-sm" />
                                            </div>
                                            <div className="input-wrapper my-3">
                                                <input type="text" onChange={e => setValues({ ...values, program: e.target.value })} placeholder="Enter University Program" name="text" className="input-contact shadow-sm" />
                                            </div>
                                            <div className="input-wrapper my-3">
                                                <input type="text" onChange={e => setValues({ ...values, Percentage: e.target.value })} placeholder="Enter University Eligiblity" name="text" className="input-contact shadow-sm" />
                                            </div>
                                            <div className="row ">
                                                <label htmlFor="uniSector" className='text-start my-2'>Choose Sector</label>
                                                <div className="col-md-6">
                                                    <div className="radio-button">
                                                        <input name="forUniSector" onChange={e => setValues({ ...values, sector: e.target.value })} id="radio1" className="radio-button__input" value="Government" type="radio" />
                                                        <label htmlFor="radio1" className="radio-button__label">
                                                            <span className="radio-button__custom"></span>
                                                            Government
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="radio-button">
                                                        <input name="forUniSector" onChange={e => setValues({ ...values, sector: e.target.value })} id="radio2" className="radio-button__input" value="Private" type="radio" />
                                                        <label htmlFor="radio2" className="radio-button__label">
                                                            <span className="radio-button__custom"></span>
                                                            Private
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className='contact-form-btn shadow mt-3 mb-4'>Add</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {universities.map((university) => (
                        <div className="modal fade" id={`exampleModal2-${university.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" key={university.id}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className='text-center'>Update University Data</h4>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className='d-flex flex-column align-items-center' onSubmit={(e) => handleUpdate(e, university.id, university)}>



                                            <div className="">
                                                <div className="input-wrapper my-3">
                                                    <input
                                                        type="text"
                                                        value={editValues[university.id]?.University_name || university.University_name}
                                                        onChange={(e) => handleInputChange(e, university.id, 'University_name')}
                                                        placeholder="Enter University Name"
                                                        name="University_name"
                                                        className="input-contact shadow-sm"
                                                    />
                                                </div>
                                                <div className="input-wrapper my-3">
                                                    <input
                                                        type="text"
                                                        value={editValues[university.id]?.Location || university.Location}
                                                        onChange={(e) => handleInputChange(e, university.id, 'Location')}
                                                        placeholder="Enter University location "
                                                        name="Location"
                                                        className="input-contact shadow-sm"
                                                    />
                                                </div>
                                                <div className="input-wrapper my-3">
                                                    <input
                                                        type="text"
                                                        value={editValues[university.id]?.URL || university.URL}
                                                        onChange={(e) => handleInputChange(e, university.id, 'URL')}
                                                        placeholder="Enter University Link Address"
                                                        name="URL"
                                                        className="input-contact shadow-sm"
                                                    />
                                                </div>
                                                <div className="input-wrapper my-3">
                                                    <input
                                                        type="text"
                                                        value={editValues[university.id]?.program || university.program}
                                                        onChange={(e) => handleInputChange(e, university.id, 'program')}
                                                        placeholder="Enter University Phone Number"
                                                        name="program"
                                                        className="input-contact shadow-sm"
                                                    />
                                                </div>
                                                <div className="input-wrapper my-3">
                                                    <input
                                                        type="text"
                                                        value={editValues[university.id]?.Percentage || university.Percentage}
                                                        onChange={(e) => handleInputChange(e, university.id, 'Percentage')}
                                                        placeholder="Enter University Phone Number"
                                                        name="Percentage"
                                                        className="input-contact shadow-sm"
                                                    />
                                                </div>
                                                <div className="row">
                                                    <label htmlFor="uniSector" className='text-start my-2'>Choose Sector</label>
                                                    <div className="col-md-6">
                                                        <div className="radio-button">
                                                            <input
                                                                name="forUniSector"
                                                                onChange={(e) => handleInputChange(e, university.id, 'sector')}
                                                                id={`radio1-${university.id}`}
                                                                className="radio-button__input"
                                                                value="Government"
                                                                type="radio"
                                                            />
                                                            <label htmlFor={`radio1-${university.id}`} className="radio-button__label">
                                                                <span className="radio-button__custom"></span>
                                                                Government
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="radio-button">
                                                            <input
                                                                name="forUniSector"
                                                                onChange={(e) => handleInputChange(e, university.id, 'sector')}
                                                                id={`radio2-${university.id}`}
                                                                className="radio-button__input"
                                                                value="Private"
                                                                type="radio"
                                                            />
                                                            <label htmlFor={`radio2-${university.id}`} className="radio-button__label">
                                                                <span className="radio-button__custom"></span>
                                                                Private
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className='contact-form-btn shadow mt-3 mb-4'>Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="table-data">
                    <div className="order">
                        <table id="example" className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Eligible</th>
                                    <th>Program</th>
                                    <th>Location</th>
                                    <th>Sector</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {universities.map((university, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{university.University_name}</td>
                                            <td>{university.Percentage}</td>
                                            {/* <td>{university.URL}</td> */}
                                            <td>{university.program}</td>
                                            <td>{university.Location}</td>
                                            <td>{university.Sector}</td>
                                            <td>
                                                <div className="action-icons">
                                                    <i
                                                        data-bs-toggle="modal"
                                                        data-bs-target={`#exampleModal2-${university.id}`}
                                                        className="fa-regular fa-pen-to-square mx-3 icon_for-actions">
                                                    </i>
                                                    <i onClick={() => confirmDelete(university.id)} className="fa-regular fa-trash-can icon_for-actions"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}
