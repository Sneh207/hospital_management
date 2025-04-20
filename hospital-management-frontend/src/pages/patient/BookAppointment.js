// src/pages/patient/BookAppointment.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDoctors, createAppointment } from '../../services/api';
import { AuthContext } from '../context/AuthContext';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
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
        setDoctors(response.data);
      } catch (err) {
        setError('Failed to load doctors');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      // Find the selected doctor object
      const selectedDoctor = doctors.find(doctor => doctor.id === parseInt(formData.doctorId));
      
      if (!selectedDoctor) {
        throw new Error('Please select a valid doctor');
      }

      // Prepare appointment data
      const appointmentData = {
        doctor: selectedDoctor,
        patient: currentUser,
        appointmentDate: formData.appointmentDate,
        notes: formData.notes,
        status: 'SCHEDULED'
      };

      await createAppointment(appointmentData);
      navigate('/patient/dashboard', { state: { message: 'Appointment booked successfully!' } });
    } catch (err) {
      setError(err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Book an Appointment</h2>
              
              {error && <div className="alert alert-danger">{error}</div>}
              
              {loading ? (
                <p className="text-center">Loading doctors...</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
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
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="appointmentDate" className="form-label">Appointment Date & Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="appointmentDate"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
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
                  
                  <div className="d-grid gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={submitting}
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