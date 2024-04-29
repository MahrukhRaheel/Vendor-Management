const Vendor = require('../models/vendorModel');

const vendorController = {
    // Add a new vendor
    addVendor: async (req, res) => {
        try {
            const vendor = new Vendor(req.body);
            await vendor.save();
            res.status(201).json(vendor);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Delete a vendor
    deleteVendor: async (req, res) => {
        try {
            const vendor = await Vendor.findById(req.params._id);
            if (!vendor) {
                return res.status(404).json({ message: 'Vendor not found' });
            }
            await Vendor.deleteOne({ _id: req.params._id });
            res.json({ message: 'Vendor deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get a specific vendor
    getVendor: async (req, res) => {
        try {
            const vendor = await Vendor.findById(req.params._id);
            if (!vendor) {
                return res.status(404).json({ message: 'Vendor not found' });
            }
            res.json(vendor);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Update a vendor
    updateVendor: async (req, res) => {
        try {
            const vendor = await Vendor.findById(req.params._id);
            if (!vendor) {
                return res.status(404).json({ message: 'Vendor not found' });
            }
            Object.assign(vendor, req.body);
            await vendor.save();
            res.json(vendor);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get all vendors
    getAllVendors: async (req, res) => {
        try {
            const vendors = await Vendor.find();
            res.json(vendors);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = vendorController;
