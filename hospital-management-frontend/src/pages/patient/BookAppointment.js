// src/pages/patient/BookAppointment.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDoctors, createAppointment } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    doctorId: '',
    appointmentDate: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors();
        const availableDoctors = response.data.filter(doctor => doctor.available);
        setDoctors(availableDoctors);
        setError('');
      } catch (err) {
        setError('Failed to load doctors. Please try again later.');
        console.error('Error fetching doctors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'doctorId') {
      const doctor = doctors.find(d => d.id === parseInt(value));
      setSelectedDoctor(doctor);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (!selectedDoctor) {
        throw new Error('Please select a doctor');
      }

      if (!formData.appointmentDate) {
        throw new Error('Please select an appointment date and time');
      }

      // Simplified appointment data with only necessary information
      const appointmentData = {
        doctor: { id: parseInt(formData.doctorId) },
        patient: { id: currentUser.id },
        appointmentDate: formData.appointmentDate,
        notes: formData.notes || ''
      };

      const response = await createAppointment(appointmentData);
      if (response.status === 200) {
        navigate('/patient/dashboard', { 
          state: { message: 'Appointment booked successfully!' }
        });
      } else {
        throw new Error(response.data || 'Failed to book appointment');
      }
    } catch (err) {
      console.error('Appointment booking error:', err);
      setError(err.response?.data || err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date in datetime-local
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Book an Appointment</h2>
              
              {error && <div className="alert alert-danger">{error}</div>}
              
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading doctors...</span>
                  </div>
                  <p className="mt-2">Loading available doctors...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="doctorId" className="form-label">Select Doctor</label>
                    <select
                      className="form-select"
                      id="doctorId"
                      name="doctorId"
                      value={formData.doctorId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select a Doctor --</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          Dr. {doctor.name} - {doctor.specialization}
                          {doctor.experience && ` (${doctor.experience} years exp.)`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedDoctor && (
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title">Doctor Details</h5>
                        <p className="mb-1"><strong>Name:</strong> Dr. {selectedDoctor.name}</p>
                        <p className="mb-1"><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
                        {selectedDoctor.experience && (
                          <p className="mb-1"><strong>Experience:</strong> {selectedDoctor.experience} years</p>
                        )}
                        {selectedDoctor.contact && (
                          <p className="mb-0"><strong>Contact:</strong> {selectedDoctor.contact}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label htmlFor="appointmentDate" className="form-label">Appointment Date & Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="appointmentDate"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      min={`${today}T00:00`}
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="notes" className="form-label">Notes (Optional)</label>
                    <textarea
                      className="form-control"
                      id="notes"
                      name="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Describe your symptoms or reason for the appointment"
                    ></textarea>
                  </div>
                  
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={submitting || !formData.doctorId || !formData.appointmentDate}
                    >
                      {submitting ? 'Booking...' : 'Book Appointment'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;