// filename: models/Part.js
const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    unitCost: {
        type: Number,
        required: true,
        min: 0
    }
});

const Part = mongoose.model('Part', partSchema);

module.exports = Part;
