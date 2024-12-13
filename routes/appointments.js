const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get all appointments for a practitioner
router.get('/practitioner/:id', async (req, res) => {
    try {
        const appointments = await Appointment.find({ practitioner: req.params.id })
            .sort({ date: 1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Book a new appointment
router.post('/', async (req, res) => {
    try {
        const { practitionerId, name, email, date, timeSlot, notes } = req.body;
        
        // Check if slot is available
        const existingAppointment = await Appointment.findOne({
            practitioner: practitionerId,
            date,
            timeSlot,
            status: { $ne: 'cancelled' }
        });

        if (existingAppointment) {
            return res.status(400).json({ msg: 'This time slot is already booked' });
        }

        const newAppointment = new Appointment({
            practitioner: practitionerId,
            name,
            email,
            date,
            timeSlot,
            notes
        });

        const appointment = await newAppointment.save();
        res.json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
