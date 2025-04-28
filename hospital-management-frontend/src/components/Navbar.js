import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isPatient, isDoctor, currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Hospital Management System</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            
            {isPatient && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/patient/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/patient/book-appointment">Book Appointment</Link>
                </li>
              </>
            )}
            
            {isDoctor && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/doctor/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/doctor/appointments">Appointments</Link>
                </li>
              </>
            )}
          </ul>
          
          <div className="navbar-nav">
            {isAuthenticated ? (
              <div className="d-flex align-items-center">
                <span className="text-light me-3">Welcome, {currentUser.name}</span>
                <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>
              </div>
            ) : (
              <div className="d-flex">
                <div className="dropdown me-2">
                  <button className="btn btn-outline-light dropdown-toggle" id="patientDropdown" data-bs-toggle="dropdown">
                    Patient
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/patient/login">Login</Link></li>
                    <li><Link className="dropdown-item" to="/patient/register">Register</Link></li>
                  </ul>
                </div>
                <div className="dropdown">
                  <button className="btn btn-outline-light dropdown-toggle" id="doctorDropdown" data-bs-toggle="dropdown">
                    Doctor
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/doctor/login">Login</Link></li>
                    <li><Link className="dropdown-item" to="/doctor/register">Register</Link></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;