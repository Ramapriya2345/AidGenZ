import React from 'react';
import { Link } from 'react-router-dom';

const NavbarOrphanage = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/home">Orphanage Portal</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/orphanage-profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donations-thread">Donations Thread</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/request-donation">Request Donation</Link>
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

export default NavbarOrphanage;
