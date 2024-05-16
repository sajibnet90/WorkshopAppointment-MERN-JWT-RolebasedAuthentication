import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styling for the calendar

const AvailabilityCalendar = ({ employeeId, bookedDates }) => {
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (employeeId) {
            fetchAvailability();
        }
    }, [employeeId]);

    const fetchAvailability = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/availabilities/${employeeId}`);
            setAvailability(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch availability:", error);
            setLoading(false);
        }
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            
            // Check if the date is in the bookedDates
            if (bookedDates.includes(dateString)) {
                return 'react-calendar__tile--booked';
            }
            
            // Find availability info for the particular day
            const dayInfo = availability.find(d => new Date(d.date).toISOString().split('T')[1] === dateString);
            
            // Apply class based on availability
            return dayInfo && !dayInfo.isAvailable ? 'react-calendar__tile--unavailable' : null;
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading calendar...</p>
            ) : (
                <Calendar
                    tileClassName={tileClassName}
                />
            )}
        </div>
    );
};

export default AvailabilityCalendar;





// const AvailabilityCalendar = ({ employeeId }) => {
//     const [availability, setAvailability] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (employeeId) {
//             fetchAvailability();
//         }
//     }, [employeeId]);

//     const fetchAvailability = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`/availabilities/${employeeId}`);
//             setAvailability(response.data);
//             setLoading(false);
//         } catch (error) {
//             console.error("Failed to fetch availability:", error);
//             setLoading(false);
//         }
//     };

//     // Helper to determine if a day is available
//     const isDayAvailable = (date) => {
//         const formatDate = date.toISOString().split('T')[0];
//         const dayInfo = availability.find(d => d.date === formatDate);
//         return dayInfo ? dayInfo.isAvailable : true; // Assume available if no data
//     };

//     return (
//         <div>
//             {loading ? (
//                 <p>Loading calendar...</p>
//             ) : (
//                 <Calendar
//                     tileClassName={({ date, view }) => view === 'month' && isDayAvailable(date) ? 'available' : 'unavailable'}
//                 />
//             )}
//         </div>
//     );
// };

// export default AvailabilityCalendar;
