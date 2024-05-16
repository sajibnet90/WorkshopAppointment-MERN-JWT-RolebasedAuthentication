//filename: AddWorkHoursForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddWorkHoursForm = ({ ticketId, onSave, onClose }) => {
    const [hours, setHours] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(hours);  // Pass hours up to parent component to handle the save
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="Enter hours" min="0.1" step="0.1" required />
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default AddWorkHoursForm;
