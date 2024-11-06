const BookingRec = require('../model/product'); 

// Function to get all bookings
const getUser = async (req, res) => {
    try {
        const bookings = await BookingRec.findAll(); // Fetch all bookings
        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error fetching bookings' });
    }
};

// Function to create a new booking
const addUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        
        // Validation
        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const booking = await BookingRec.create({ name, email, phone });
        res.status(201).json({ success: true, booking });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error creating booking' });
    }
};

// Function to delete a booking by ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

    
        const booking = await BookingRec.findByPk(id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        await booking.destroy(); // Delete the booking
        res.status(200).json({ success: true, message: 'Booking deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error deleting booking' });
    }
};

module.exports = { addUser, getUser, deleteUser };
