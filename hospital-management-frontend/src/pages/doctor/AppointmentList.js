import React, { useState, useEffect, useContext } from 'react';
import { getAllAppointments, updateAppointmentStatus } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
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
        setError('');
      } catch (err) {
        setError('Failed to load appointments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentUser.id]);

  // Handle appointment status update
  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const response = await updateAppointmentStatus(appointmentId, newStatus);
      if (response?.data) {
        setAppointments(appointments.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: newStatus }
            : appointment
        ));
        setError('');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.response?.data || 'Failed to update appointment status');
    }
  };

  // Filter appointments based on selected filters and search term
  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = filter === 'ALL' || appointment.status === filter;
    const matchesSearch = searchTerm === '' || 
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    const appointmentDate = new Date(appointment.appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch (dateFilter) {
      case 'TODAY':
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        matchesDate = appointmentDate >= today && appointmentDate < tomorrow;
        break;
      case 'UPCOMING':
        matchesDate = appointmentDate >= today;
        break;
      case 'PAST':
        matchesDate = appointmentDate < today;
        break;
      default:
        matchesDate = true;
    }

    return matchesStatus && matchesSearch && matchesDate;
  });

  // Sort appointments by date
  const sortedAppointments = [...filteredAppointments].sort((a, b) => 
    new Date(a.appointmentDate) - new Date(b.appointmentDate)
  );

  // Get badge class based on status
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

  // Format date and time
  const formatDateTime = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="container">
      <h2 className="mb-4">Appointments</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="card">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search patients or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-8">
              <div className="btn-group float-end" role="group">
                <button 
                  type="button" 
                  className={`btn ${dateFilter === 'ALL' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setDateFilter('ALL')}
                >
                  All Dates
                </button>
                <button 
                  type="button" 
                  className={`btn ${dateFilter === 'TODAY' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setDateFilter('TODAY')}
                >
                  Today
                </button>
                <button 
                  type="button" 
                  className={`btn ${dateFilter === 'UPCOMING' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setDateFilter('UPCOMING')}
                >
                  Upcoming
                </button>
                <button 
                  type="button" 
                  className={`btn ${dateFilter === 'PAST' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setDateFilter('PAST')}
                >
                  Past
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="btn-group" role="group">
              <button 
                type="button" 
                className={`btn ${filter === 'ALL' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('ALL')}
              >
                All Status
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
                className={`btn ${filter === 'ACCEPTED' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('ACCEPTED')}
              >
                Accepted
              </button>
              <button 
                type="button" 
                className={`btn ${filter === 'REJECTED' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('REJECTED')}
              >
                Rejected
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading appointments...</span>
              </div>
              <p className="mt-2">Loading appointments...</p>
            </div>
          ) : sortedAppointments.length === 0 ? (
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
                  {sortedAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{formatDateTime(appointment.appointmentDate)}</td>
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
                              onClick={() => handleStatusUpdate(appointment.id, 'ACCEPTED')}
                              title="Accept appointment"
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => handleStatusUpdate(appointment.id, 'REJECTED')}
                              title="Reject appointment"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {appointment.status === 'ACCEPTED' && (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleStatusUpdate(appointment.id, 'COMPLETED')}
                            title="Mark as completed"
                          >
                            Complete
                          </button>
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