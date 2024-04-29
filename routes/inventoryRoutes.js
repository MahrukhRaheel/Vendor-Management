const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/', inventoryController.addInventoryItem);
router.delete('/:_id', inventoryController.deleteInventoryItem);
router.put('/:_id', inventoryController.updateInventoryItem);
router.get('/:_id', inventoryController.getInventoryItem);
router.get('/products/:productName', inventoryController.getProductByName);

router.get('/', inventoryController.getAllInventoryItems);

module.exports = router;
