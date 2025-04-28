import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getPatientAppointments } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getPatientAppointments(currentUser.id);
        setAppointments(response.data);
      } catch (err) {
        setError('Failed to load appointments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentUser.id]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-primary';
      case 'COMPLETED':
        return 'bg-success';
      case 'ACCEPTED':
        return 'bg-info';
      case 'REJECTED':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2>Welcome, {currentUser.name}</h2>
          <p className="text-muted">Manage your appointments and health information</p>
        </div>
        <div className="col-md-4 text-md-end">
          <Link to="/patient/book-appointment" className="btn btn-primary">
            Book New Appointment
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Personal Information</h5>
              <p><strong>Name:</strong> {currentUser.name}</p>
              <p><strong>Age:</strong> {currentUser.age}</p>
              <p><strong>Gender:</strong> {currentUser.gender}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Contact:</strong> {currentUser.contact}</p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Your Appointments</h5>
              
              {loading ? (
                <p className="text-center">Loading appointments...</p>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-4">
                  <p>You don't have any appointments yet.</p>
                  <Link to="/patient/book-appointment" className="btn btn-outline-primary">
                    Book Your First Appointment
                  </Link>
                </div>
              ) : (
                <div>
                  {appointments.map((appointment) => (
                    <div className="card appointment-card mb-3" key={appointment.id}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="card-title mb-0">Appointment with Dr. {appointment.doctor.name}</h6>
                          <span className={`badge ${getStatusBadgeClass(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <p className="text-muted mb-2">{appointment.appointmentDate}</p>
                        <p className="mb-2"><strong>Specialization:</strong> {appointment.doctor.specialization}</p>
                        {appointment.notes && (
                          <p className="mb-0"><strong>Notes:</strong> {appointment.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;