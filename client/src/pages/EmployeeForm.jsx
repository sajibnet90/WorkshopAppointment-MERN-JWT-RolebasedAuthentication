//filename:EmployeeForm.jsx
import React, { useState,useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ employee, fetchEmployees, onHideForm }) => {
    const [formData, setFormData] = useState({
        personalId: employee ? employee.personalId : '',
        name: employee ? employee.name : '',
        hourlyWage: employee ? employee.hourlyWage : ''
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                personalId: employee.personalId,
                name: employee.name,
                hourlyWage: employee.hourlyWage
            });
        }
    }, [employee]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = employee ? `/employees/${employee._id}` : '/employees';
        const method = employee ? 'put' : 'post';

        try {
            await axios[method](url, formData);
            setFormData({ personalId: '', name: '', hourlyWage: '' });
            fetchEmployees();
            if (onHideForm) onHideForm();

            } catch (error) {
                if (error.response) {
                    const errorData = error.response.data;
                    if (error.response.status === 400) {
                        if (errorData.error && errorData.error.includes('duplicate key error')) {
                            // Extract and display the duplicate key if possible
                            const duplicateValueMatch = errorData.error.match(/dup key: \{ : "(.*?)" \}/);
                            const duplicateValue = duplicateValueMatch ? duplicateValueMatch[1] : 'specified value';
                            alert(`Error: Duplicate Personal ID. The ID ${duplicateValue} is already in use.`);
                        } else {
                            alert('Error adding employee: ' + errorData.message);
                        }
                    } 
                } 
            }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="personalId"
                value={formData.personalId}
                onChange={handleChange}
                placeholder="Personal ID"
                required
            />
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input
                name="hourlyWage"
                value={formData.hourlyWage}
                onChange={handleChange}
                placeholder="Hourly Wage"
                type="number"
                required
            />
            <button type="submit">{employee ? 'Update Employee' : 'Add Employee'}</button>
        </form>
    );
};

export default EmployeeForm;