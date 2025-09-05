const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { registerUser, loginUser } = require("../controllers/authController");
const User = require('../models/User');

const router = express.Router();

router.get('/protected', protect, (req,res) => {
    res.json({
        message: 'You accessed a protected route!',
        user: req.user

    });
})

router.post('/register', registerUser);


router.post('/login', loginUser);

module.exports = router;