const Order = require('../models/Order');
const Cart = require('../models/Cart');


const createOrder = async (req, res) => {               //order checkout
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cart.products.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );

    const order = await Order.create({
      userId: req.user.id,
      products: cart.products,
      totalPrice
    });

    
    cart.products = [];                               // empty cart after checkout
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getUserOrders = async (req, res) => {           // get orders
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllOrders = async (req, res) => {        // all orders by admin
  try {
    const orders = await Order.find().populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateOrderStatus = async (req, res) => {        // updating order status by admin
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};
