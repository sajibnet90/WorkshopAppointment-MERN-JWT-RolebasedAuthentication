//AvailabilityModel.js
const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: { type: Date, required: true },
    isAvailable: { type: Boolean, required: true, default: true },
    details: String  // Optional, for additional details like notes or shift times
});

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
