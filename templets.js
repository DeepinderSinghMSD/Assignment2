const mongoose = require('mongoose');

// Schema for product 
const ProductSchema = new mongoose.Schema({
    description: String,
    image: String,
    pricing: Number,
    shippingCost: Number,
    rating: Number,
});
const Product = mongoose.model('Product', ProductSchema);

// Schema for user
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    shippingAddress: String,
});
const User = mongoose.model('User', UserSchema);

// Schema for comment
const CommentSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: Number,
    images: [String],
    text: String,
});
const Comment = mongoose.model('Comment', CommentSchema);

// Schema for cart
const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
});
const Cart = mongoose.model('Cart', CartSchema);

// Schema for orderHistory
const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
    purchaseDate: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', OrderSchema);

module.exports = {
    Product,
    User,
    Comment,
    Cart,
    Order
};
