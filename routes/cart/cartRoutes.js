import express from "express";
import { addToCart, deleteCartItem, fetchCartItems, updateCartItemQty } from "../../controllers/shop/cartControllers.js";


const router = express.Router();

router.post("/add", addToCart);
router.get("/:userId", fetchCartItems);
router.put("/update", updateCartItemQty);
router.delete("/remove", deleteCartItem);

export default router;
