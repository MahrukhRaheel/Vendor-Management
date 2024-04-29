const Product = require('../models/productModel');
const Vendor = require('../models/vendorModel');
const Inventory = require('../models/inventoryModel');

const inventoryController = {
    // Add a new inventory item
    addInventoryItem: async (req, res) => {
        try {
            const { productName, vendorName, quantity } = req.body;

            const product = await Product.findOne({ name: productName }).exec();
            const vendor = await Vendor.findOne({ name: vendorName }).exec();

            if (!product || !vendor) {
                return res.status(404).json({ message: 'Product or Vendor not found' });
            }

            const inventory = new Inventory({ product: product._id, vendor: vendor._id, quantity });
            await inventory.save();

            const populatedInventory = await Inventory.findById(inventory._id)
                .populate('product')
                .populate('vendor')
                .exec();

            res.status(201).json({
                _id: populatedInventory._id,
                product: populatedInventory.product.name,
                vendor: populatedInventory.vendor.name,
                quantity: populatedInventory.quantity,
            });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Get a specific item
 getInventoryItem: async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params._id);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory not found' });
        }
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
},

getProductByName: async (req, res) => {
    try {
        const productName = req.params.productName;

        const product = await Product.findOne({ name: { $regex: new RegExp(productName, 'i') } }).exec();
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
},


    // Delete an inventory item
    deleteInventoryItem: async (req, res) => { 
        try {
            const inventoryItem = await Inventory.findById(req.params._id);
            if (!inventoryItem) {
                return res.status(404).json({ message: 'Inventory item not found' });
            }
            await Inventory.deleteOne({ _id: req.params._id });
            res.json({ message: 'Inventory item deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Update an inventory item
    updateInventoryItem: async (req, res) => { 
        try {
            const inventoryId = req.params._id;
            const { productName, vendorName, quantity } = req.body;

            const product = await Product.findOne({ name: productName }).exec();
            const vendor = await Vendor.findOne({ name: vendorName }).exec();

            if (!product || !vendor) {
                return res.status(404).json({ message: 'Product or Vendor not found' });
            }

            const updatedInventory = await Inventory.findByIdAndUpdate(inventoryId, {
                product: product._id,
                vendor: vendor._id,
                quantity
            }, { new: true });

            if (!updatedInventory) {
                return res.status(404).json({ message: 'Inventory item not found' });
            }

            const populatedInventory = await Inventory.findById(inventoryId)
                .populate('product', 'name')
                .populate('vendor', 'name')
                .exec();

            const modifiedInventoryItem = {
                _id: populatedInventory._id,
                product: populatedInventory.product ? populatedInventory.product.name : 'Unknown Product',
                vendor: populatedInventory.vendor ? populatedInventory.vendor.name : 'Unknown Vendor',
                quantity: populatedInventory.quantity,
                __v: populatedInventory.__v
            };

            res.json(modifiedInventoryItem);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get all inventory items
    getAllInventoryItems: async (req, res) => {
        try {
            const inventoryItems = await Inventory.find()
                .populate('product', 'name')
                .populate('vendor', 'name')
                .exec();

            const modifiedInventoryItems = inventoryItems.map(item => {
                const product = item.product ? item.product.name : 'Unknown Product';
                const vendor = item.vendor ? item.vendor.name : 'Unknown Vendor';

                return {
                    _id: item._id,
                    product,
                    vendor,
                    quantity: item.quantity,
                    __v: item.__v
                };
            });

            res.json(modifiedInventoryItems);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = inventoryController;
