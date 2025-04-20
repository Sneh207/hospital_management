import React, { useState, useEffect, useContext } from 'react';
import { getAllAppointments, deleteAppointment } from '../../services/api';
import { AuthContext } from '../context/AuthContext';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('ALL');
  const { currentUser } = useContext(AuthContext);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAllAppointments();
        
        // Filter appointments for the current doctor
        const doctorAppointments = response.data.filter(
          appointment => appointment.doctor.id === currentUser.id
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

  // Handle appointment cancellation
  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await deleteAppointment(appointmentId);
        setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
      } catch (err) {
        setError('Failed to cancel appointment');
        console.error(err);
      }
    }
  };

  // Filter appointments based on selected filter
  const filteredAppointments = filter === 'ALL' 
    ? appointments 
    : appointments.filter(appointment => appointment.status === filter);

  // Get badge class based on status
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

  return (
    <div className="container">
      <h2 className="mb-4">Appointments</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="card">
        <div className="card-body">
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Manage Appointments</h5>
            <div className="btn-group" role="group">
              <button 
                type="button" 
                className={`btn ${filter === 'ALL' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('ALL')}
              >
                All
              </button>
              <button 
                type="button" 
                className={`btn ${filter === 'SCHEDULED' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('SCHEDULED')}
              >
                Scheduled
              </button>
              <button 
                type="button" 
                className={`btn ${filter === 'COMPLETED' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('COMPLETED')}
              >
                Completed
              </button>
              <button 
                type="button" 
                className={`btn ${filter === 'CANCELLED' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('CANCELLED')}
              >
                Cancelled
              </button>
            </div>
          </div>
          
          {loading ? (
            <p className="text-center">Loading appointments...</p>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-4">
              <p>No appointments found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Patient</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.appointmentDate}</td>
                      <td>{appointment.patient.name}</td>
                      <td>{appointment.patient.contact}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td>{appointment.notes || 'N/A'}</td>
                      <td>
                        {appointment.status === 'SCHEDULED' && (
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => {
                                // This would typically update the appointment status to COMPLETED
                                // For now, we'll just update the UI
                                const updatedAppointments = appointments.map(a => 
                                  a.id === appointment.id ? {...a, status: 'COMPLETED'} : a
                                );
                                setAppointments(updatedAppointments);
                              }}
                            >
                              Complete
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleCancelAppointment(appointment.id)}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentList;