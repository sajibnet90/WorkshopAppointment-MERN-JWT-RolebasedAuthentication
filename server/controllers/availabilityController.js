const Availability = require('../model/AvailabilityModel');

// async function addAvailability(req, res) {
//     try {
//         const { employeeId, date, isAvailable, details } = req.body;
//         const availability = new Availability({ employeeId, date, isAvailable, details });
//         await availability.save();
//         res.status(201).json(availability);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

// async function getAvailability(req, res) {
//     try {
//         const { employeeId } = req.params;
//         const availability = await Availability.find({ employeeId });
//         res.json(availability);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// async function updateAvailability(req, res) {
//     try {
//         const { id } = req.params;
//         const availability = await Availability.findByIdAndUpdate(id, req.body, { new: true });
//         if (!availability) {
//             return res.status(404).json({ message: "Availability not found" });
//         }
//         res.json(availability);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

// async function deleteAvailability(req, res) {
//     try {
//         const { id } = req.params;
//         const result = await Availability.findByIdAndDelete(id);
//         if (!result) {
//             return res.status(404).json({ message: "Availability not found" });
//         }
//         res.json({ message: "Availability deleted successfully" });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }



//-----------

async function getEmployeeAvailability(req, res) {
    const { employeeId } = req.params;
    try {
        const availabilities = await Availability.find({ employeeId });
        res.json(availabilities);
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch availabilities", error: error.message });
    }
}


async function updateEmployeeAvailability(req, res) {
    const { employeeId, date, isAvailable } = req.body;
    try {
        const availability = await Availability.findOneAndUpdate(
            { employeeId, date },
            { isAvailable },
            { new: true, upsert: true }  // Creates a new record if none exists for that date
        );
        res.json(availability);
    } catch (error) {
        res.status(400).send({ message: "Failed to update availability", error: error.message });
    }
}
module.exports = {
    // addAvailability,
    // getAvailability,
    // updateAvailability,
    // deleteAvailability,
    getEmployeeAvailability,
    updateEmployeeAvailability
};
