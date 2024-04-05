const express = require('express')
const mongoose = require('mongoose');
const app = express()

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
    res.send("Vendor Management System ...");
});

mongoose.connect("mongodb+srv://mahrukhraheel18:9VIuRkNeGNLHD4hj@backenddb.vhmuyr6.mongodb.net/Vendor-Management?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    console.log("Connected to MongoDB!");
})
.catch((error) => {
    console.error("Connection to MongoDB failed:", error);
});

