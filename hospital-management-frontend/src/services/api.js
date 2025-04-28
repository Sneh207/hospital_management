import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Patient related APIs
export const patientLogin = (credentials) => {
    return axios.post(`${API_BASE_URL}/patients/login`, credentials);
};

export const registerPatient = (patientData) => {
    return axios.post(`${API_BASE_URL}/patients`, patientData);
};

export const getPatientById = (id) => {
    return axios.get(`${API_BASE_URL}/patients/${id}`);
};

export const getPatientAppointments = (patientId) => {
    return axios.get(`${API_BASE_URL}/appointments/patient/${patientId}`);
};

// Doctor related APIs
export const doctorLogin = (credentials) => {
    return axios.post(`${API_BASE_URL}/doctors/login`, credentials);
};

export const registerDoctor = (doctorData) => {
    return axios.post(`${API_BASE_URL}/doctors/register`, doctorData);
};

export const getDoctorById = (id) => {
    return axios.get(`${API_BASE_URL}/doctors/${id}`);
};

export const getAllDoctors = () => {
    return axios.get(`${API_BASE_URL}/doctors`);
};

// Appointment related APIs
export const createAppointment = (appointmentData) => {
    return axios.post(`${API_BASE_URL}/appointments`, appointmentData);
};

export const getAllAppointments = () => {
    return axios.get(`${API_BASE_URL}/appointments`);
};

export const deleteAppointment = (id) => {
    return axios.delete(`${API_BASE_URL}/appointments/${id}`);
};

export const updateAppointmentStatus = (appointmentId, status) => {
    return axios.patch(`${API_BASE_URL}/appointments/${appointmentId}/status`, { status: status });
};