//filename: server/controllers/ticketController.js
const Ticket = require('../model/TicketModel');  // Assuming this path is correct

async function createTicket(req, res) {
    try {
        const { ticketNumber, carBrand, model, registrationNumber, description, bookedDate, timeSlot } = req.body;
        const ticket = await Ticket.create({ ticketNumber, carBrand, model, registrationNumber, description, bookedDate, timeSlot });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getTicketById(req, res) {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).send('Ticket not found');
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function getAllTickets(req, res) {
    try {
        const tickets = await Ticket.find({});
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateTicket(req, res) {
    try {
        const update = req.body;
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteTicket(req, res) {
    try {
        const result = await Ticket.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//----------------------------Add hours endpoint--------------------------------
async function addWorkHours(req, res) {
    try {
        const { hours } = req.body;
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { $inc: { workHours: hours } }, // Increment work hours by the provided amount
            { new: true } // Return the updated document
        );
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ message: 'Error adding work hours: ' + error.message });
    }
}
//---------------------------------------------------------
async function assignEmployeeToTicket(req, res) {
    const { id } = req.params;  // ID of the ticket
    const { employeeId } = req.body;  // ID of the employee to assign

    try {
        // Update the ticket with the employee ID
        const updatedTicket = await Ticket.findByIdAndUpdate(id, { employeeId: employeeId, status: 'inprogress' }, { new: true });
        if (!updatedTicket) {
            return res.status(404).send('Ticket not found');
        }
        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//_------------------------------------------------

// Assuming each ticket has an 'employeeId' and a 'bookedDate'
async function bookedDatesEmployee(req, res) {
    try {
        const employeeId = req.params.employeeId;
        console.log("Fetching booked dates for employee ID:", employeeId);

        const tickets = await Ticket.find({ employeeId: employeeId });
        const bookedDates = tickets.map(ticket => ticket.bookedDate.toISOString().split('T')[0]);
        console.log("Booked dates found:", bookedDates);

        res.json(bookedDates);
    } catch (error) {
        console.error("Error fetching booked dates:", error);
        res.status(500).json({ message: 'Failed to fetch booked dates', error: error.message });
    }
};

//----------------------
async function closeTicket(req, res) {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { status: 'done' }, // Set status to 'Done'
            { new: true }
        );
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createTicket,
    getAllTickets,
    updateTicket,
    deleteTicket,
    getTicketById,
    addWorkHours,
    assignEmployeeToTicket,
    bookedDatesEmployee,
    closeTicket
};
