const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const Vendor = require('../models/vendorModel');

// Add a new product
router.post('/', async (req, res) => {
    try {
        const { name, vendor } = req.body; 
        
        console.log('Received request to add product:', { name, vendor });

        const vendorDoc = await Vendor.findOne({ name: vendor });
        console.log('Found vendor:', vendorDoc);

        if (!vendorDoc) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        
        const product = new Product({ name, vendorName: vendor }); 
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(400).json({ message: err.message });
    }
});

// Update a product
router.put('/:_id', async (req, res) => { 
    try {
        const productId = req.params._id; 
        const { name, vendor } = req.body;
        
        console.log('Received request to update product:', { productId, name, vendor });

        const product = await Product.findById(productId);
        console.log('Found product:', product);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }    
        product.name = name;
        product.vendorName = vendor;
        await product.save();
        res.json(product);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ message: err.message });
    }
});

//Delete a Product
router.delete('/:_id', async (req, res) => { 
    try {
        const productId = req.params._id; 
        console.log('Received request to delete a product:', productId );

        const product = await Product.findById(productId);
        console.log('Found product:', product);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.deleteOne();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('vendorName'); 
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
