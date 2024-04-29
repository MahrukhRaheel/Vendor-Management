const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import routes
const vendorRoutes = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

// Routes middleware
app.use('/vendors', vendorRoutes);
app.use('/products', productRoutes);
app.use('/inventory', inventoryRoutes);

// Default route
app.get('/', (req, res) => {
    res.send("Vendor Management System ()...");
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        console.log("Connected to MongoDB!");
    })
    .catch((error) => {
        console.error("Connection to MongoDB failed:", error);
    });
