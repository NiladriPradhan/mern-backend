import express from "express";
import { addProduct, deleteProduct, editProduct, fetchAllProducts, handleImageUpload } from "../../controllers/admin/product-controllers.js";
import { upload } from "../../helpers/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single("image"), handleImageUpload);

// ✅ Add a new product
router.post("/add", upload.single("image"), addProduct);
router.get("/get", fetchAllProducts)
router.delete("/delete/:id", deleteProduct)
router.put("/edit/:id", editProduct)

export default router;
