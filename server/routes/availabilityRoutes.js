const express = require('express');
const router = express.Router();
const {
    // addAvailability,
    // getAvailability,
    // updateAvailability,
    // deleteAvailability,
    getEmployeeAvailability,
    updateEmployeeAvailability
} = require('../controllers/availabilityController');

// router.post('/availability', addAvailability);
// router.get('/availability/:employeeId', getAvailability);
// router.put('/availability/:id', updateAvailability);
// router.delete('/availability/:id', deleteAvailability);

router.get('/availabilities/:employeeId', getEmployeeAvailability);
router.post('/availabilities/update', updateEmployeeAvailability);



module.exports = router;
