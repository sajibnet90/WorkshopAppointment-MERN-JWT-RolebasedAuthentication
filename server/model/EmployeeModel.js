//filename:EmployeeModel.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    personalId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    hourlyWage: { type: Number, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
