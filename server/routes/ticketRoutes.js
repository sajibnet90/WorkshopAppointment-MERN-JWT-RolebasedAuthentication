//filename: server/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const { createTicket, getAllTickets, updateTicket, deleteTicket, getTicketById,addWorkHours,assignEmployeeToTicket,bookedDatesEmployee, closeTicket } = require('../controllers/ticketController');

router.post('/tickets', createTicket);
router.get('/tickets', getAllTickets);
router.get('/tickets/:id', getTicketById);
router.put('/tickets/:id', updateTicket);
router.delete('/tickets/:id', deleteTicket);
router.post('/tickets/:id/add-hours', addWorkHours);
router.post('/tickets/:id/assign', assignEmployeeToTicket);
router.get('/tickets/booked-dates/:employeeId', bookedDatesEmployee)
router.put('/tickets/:id/close', closeTicket);


module.exports = router;
