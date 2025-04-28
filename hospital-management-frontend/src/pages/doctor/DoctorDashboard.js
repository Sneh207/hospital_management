import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllAppointments } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAllAppointments();
        
        // Filter appointments for today's date and current doctor
        const today = new Date().toISOString().split('T')[0];
        const doctorAppointments = response.data.filter(
          appointment => 
            appointment.doctor.id === currentUser.id &&
            appointment.appointmentDate.startsWith(today)
        );
        
        setAppointments(doctorAppointments);
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
      case 'CANCELLED':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2>Welcome, Dr. {currentUser.name}</h2>
          <p className="text-muted">Manage your appointments and patient information</p>
        </div>
        <div className="col-md-4 text-md-end">
          <Link to="/doctor/appointments" className="btn btn-primary">
            View All Appointments
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Professional Information</h5>
              <p><strong>Name:</strong> Dr. {currentUser.name}</p>
              <p><strong>Specialization:</strong> {currentUser.specialization}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Today's Schedule</h5>
              
              {error ? (
                <div className="alert alert-danger">{error}</div>
              ) : appointments.length > 0 ? (
                <div>
                  {appointments.map((appointment) => (
                    <div className="card appointment-card mb-3" key={appointment.id}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="card-title mb-0">Patient: {appointment.patient.name}</h6>
                          <span className={`badge ${getStatusBadgeClass(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <p className="text-muted mb-2">{appointment.appointmentDate}</p>
                        <p className="mb-2"><strong>Patient Contact:</strong> {appointment.patient.contact}</p>
                        {appointment.notes && (
                          <p className="mb-0"><strong>Notes:</strong> {appointment.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p>No appointments scheduled for today.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;