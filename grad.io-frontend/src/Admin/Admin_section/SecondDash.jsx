import React, { useState } from 'react';
import axios from 'axios';

export default function SecondDash() {
    const [values, setValues] = useState({
        QuestionID: '',
        TraitType: '',
        QuestionText: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/submitquestion', values)
            .then(res => {
                console.log(res)
                if (res.data.Status === "success") {
                    Swal.fire({
                        title: "Successful!",
                        text: "Your question is submitted!",
                        icon: "success"
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Question not submitted",
                        text: "Question Id is not unique",
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

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>Add New Raisec Question</h1>
                    </div>
                </div>
                <div className="table-data">
                    <div className="todo">
                        <form onSubmit={handleSubmit}>
                            <div className="form-input">
                                <input className='form-input-que shadow p-3 bg-body-tertiary rounded me-3' id="QuestionID" placeholder='Enter Question ID' onChange={e => setValues({ ...values, QuestionID: e.target.value })} type="text" required />

                                <input className='form-input-que shadow p-3 bg-body-tertiary rounded' id="TraitType" placeholder='Enter Trait Type' onChange={e => setValues({ ...values, TraitType: e.target.value })} type="text" required />
                                <div className="">
                                    <textarea
                                        className='mt-4 shadow p-3 mb-5 bg-body-tertiary rounded'
                                        placeholder="Enter New Question Here"
                                        required
                                        onChange={e => setValues({ ...values, QuestionText: e.target.value })}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-secondary second-proceed-btn ms-1">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
