const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Importing routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Connecting to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://deepindersingh4359:SUpcjDgYFeizlySq@cluster0.gdiwsur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB is connected');
    } catch (error) {
        console.error('MongoDB connection has been failed:', error);
        process.exit(1);
    }
};

connectDB();

// Middleware parser
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// All routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
