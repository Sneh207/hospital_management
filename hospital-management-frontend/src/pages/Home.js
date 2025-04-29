import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mb-5">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">Welcome to MediAxis</h1>
          <p className="lead">
            Streamline your healthcare experience with our comprehensive hospital management solution.
          </p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
            <h3 className="card-title">Our Mission</h3>
              <p className="card-text">
              To make healthcare more accessible, efficient, and
              patient-friendly by automating key hospital processes,
              enhancing patient-doctor interactions, and ensuring
              smooth operational workflows for medical professionals
              — all through a unified platform that simplifies access
              to care, centralizes medical data, and improves communication
              for better health outcomes.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Key Features</h3>
              <p className="card-text">
              MediAxis offers secure login for doctors and patients, fast 
              appointment booking with real-time updates, and doctor-controlled 
              approvals. Personalized calendars help doctors manage their 
              schedules efficiently, ensuring better time management, reduced
              overlaps, and a seamless experience for both healthcare providers and patients.
              </p>
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
                    <p>Book and manage appointments anytime, anywhere</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="feature">
                    <h4>Quality Care</h4>
                    <p> Connect with expert healthcare professionals</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="feature">
                    <h4>Secure</h4>
                    <p> Your data is protected with advanced security protocols</p>
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