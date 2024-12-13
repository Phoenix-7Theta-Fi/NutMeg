import axios from 'axios';

const API_URL = 'http://localhost:5000/api/appointments';

// Get user's appointments
export const getUserAppointments = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Get practitioner's appointments
export const getPractitionerAppointments = async (practitionerId) => {
    try {
        const response = await axios.get(`${API_URL}/practitioner/${practitionerId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Book new appointment
export const bookAppointment = async (appointmentData) => {
    try {
        const response = await axios.post(API_URL, appointmentData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Update appointment status
export const updateAppointmentStatus = async (appointmentId, status) => {
    try {
        const response = await axios.put(`${API_URL}/${appointmentId}`, { status });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
