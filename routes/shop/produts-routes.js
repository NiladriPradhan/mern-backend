import express from "express";
import { getFilterProducts, getProductDetails,  } from "../../controllers/shop/product-controllers.js";

const router = express.Router();

router.get("/get", getFilterProducts)
router.get("/get/:id", getProductDetails)

export default router;
