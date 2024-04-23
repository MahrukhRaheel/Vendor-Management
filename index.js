const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const app = express()
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 3000;

// Routes
const vendorRoutes = require('./routes/vendorRoutes');
const productRoutes = require('./routes/productRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

app.use('/vendors', vendorRoutes);
app.use('/products', productRoutes);
app.use('/inventory', inventoryRoutes);

app.get('/', (req, res) => {
    res.send("Vendor Management System ()...");
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
    });
    console.log("Connected to MongoDB!");
})
.catch((error) => {
    console.error("Connection to MongoDB failed:", error);
});

