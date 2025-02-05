import React from 'react';
import { Link } from 'react-router-dom';

const NavbarDonor = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/donor-profile">Donor Profile</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/donate">Donate</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/requested-donations">Requested Donations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarDonor;
