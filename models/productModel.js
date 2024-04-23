
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
    },
    vendorName: {
        type: String,
        required: [true, "Please enter vendor name"],
    }
});

module.exports = mongoose.model('Product', ProductSchema);
