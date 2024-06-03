//server/routes/authRoutes.js
const express = require ('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile , doLogout } = require('../controllers/authController');


router.get('/');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', doLogout);


module.exports = router
