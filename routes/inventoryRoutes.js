// inventoryRoutes.js

const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventoryModel');

// Add a new inventory item
router.post('/', async (req, res) => {
    try {
        const inventory = new Inventory(req.body);
        await inventory.save();
        res.status(201).json(inventory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an inventory item
router.delete('/:id', async (req, res) => {
    try {
        const inventoryItem = await Inventory.findById(req.params.id);
        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        await Inventory.deleteOne({ _id: req.params.id });
        res.json({ message: 'Inventory item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an inventory item
router.put('/:id', async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }
        Object.assign(inventory, req.body);
        await inventory.save();
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Get all inventory items
router.get('/', async (req, res) => {
    try {
        const inventoryItems = await Inventory.find();
        res.json(inventoryItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
