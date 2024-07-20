import React from 'react';
import logo from '../images/logo.png';


export default function AdminNavbar() {
    return (
        <div className="a-first-cont shadow">
            <div className='container d-flex justify-content-between pt-3 pb-2'>
                <img className="admin-logo " src={logo} alt="Logo" />
                <ul className="utilities d-flex pt-2">
                    <li className="users ddi"><a href="#">My Account</a></li>
                    <li className="logout warn ddi"><a href="#" >Log Out</a></li>
                </ul>
            </div>
        </div>
    )
}
