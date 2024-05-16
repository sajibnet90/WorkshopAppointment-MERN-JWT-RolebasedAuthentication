//filename: server/controllers/emplyoeeController.js
const Employee = require('../model/EmployeeModel');  // Assuming this path is correct

async function createEmployee(req, res) {
    try {
        const { personalId, name, hourlyWage } = req.body;
        const employee = new Employee({
            personalId,
            name,
            hourlyWage
        });
        const savedEmployee = await employee.save();
        res.status(201).send(savedEmployee);
    } catch (error) {
        console.error("Error saving employee:", error);
        res.status(400).json({ message: "Failed to save employee", error: error.message });
    }
}

// Example route for fetching employee by ID
async function getEmployeeById(req, res){
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.json(employee);
    } catch (error) {
        res.status(500).send(error);
    }
};


async function getAllEmployees(req, res) {
    try {
        const employees = await Employee.find({});
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateEmployee(req, res) {
    try {
        const { id } = req.params;
        const { personalId, name, hourlyWage } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(id, { personalId, name, hourlyWage }, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteEmployee(req, res) {
    try {
        const { id } = req.params;
        const result = await Employee.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee,
    getEmployeeById
};