const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

mongoose.plugin(autopopulate);

const InventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

InventorySchema.virtual('productName', {
    ref: 'Product',
    localField: 'product',
    foreignField: '_id',
    justOne: true,
});

InventorySchema.virtual('vendorName', {
    ref: 'Vendor',
    localField: 'vendor',
    foreignField: '_id',
    justOne: true,
});

module.exports = mongoose.model('Inventory', InventorySchema);
