import React, { useState } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AppointmentSlots.css';

const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

const AppointmentSlots = ({ practitionerId, onBookAppointment, bookedSlots = [] }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [notes, setNotes] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedSlot(null);
    };

    const isSlotBooked = (slot) => {
        return bookedSlots.some(
            bookedSlot => 
                format(new Date(bookedSlot.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') &&
                bookedSlot.timeSlot === slot
        );
    };

    const handleBooking = () => {
        if (!selectedSlot) {
            toast.error('Please select a time slot');
            return;
        }
        if (!name) {
            toast.error('Please enter your name');
            return;
        }
        if (!email) {
            toast.error('Please enter your email');
            return;
        }
        
        onBookAppointment({
            practitionerId,
            name,
            email,
            date: selectedDate,
            timeSlot: selectedSlot,
            notes
        });
    };

    return (
        <div className="appointment-slots">
            <h3>Book an Appointment</h3>
            
            <div className="form-group">
                <label>Select Date:</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    className="date-picker"
                />
            </div>

            <div className="form-group">
                <label>Available Time Slots:</label>
                <div className="time-slots">
                    {timeSlots.map(slot => (
                        <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`time-slot ${selectedSlot === slot ? 'selected' : ''} ${isSlotBooked(slot) ? 'booked' : ''}`}
                            disabled={isSlotBooked(slot)}
                        >
                            {slot}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Your Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
            </div>

            <div className="form-group">
                <label>Your Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
            </div>

            <div className="form-group">
                <label>Notes (Optional):</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special notes or concerns?"
                />
            </div>

            <button 
                className="book-button"
                onClick={handleBooking}
                disabled={!selectedSlot || !name || !email}
            >
                Book Appointment
            </button>
        </div>
    );
};

export default AppointmentSlots;
