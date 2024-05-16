// filename: server/routes/partRoutes.js
const express = require('express');
const router = express.Router();
const Part = require('../model/Part'); // Adjust the path as necessary

// POST /parts to add a new part
router.post('/parts', async (req, res) => {
    try {
        const { ticketId, name, quantity, unitCost } = req.body;
        const part = new Part({
            ticketId,
            name,
            quantity,
            unitCost
        });
        await part.save();
        res.status(201).send(part);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET /parts/:ticketId to fetch all parts associated with a specific ticket
router.get('/parts/:ticketId', async (req, res) => {
    try {
        const { ticketId } = req.params;
        const parts = await Part.find({ ticketId });  // Assuming `ticketId` is a field in your Part model
        if (!parts) {
            return res.status(404).send('No parts found for this ticket.');
        }
        res.send(parts);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
