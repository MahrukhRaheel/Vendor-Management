// vendorModel.js

const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Vendor name"],
    }
});

module.exports = mongoose.model('Vendor', VendorSchema);
