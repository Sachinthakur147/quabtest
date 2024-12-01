// routes/cartRoutes.js
const express = require("express");
const Cart = require("../models/Cart");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

// Get cart
router.get("/", authenticate, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate(
    "items.productId"
  );
  console.log(cart, "cartwe");
  res.status(200).json(cart || { items: [] });
});

// Add to cart
router.post("/", authenticate, async (req, res) => {
  const { productId, quantity } = req.body;
  console.log(12, productId, quantity);
  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({ userId: req.user.id, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
  if (itemIndex > -1) {
    console.log(itemIndex, "dfgh");
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
    console.log(22, cart.items);
  }

  await cart.save();
  res.status(200).json(cart);
});

// Remove from cart
router.delete("/:id", authenticate, async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== req.params.id
  );
  await cart.save();
  res.status(200).json(cart);
});

module.exports = router;
