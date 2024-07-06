const { Order, Cart } = require('../templets');

// for creating a new order
exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();

        // for Removing the products from the cart
        const cart = await Cart.findOne({ user: req.body.user });
        if (cart) {
            cart.products = cart.products.filter(product => 
                !req.body.products.some(orderProduct => 
                    orderProduct.product.equals(product.product)
                )
            );
            await cart.save();
        }

        res.status(201).json(order);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ error: errors.join(', ') });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};

// for getting all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// for getting one single order
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user products.product');
        if (!order) return res.status(404).json({ message: 'Order has not been found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// for updating the order
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!order) return res.status(404).json({ message: 'Order has not been found' });
        res.status(200).json(order);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ error: errors.join(', ') });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};

// for deleting order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order has not been found' });
        res.status(200).json({ message: 'Order has been deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};