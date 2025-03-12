import express from "express";
import { addToCart, updateCart, removeFromCart, getCart } from "../controller/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);  // Fetch cart
router.post("/", authMiddleware, addToCart);  // Add to cart
router.put("/:id", authMiddleware, updateCart);  // Update cart
router.delete("/:id", authMiddleware, removeFromCart);  // Remove from cart

export default router;
