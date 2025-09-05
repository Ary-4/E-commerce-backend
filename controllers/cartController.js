const Cart = require('../models/Cart');


// GET user's cart
exports.getCart = async (req, res) => {
try {
const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
if (!cart) return res.status(404).json({ message: 'Cart not found' });
res.json(cart);
} catch (err) {
res.status(500).json({ message: err.message });
}
};


// ADD product to cart
exports.addToCart = async (req, res) => {
try {
const { productId, quantity } = req.body;


let cart = await Cart.findOne({ userId: req.user.id });


if (cart) {
// Check if product exists in cart
const itemIndex = cart.products.findIndex(p => p.productId == productId);
if (itemIndex > -1) {
cart.products[itemIndex].quantity += quantity;
} else {
cart.products.push({ productId, quantity });
}
} else {
cart = new Cart({ userId: req.user.id, products: [{ productId, quantity }] });
}


await cart.save();
res.json(cart);
} catch (err) {
res.status(500).json({ message: err.message });
}
};


// REMOVE product from cart
exports.removeFromCart = async (req, res) => {
try {
const { productId } = req.params;
const cart = await Cart.findOne({ userId: req.user.id });
if (!cart) return res.status(404).json({ message: 'Cart not found' });


cart.products = cart.products.filter(p => p.productId != productId);
await cart.save();
res.json(cart);
} catch (err) {
res.status(500).json({ message: err.message });
}
};