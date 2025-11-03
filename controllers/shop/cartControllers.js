// controllers/cartController.js
import Cart from "../../models/Cart.js";
import Product from "../../models/Products.js";

// 🛒 Add product to cart
// 🛒 Add product to cart
export const addToCart = async (req, res) => {
  try {
    let { userId, productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    // If no user logged in, assign guest
    if (!userId) userId = "guest";

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Add or update product quantity
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      data: cart,
    });
  } catch (error) {
    console.log("❌ ADD TO CART ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error in addToCart",
      error: error.message,
    });
  }
};


// 🛍️ Fetch all cart items for a user
export const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    // 🧠 Try to find the cart
    let cart = await Cart.findOne({ userId }).populate("items.productId");

    // 🆕 If no cart exists, create one for the guest or user
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("❌ fetchCartItems Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};


// 🔄 Update cart item quantity
export const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Product not in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in updateCartItemQty",
      error: error.message,
    });
  }
};

// ❌ Delete cart item
export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleteCartItem",
      error: error.message,
    });
  }
};
