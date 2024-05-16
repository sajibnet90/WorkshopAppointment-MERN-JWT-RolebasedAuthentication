import React, { useState, useEffect } from 'react';
import axios from 'axios';

// A form component for adding new tickets
const TicketForm = ({ refreshTickets, setShowForm }) => {
    const [formData, setFormData] = useState({
        ticketNumber: '',
        carBrand: '',
        model: '',
        registrationNumber: '',
        description: '',
        bookedDate: '',
        timeSlot: ''
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const generateTicketNumber = () => {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            
            const ticketNumber = `${day}${month}${year}${hours}${minutes}`;
            return ticketNumber;
        };
        const randomTicketNumber = generateTicketNumber();
        // Set the ticketNumber in formData
        const updatedFormData = {
            ...formData,
            ticketNumber: randomTicketNumber
        };


        try {
            await axios.post('/tickets', updatedFormData);
            setFormData({
                ticketNumber: '',
                carBrand: '',
                model: '',
                registrationNumber: '',
                description: '',
                bookedDate: '',
                timeSlot: ''
            });
            refreshTickets(); // Refresh the list of tickets after adding a new one
            setShowForm(false); // Optionally hide the form on successful submission
        } catch (error) {
            console.error('Error adding ticket:', error.response.data);
        }
    };

    const handleCancel = () => {
        // Reset form and hide it
        setFormData({
            ticketNumber: '',
            carBrand: '',
            model: '',
            registrationNumber: '',
            description: '',
            bookedDate: '',
            timeSlot: ''
        });
        setShowForm(false);
    };

    return (
        <form onSubmit={handleSubmit} className="ticket-form">
            <input name="carBrand" value={formData.carBrand} onChange={handleChange} placeholder="Car Brand" required />
            <input name="model" value={formData.model} onChange={handleChange} placeholder="Model" required />
            <input name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="Registration Number" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <input name="bookedDate" type="date" value={formData.bookedDate} onChange={handleChange} required />
            <input name="timeSlot" type="time" value={formData.timeSlot} onChange={handleChange} required />
            <div className="form-buttons">
                <button type="submit">Create</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>

        </form>
    );
};
export default TicketForm;
