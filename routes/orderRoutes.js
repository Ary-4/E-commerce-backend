const express = require('express');
const router = express.Router();
const {
createOrder,
getUserOrders,
getAllOrders,
updateOrderStatus
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');



router.post('/', protect, createOrder);
router.get('/myorders', protect, getUserOrders);



router.get('/', protect, getAllOrders);
router.put('/:id', protect, updateOrderStatus);


module.exports = router;