import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppointmentSlots from './AppointmentSlots';
import { getPractitionerAppointments, bookAppointment } from '../services/appointmentService';
import './PractitionerProfile.css';

const PractitionerProfile = () => {
    const { name } = useParams();
    const [practitioner, setPractitioner] = useState(null);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPractitionerData = async () => {
            try {
                // Fetch practitioner details
                const response = await fetch(`http://localhost:5000/api/practitioners/${name}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch practitioner');
                }
                const data = await response.json();
                setPractitioner(data);

                // Fetch booked appointments
                const appointments = await getPractitionerAppointments(data._id);
                setBookedSlots(appointments);
            } catch (error) {
                console.error('Error fetching practitioner data:', error);
                toast.error('Error loading practitioner data');
            } finally {
                setLoading(false);
            }
        };

        if (name) {
            fetchPractitionerData();
        }
    }, [name]);

    const handleBookAppointment = async (appointmentData) => {
        try {
            const booked = await bookAppointment({
                ...appointmentData,
                practitioner: practitioner._id
            });
            toast.success('Appointment booked successfully!');
            
            // Refresh booked slots
            const appointments = await getPractitionerAppointments(practitioner._id);
            setBookedSlots(appointments);
        } catch (error) {
            console.error('Error booking appointment:', error);
            toast.error(error.message || 'Error booking appointment');
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!practitioner) {
        return <div className="error">Practitioner not found</div>;
    }

    return (
        <div className="practitioner-profile">
            <div className="profile-header">
                <h1>{practitioner.name}</h1>
                <h2>{practitioner.title}</h2>
            </div>
            
            <div className="profile-content">
                <div className="profile-info">
                    <h3>About</h3>
                    <p>{practitioner.bio}</p>
                    
                    <h3>Specializations</h3>
                    <ul>
                        {practitioner.specializations.map((spec, index) => (
                            <li key={index}>{spec}</li>
                        ))}
                    </ul>
                    
                    <h3>Experience</h3>
                    <p>{practitioner.experience} years</p>
                    
                    <h3>Location</h3>
                    <p>{practitioner.clinicLocation}</p>
                    
                    <h3>Consultation Hours</h3>
                    <p>{practitioner.consultationHours}</p>
                </div>
                
                <div className="appointment-section">
                    <h3>Book an Appointment</h3>
                    <AppointmentSlots 
                        practitionerId={practitioner._id}
                        bookedSlots={bookedSlots}
                        onBookAppointment={handleBookAppointment}
                    />
                </div>
            </div>
        </div>
    );
};

export default PractitionerProfile;
