const { Cart } = require('../templets');

// for creating a new cart
exports.createCart = async (req, res) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ error: errors.join(', ') });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};

// for getting all carts
exports.getCarts = async (req, res) => {
    try {
        const carts = await Cart.find().populate('user products.product');
        res.status(200).json(carts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// for getting one single cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).populate('user products.product');
        if (!cart) return res.status(404).json({ message: 'Cart has not been found' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// for updating a cart
exports.updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!cart) return res.status(404).json({ message: 'Cart has not been found' });
        res.status(200).json(cart);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ error: errors.join(', ') });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};

// for deleting a cart
exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) return res.status(404).json({ message: 'Cart has not been found' });
        res.status(200).json({ message: 'Cart deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
