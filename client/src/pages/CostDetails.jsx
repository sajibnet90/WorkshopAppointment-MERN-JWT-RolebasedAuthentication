//CostDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/CostDetails.css';


const CostDetails = ({ ticketId,employeeId,onClose}) => {
    const [ticketDetails, setTicketDetails] = useState(null);
    const [parts, setParts] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    //const [ticket, setTicket] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ticketRes = await axios.get(`/tickets/${ticketId}`);
                setTicketDetails(ticketRes.data);
                console.log(ticketDetails);

                const partsRes = await axios.get(`/parts/${ticketId}`);
                setParts(partsRes.data);
                console.log(parts);


                if (ticketRes.data.employeeId) {
                    const employeeRes = await axios.get(`/employees/${ticketRes.data.employeeId}`);
                    setEmployee(employeeRes.data);
                    console.log(employee);

                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [ticketId,employeeId]);

    if (loading) return <p>Loading...</p>;

    const totalPartsCost = parts.reduce((acc, part) => acc + (part.quantity * part.unitCost), 0);
    const totalLaborCost = employee ? (ticketDetails.workHours * employee.hourlyWage) : 0;
    const grandTotal = totalPartsCost + totalLaborCost;

    return (
        <div className="cost-details-container">
            <h2 className="cost-details-header">Cost Details for Ticket {ticketDetails.ticketNumber}</h2>
            <div className="cost-details-section">
                <h3>Parts Cost: ${totalPartsCost.toFixed(2)}</h3>
                <table className="cost-details-table">
                    <thead>
                        <tr>
                            <th>Part Name</th>
                            <th>Quantity</th>
                            <th>Unit Cost</th>
                            <th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parts.map(part => (
                            <tr key={part._id}>
                                <td>{part.name}</td>
                                <td>{part.quantity}</td>
                                <td>${part.unitCost.toFixed(2)}</td>
                                <td>${(part.quantity * part.unitCost).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="cost-details-section">
                <h3>Labor Cost: ${totalLaborCost.toFixed(2)}</h3>
                <p>Hours Worked: {ticketDetails.workHours}, Hourly Wage: ${employee ? employee.hourlyWage : 'N/A'}</p>
            </div>
            <h3 className="cost-details-section">Grand Total: ${grandTotal.toFixed(2)}</h3>
            <button className="cost-details-button" onClick={onClose}>Close</button>
        </div>
    );
};

export default CostDetails;