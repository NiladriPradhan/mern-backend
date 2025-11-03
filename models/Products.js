import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    saleprice: Number,
    totalstock: Number
})

const Product = mongoose.model("Product", ProductSchema);
export default Product;