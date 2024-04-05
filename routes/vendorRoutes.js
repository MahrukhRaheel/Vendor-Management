// vendorRoutes.js

const express = require('express');
const router = express.Router();
const Vendor = require('../models/vendorModel');

// Add a new vendor
router.post('/', async (req, res) => {
    try {
        const vendor = new Vendor(req.body);
        await vendor.save();
        res.status(201).json(vendor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a vendor
router.delete('/:id', async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        await Vendor.deleteOne({ _id: req.params.id });
        res.json({ message: 'Vendor deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a vendor
router.put('/:id', async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        Object.assign(vendor, req.body);
        await vendor.save();
        res.json(vendor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Get all vendors
router.get('/', async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.json(vendors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
