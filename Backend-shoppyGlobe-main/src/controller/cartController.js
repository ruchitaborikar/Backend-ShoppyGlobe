import Cart from "../models/Cart.js";

// Add product to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.create({ userId: req.user.id, products: [{ productId, quantity }] });
  res.json(cart);
};

// Update cart product quantity
export const updateCart = async (req, res) => {
  const { quantity } = req.body;
  await Cart.findByIdAndUpdate(req.params.id, { quantity });
  res.json({ message: "Cart updated" });
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed from cart" });
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
