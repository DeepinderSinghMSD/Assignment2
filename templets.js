const mongoose = require('mongoose');

// Schema for product 
const ProductSchema = new mongoose.Schema({
    description: { type: String, required: true, minlength: 5, maxlength: 1000 },
    image: { type: String, required: true },
    pricing: { type: Number, required: true, min: 0 },
    shippingCost: { type: Number, required: true, min: 0 },
    rating: { type: Number, required: true, min: 0, max: 5 },
});
const Product = mongoose.model('Product', ProductSchema);

// Schema for user
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true, minlength: 6 },
    username: { type: String, required: true, minlength: 3 },
    purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    shippingAddress: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

// Schema for comment
const CommentSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    images: { type: [String], validate: v => Array.isArray(v) && v.length > 0 },
    text: { type: String, required: true, minlength: 5 },
});
const Comment = mongoose.model('Comment', CommentSchema);

// Schema for cart
const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
});
const Cart = mongoose.model('Cart', CartSchema);

// Schema for orderHistory
const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
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
