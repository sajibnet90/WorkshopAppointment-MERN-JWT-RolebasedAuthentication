
//filename: AssignEmployeeForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar'; 

const AssignEmployeeForm = ({ ticketId, onClose, onEmployeeAssigned }) => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [availability, setAvailability] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const { data } = await axios.get('/employees');
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    useEffect(() => {
        const fetchAvailability = async () => {
            if (selectedEmployeeId) {
                try {
                    const { data } = await axios.get(`/availabilities/${selectedEmployeeId}`);
                    setAvailability(data);
                } catch (error) {
                    console.error('Error fetching availability:', error);
                }
            }
        };
        fetchAvailability();
    }, [selectedEmployeeId]);

    const handleAssign = async (e) => {
        e.preventDefault();
        if (!selectedEmployeeId) {
            alert('Please select an employee');
            return;
        }
        // Additional logic to handle assignment based on availability
        try {
            await axios.post(`/tickets/${ticketId}/assign`, { employeeId: selectedEmployeeId });
            alert('Employee assigned successfully');
            onEmployeeAssigned();
            onClose();
        } catch (error) {
            console.error('Error assigning employee:', error);
            alert('Failed to assign employee');
        }
    };

    return (
        <form onSubmit={handleAssign}>
            <select value={selectedEmployeeId} onChange={e => setSelectedEmployeeId(e.target.value)}>
                <option value="">Select an Employee</option>
                {employees.map(employee => (
                    <option key={employee._id} value={employee._id}>{employee.name}</option>
                ))}
            </select>
            {selectedEmployeeId && availability.length > 0 && (
                <Calendar
                    value={availability.map(a => new Date(a.date))}
                    tileDisabled={({ date, view }) => 
                        view === 'month' && !availability.some(a => new Date(a.date).toDateString() === date.toDateString() && a.isAvailable)}
                />
            )}
            <button type="submit">Assign</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default AssignEmployeeForm;
