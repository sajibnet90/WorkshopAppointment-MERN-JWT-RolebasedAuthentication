import React, { useState } from 'react';
import axios from 'axios';

const AddPartForm = ({ ticketId , onClose, setParts}) => {
    const [partData, setPartData] = useState({
        name: '',
        quantity: 1,
        unitCost: 0
    });

    const handleChange = (event) => {
        setPartData({ ...partData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/parts', { ...partData, ticketId });
            console.log('Part added:', response.data);
            // Clear the form or close it
            setParts(prevParts => [...prevParts, response.data]);
            setPartData({ name: '', quantity: 1, unitCost: 0 });
            onClose();
        } catch (error) {
            console.error('Error adding part:', error.response?.data || error.message);
        }
    };
    const handleCancel = () => {
        // Close the form when cancel is clicked
        onClose();
    };


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="partName">Part Name</label>
            <input
                type="text"
                id="partName"
                name="name"
                value={partData.name}
                onChange={handleChange}
                placeholder="Part Name"
                required
            />

            <label htmlFor="quantity">Quantity</label>
            <input
                type="number"
                id="quantity"
                name="quantity"
                value={partData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                required
            />

            <label htmlFor="unitCost">Unit Cost</label>
            <input
                type="number"
                id="unitCost"
                name="unitCost"
                value={partData.unitCost}
                onChange={handleChange}
                placeholder="Unit Cost"
                required
            />
            <div className="form-buttons">
            <button type="button" onClick={handleCancel}>Cancel</button>
            <button type="submit">Add Part</button>
            </div>
        </form>
    );
};
export default AddPartForm;
