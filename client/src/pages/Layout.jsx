import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Profile from './PatientProfile'; 
import DoctorProfile from './DoctorProfile';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/patient-profile">Patient Profile</Link>
          </li>
          <li>
            <Link to="/doctor-profile">Doctor Profile</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
