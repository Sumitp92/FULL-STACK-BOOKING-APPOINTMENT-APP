const express = require('express');
const { addUser, getUser, deleteUser } = require('../controllers/products');

const router = express.Router();


router.get('/', getUser); // Fetch all bookings

router.post('/', addUser); // Create a new booking

router.delete('/:id', deleteUser); // Delete a booking by ID

module.exports = router;
