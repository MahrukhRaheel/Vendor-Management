const Product = require('../models/productModel');
const Vendor = require('../models/vendorModel');

const productController = {
    // Add a new product
    addProduct: async (req, res) => {
        try {
            const { name, vendor } = req.body; 
            const vendorDoc = await Vendor.findOne({ name: vendor });

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
    },
 // Get a specific product
 getProduct: async (req, res) => {
    try {
        const product = await Product.findById(req.params._id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
},

    // Update a product
    updateProduct: async (req, res) => { 
        try {
            const productId = req.params._id; 
            const { name, vendor } = req.body;

            const product = await Product.findById(productId);

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
    },

    // Delete a Product
    deleteProduct: async (req, res) => { 
        try {
            const productId = req.params._id; 
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            await product.deleteOne();
            res.json({ message: 'Product deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get all products
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().populate('vendorName'); 
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = productController;
