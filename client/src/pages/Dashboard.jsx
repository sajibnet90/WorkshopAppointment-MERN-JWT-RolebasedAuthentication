import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import AvailabilityCalendar from './AvailabilityCalendar';
import { FaUsers, FaTicketAlt, FaCalendarAlt } from 'react-icons/fa';
import '../css/Dashboard.css';


export default function Dashboard() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [bookedDates, setBookedDates] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);

    // Fetch employees on component mount
    useEffect(() => {
        axios.get('/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch employees:', error);
            });
    }, []);

    // Fetch booked dates when selectedEmployee changes
    useEffect(() => {
        if (selectedEmployee) {
            fetchBookedDates(selectedEmployee); // Using the refactored function
        } else {
            setBookedDates([]); // Clear booked dates if no employee is selected
        }
    }, [selectedEmployee]);

    // Function to fetch booked dates from the server
    const fetchBookedDates = (employeeId) => {
        axios.get(`/tickets/booked-dates/${employeeId}`)
            .then(response => {
                setBookedDates(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch booked dates:', error);
            });
    };

    const handleEmployeeChange = (e) => {
        setSelectedEmployee(e.target.value);
        setShowCalendar(!!e.target.value); // Only show calendar if an employee is selected
    };

    return (
        <div className="dashboard">
            {!!user && (
                <>
                    <h2>Hi, {user.name}!</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        {user.username === 'admin' && (
                            <button onClick={() => navigate('/employee-management')}>
                                <FaUsers style={{ marginRight: '8px' }} />
                                Manage Employees
                            </button>
                        )}
                        <button onClick={() => navigate('/ticket-management')}>
                            <FaTicketAlt style={{ marginRight: '8px' }} />
                            Manage Tickets
                        </button>
                        <div>
                            <button onClick={() => setShowCalendar(!showCalendar)}>
                                <FaCalendarAlt style={{ marginRight: '8px' }} />
                                Check Employee Schedule
                            </button>
                            {showCalendar && (
                                <>
                                    <select value={selectedEmployee} onChange={handleEmployeeChange}>
                                        <option value="">Select an Employee</option>
                                        {employees.map(emp => (
                                            <option key={emp._id} value={emp._id}>{emp.name}</option>
                                        ))}
                                    </select>
                                    {selectedEmployee && (
                                        <AvailabilityCalendar
                                            employeeId={selectedEmployee}
                                            bookedDates={bookedDates}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
