const Cart = require('../models/Cart');



exports.getCart = async (req, res) => {     //user cart
try {
const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
if (!cart) return res.status(404).json({ message: 'Cart not found' });
res.json(cart);
} catch (err) {
res.status(500).json({ message: err.message });
}
};



exports.addToCart = async (req, res) => {               //add to cart
try {
const { productId, quantity } = req.body;


let cart = await Cart.findOne({ userId: req.user.id });


if (cart) {

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



exports.removeFromCart = async (req, res) => {     //remove from cart
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