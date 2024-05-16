//EmployeeManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm'; 

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);  // State for the employee currently being edited


    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await axios.delete(`/employees/${id}`);
                fetchEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setShowForm(true);
    };


    return (
        <div>
            <h1>Employee Management</h1>
            <button onClick={() => { setShowForm(!showForm); setEditingEmployee(null); }}>
                {showForm ? 'Cancel' : 'Create New Employee'}
            </button>
            {showForm && <EmployeeForm employee={editingEmployee} fetchEmployees={fetchEmployees} onHideForm={toggleForm} />}
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Personal ID</th>
                        <th>Name</th>
                        <th>Hourly Wage</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee._id}>
                            <td>{employee.personalId}</td>
                            <td>{employee.name}</td>
                            <td>${employee.hourlyWage.toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleEdit(employee)}>Edit</button>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default EmployeeManagement;