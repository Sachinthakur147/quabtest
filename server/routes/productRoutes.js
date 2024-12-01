
const express = require('express');
const Product = require('../models/Product');
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');
const router = express.Router();


router.get('/', async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// Get a specific product
router.get('/:_id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(product);
});


router.post('/', authenticate, authorizeRole('admin'), async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});


router.put('/:_id', authenticate, authorizeRole('admin'), async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(product);
});


router.delete('/:_id', authenticate, authorizeRole('admin'), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Product deleted' });
});

module.exports = router;
