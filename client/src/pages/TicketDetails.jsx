// TicketDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddPartForm from './AddPartForm';
import { useNavigate } from 'react-router-dom';

import '../css/TicketDetails.css';


const TicketDetails = () => {
    const [ticket, setTicket] = useState(null);
    const [parts, setParts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showAddPartForm, setShowAddPartForm] = useState(false);
    const navigate = useNavigate(); 
    const [editFormData, setEditFormData] = useState({
        carBrand: '',
        model: '',
        registrationNumber: '',
        description: '',
        bookedDate: '',
        timeSlot: ''
    });
    const { ticketId } = useParams();

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`/tickets/${ticketId}`);
                console.log("Fetching ticket with ID:", ticketId); // Add this in your fetchTicket function in TicketDetails.jsx
                setTicket(response.data);
                setEditFormData({
                    carBrand: response.data.carBrand,
                    model: response.data.model,
                    registrationNumber: response.data.registrationNumber,
                    description: response.data.description,
                    bookedDate: response.data.bookedDate.split('T')[0],
                    timeSlot: response.data.timeSlot
                });
            } catch (error) {
                console.error('Error fetching ticket details:', error);
            }
        };
        fetchTicket();
    }, [ticketId]);

    //parts useEffect---------

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const partsResponse = await axios.get(`/parts/${ticketId}`); // Assuming your API endpoint is something like this
                setParts(partsResponse.data);
            } catch (error) {
                console.error('Error fetching parts:', error);
            }
        };
    
        if (ticket) {
            fetchParts();
        }
    }, [ticketId, ticket]); // Depend on ticket to ensure it is loaded before fetching parts

    //--------
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`/tickets/${ticketId}`, editFormData);
            setIsEditing(false);
            setTicket({ ...ticket, ...editFormData });
        } catch (error) {
            console.error('Failed to update ticket:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const toggleAddPartForm = () => {
        setShowAddPartForm(!showAddPartForm);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA');
    };

    //-------------
    const handleCancel = () => {
        navigate(`/ticket-management/`);
    };

    //------------
    const renderPartsTable = () => {
        return (
            <table className="parts-table">
                <thead>
                    <tr>
                        <th>Part Name</th>
                        <th>Quantity</th>
                        <th>Unit Cost (€)</th>
                    </tr>
                </thead>
                <tbody>
                    {parts.map(part => (
                        <tr key={part.id}>
                            <td>{part.name}</td>
                            <td>{part.quantity}</td>
                            <td>{part.unitCost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };
    //----------------------

    return (
        <div className="ticket-details-container">
            <h3>Ticket Details: {ticket ? `Tkt Num ${ticket.ticketNumber}` : " No Ticket Data ..."}</h3>
            {ticket ? (
                <div>
                    {isEditing ? (
                        <div className="ticket-details-edit-form">
                            <label>Car Brand: <input type="text" name="carBrand" value={editFormData.carBrand} onChange={handleChange} /></label>
                            <label>Model: <input type="text" name="model" value={editFormData.model} onChange={handleChange} /></label>
                            <label>Registration Number: <input type="text" name="registrationNumber" value={editFormData.registrationNumber} onChange={handleChange} /></label>
                            <label>Description: <input type="text" name="description" value={editFormData.description} onChange={handleChange} /></label>
                            <label>Booked Date: <input type="date" name="bookedDate" value={editFormData.bookedDate} onChange={handleChange} /></label>
                            <label>Time Slot: <input type="time" name="timeSlot" value={editFormData.timeSlot} onChange={handleChange} /></label>
                            <button onClick={handleSaveEdit}>Save</button>
                            <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
                        </div>
                    ) : (
                        <div>
                        <table className="ticket-details-table">
                            <tbody>
                                <tr><th>Car Brand</th><td>{ticket.carBrand}</td></tr>
                                <tr><th>Model</th><td>{ticket.model}</td></tr>
                                <tr><th>Registration Number</th><td>{ticket.registrationNumber}</td></tr>
                                <tr><th>Description</th><td>{ticket.description}</td></tr>
                                <tr><th>Booked Date</th><td>{formatDate(ticket.bookedDate)}</td></tr>
                                <tr><th>Time Slot</th><td>{ticket.timeSlot}</td></tr>
                            </tbody>
                        </table>
                        <div>
                            <h3>Parts Associated with this Ticket</h3>
                            {parts && parts.length > 0 && renderPartsTable()}
                        </div>
                            <button onClick={() => setIsEditing(true)}>Edit Ticket</button>
                            <button onClick={toggleAddPartForm}>Add Part</button>
                            <button onClick={handleCancel} >Close</button>

                        </div>
                        
                    )}
                    {showAddPartForm && <AddPartForm ticketId={ticket._id} setParts={setParts} onClose={toggleAddPartForm} />}
                </div>
            ) : (
                <p>No Data available...</p>
            )}
        </div>
    );
};

export default TicketDetails;


