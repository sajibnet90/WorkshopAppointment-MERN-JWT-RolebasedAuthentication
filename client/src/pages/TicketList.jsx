// TicketList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TicketForm from './TicketForm';
import '../css/TicketList.css';
import AddWorkHoursForm from './AddWorkHoursForm';
import AssignEmployeeForm from './AssignEmployeeForm';
import CostDetails from './CostDetails';


const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [showForm, setShowForm] = useState(false);  // For toggling the ticket creation form
    const [activeTicketId, setActiveTicketId] = useState(null); 
    const [assigningEmployee, setAssigningEmployee] = useState(null);
    const [viewingCostEmployeeId, setViewingCostEmployeeId] = useState(null);
    const [viewingCostTicketId, setViewingCostTicketId] = useState(null);
    const navigate = useNavigate();
    const [employees, setEmployees] = useState({});
    const [ticketStatuses, setTicketStatuses] = useState({});

    useEffect(() => {
        fetchTickets();
        fetchEmployees();

    }, []);

    const fetchTickets = async () => {
        try {
            const response = await axios.get('/tickets');
            setTickets(response.data);
            console.log("TIcket",response);
        // Create a map of ticket IDs to their statuses
        const statusMap = response.data.reduce((acc, ticket) => ({
            ...acc,
            [ticket._id]: ticket.status,
        }), {});
        setTicketStatuses(statusMap);
    } catch (error) {
        console.error('Error fetching tickets:', error);
    }
};

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('/employees');
            const employeesMap = response.data.reduce((map, employee) => {
                map[employee._id] = employee.name;
                return map;
            }, {});
            setEmployees(employeesMap);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };


    const handleShowForm = () => setShowForm(!showForm);

    const handleViewDetails = (ticketId) => {
        navigate(`/ticket-management/${ticketId}`);
    };

    const handleDelete = async (ticketId) => {
        if (window.confirm("Are you sure you want to delete this ticket?")) {
            try {
                await axios.delete(`/tickets/${ticketId}`);
                fetchTickets();  // Refresh the list after deletion
            } catch (error) {
                console.error('Failed to delete ticket:', error);
                alert('Failed to delete ticket');
            }
        }
    };

    //----------------------
    const handleShowAddHoursForm = (ticketId) => {
        setActiveTicketId(ticketId);
    };

    const handleHideForm = () => {
        setActiveTicketId(null);
    };

    const handleSaveHours = async (ticketId, hours) => {
        try {
            await axios.post(`/tickets/${ticketId}/add-hours`, { hours });
            alert('Hours added successfully!');
            handleHideForm();
            fetchTickets();  // Refresh the list
        } catch (error) {
            console.error('Failed to add work hours:', error);
            alert('Failed to add work hours');
        }
    };

    //------------------------------------------
    const handleShowAssignEmployee = (ticketId) => {
        setAssigningEmployee(ticketId);
    };

    const handleHideAssignEmployee = () => {
        setAssigningEmployee(null);
    };

    const handleEmployeeAssigned = () => {
        fetchTickets();
        fetchEmployees();

        // setViewingCostTicketId(ticketId);
        // setViewingCostEmployeeId(employeeId);
        handleHideAssignEmployee();
    };
    //------------------------------------

    const handleViewCost = (ticketId, employeeId) => {
        setViewingCostTicketId(ticketId);
        setViewingCostEmployeeId(employeeId);
    };

    const handleCloseCostDetails = () => {  // Added function to handle close action
        setViewingCostTicketId(null);
        setViewingCostEmployeeId(null);
    };
    //-------------------------
    const handleCloseTicket = async (ticketId) => {
       
        try {
            // Call API to close the ticket and update status
            const response = await axios.put(`/tickets/${ticketId}/close`);
            // Update the local state to reflect the new status
            setTicketStatuses(prevStatuses => ({ ...prevStatuses, [ticketId]: response.data.status }));
            fetchTickets(); // Refresh the tickets list
        } catch (error) {
            console.error('Failed to close ticket:', error);
        }
    };
    

    return (
        <div className="ticket-list-container">
            <div className="ticket-list-header">
                <h1>Tickets List:</h1>
                <button onClick={handleShowForm} className="ticket-list-button.create">{'Create New Ticket'}</button>
            </div>
            {showForm && <TicketForm refreshTickets={fetchTickets} setShowForm={setShowForm} />}
        
            <ul className="ticket-list">
                {tickets.map(ticket => (
                    <li key={ticket._id} className="ticket-list-item">
                        <p>Ticket Number: {ticket.ticketNumber} </p> <p className={`ticket-status ${ticketStatuses[ticket._id]}`}>Status: {ticketStatuses[ticket._id]}</p>
                        <p class="assigned-employee"> Assigned To: {ticket.employeeId ? employees[ticket.employeeId] || 'Loading...' : 'No Employee assigned'}</p>

                        <div className="ticket-actions">
                            <button onClick={() => handleViewDetails(ticket._id)} className="ticket-list-button">View Ticket Details</button>
                            <button onClick={() => handleViewCost(ticket._id, ticket.employeeId)} className="ticket-list-button">View Cost</button>
                            <button onClick={() => handleDelete(ticket._id)} className="ticket-list-button delete">Delete</button>
                            <button onClick={() => handleShowAddHoursForm(ticket._id)} className="ticket-list-button">Add Work Hour</button>
                            <button onClick={() => handleShowAssignEmployee(ticket._id)} className="ticket-list-button">Assign Employee</button>
                            <button onClick={() => handleCloseTicket(ticket._id)} className="close-ticket-button">Close Ticket</button>

                            {activeTicketId === ticket._id && (
                                <AddWorkHoursForm ticketId={ticket._id} onSave={(hours) => handleSaveHours(ticket._id, hours)} onClose={handleHideForm} />
                            )}
                            {assigningEmployee === ticket._id && (
                                <AssignEmployeeForm ticketId={ticket._id} onEmployeeAssigned={handleEmployeeAssigned} onClose={handleHideAssignEmployee} />
                            )}
                            {viewingCostTicketId === ticket._id && <CostDetails 
                                                    ticketId={viewingCostTicketId}
                                                    employeeId={viewingCostEmployeeId}
                                                    onClose={handleCloseCostDetails}  />}

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TicketList;