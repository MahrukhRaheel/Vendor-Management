const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.post('/', vendorController.addVendor);
router.delete('/:_id', vendorController.deleteVendor);
router.get('/:_id', vendorController.getVendor);
router.put('/:_id', vendorController.updateVendor);
router.get('/', vendorController.getAllVendors);

module.exports = router;
