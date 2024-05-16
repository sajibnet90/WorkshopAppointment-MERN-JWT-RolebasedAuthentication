//filename:TicketModel.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticketNumber: {
        type: String,
        unique: true
    },
    carBrand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bookedDate: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['created', 'inprogress', 'done'],
        default: 'created'
    },
    workHours: { 
        type: Number, 
        default: 0 
    },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }  // Link to an employee

});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
