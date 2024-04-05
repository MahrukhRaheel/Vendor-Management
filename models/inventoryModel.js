// inventoryModel.js

const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

mongoose.plugin(autopopulate);

const InventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

// Populate the product field with data from the referenced Product document
InventorySchema.virtual('productName', {
    ref: 'Product',
    localField: 'product',
    foreignField: '_id',
    justOne: true,
    autopopulate: true
});

module.exports = mongoose.model('Inventory', InventorySchema);