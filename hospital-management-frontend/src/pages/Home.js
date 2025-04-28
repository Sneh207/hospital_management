import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mb-5">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">Welcome to Hospital Management System</h1>
          <p className="lead">
            Streamline your healthcare experience with our comprehensive hospital management solution.
          </p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">For Patients</h3>
              <p className="card-text">
                Access quality healthcare services with ease. Book appointments, manage your medical records,
                and communicate with healthcare providers all in one place.
              </p>
              <ul className="list-unstyled">
                <li>✓ Easy appointment booking</li>
                <li>✓ View appointment history</li>
                <li>✓ Access medical records</li>
                <li>✓ Choose from qualified doctors</li>
              </ul>
              <div className="mt-4">
                <Link to="/patient/login" className="btn btn-primary me-2">Login</Link>
                <Link to="/patient/register" className="btn btn-outline-primary">Register</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">For Doctors</h3>
              <p className="card-text">
                Efficiently manage your practice and provide better care for your patients.
                Access patient records, manage appointments, and more.
              </p>
              <ul className="list-unstyled">
                <li>✓ Manage appointments</li>
                <li>✓ View patient histories</li>
                <li>✓ Track patient progress</li>
                <li>✓ Efficient scheduling</li>
              </ul>
              <div className="mt-4">
                <Link to="/doctor/login" className="btn btn-primary">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card bg-light">
            <div className="card-body text-center">
              <h3 className="card-title">Why Choose Us?</h3>
              <div className="row mt-4">
                <div className="col-md-4 mb-3">
                  <div className="feature">
                    <h4>Easy Access</h4>
                    <p>Book appointments anytime, anywhere</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="feature">
                    <h4>Quality Care</h4>
                    <p>Expert healthcare professionals</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="feature">
                    <h4>Secure</h4>
                    <p>Your data is safe with us</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;