const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.addProduct);
router.put('/:_id', productController.updateProduct);
router.delete('/:_id', productController.deleteProduct);
router.get('/:_id', productController.getProduct);
router.get('/', productController.getAllProducts);

module.exports = router;
