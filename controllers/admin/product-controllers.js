import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/Products.js";

export const handleImageUpload = async (req, res) => {
    try {
        // Convert uploaded file to base64
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;

        // Upload to Cloudinary (or your helper)
        const result = await imageUploadUtil(url);

        res.status(200).json({
            success: true,
            result,
        });
    } catch (error) {
        console.error("Image upload error:", error);
        res.status(500).json({
            success: false,
            message: "Error occurred while uploading image",
        });
    }
};


// add a new product
export const addProduct = async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            saleprice,
            totalstock,
        } = req.body;

        const imageUrl = req.file?.path; // from Cloudinary

        const product = await Product.create({
            image,
            title,
            description,
            category,
            brand,
            price,
            saleprice,
            totalstock,
        });

        product.save();
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add product"
        })
    }
}
// fetch all product
export const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products,
            message:
                "product fetching successfully!"

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add product"
        })
    }
}
// update a new product
export const editProduct = async (req, res) => {
    const { id } = req.params;
    const {
        image,
        title,
        description,
        category,
        brand,
        price,
        saleprice,
        totalstock,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
    // ✅ Update only if provided
    if (image) product.image = image === "" ? product.image : image;
    if (title) product.title = title === "" ? product.title : title;
    if (description) product.description = description === "" ? product.description : description;
    if (category) product.category = category === "" ? product.category : category;
    if (brand) product.brand = brand === "" ? product.brand : brand;
    if (price) product.price = price === "" ? product.price : price;
    if (saleprice) product.saleprice = saleprice === "" ? product.saleprice : saleprice;
    if (totalstock) product.totalstock = totalstock === "" ? product.totalstock : totalstock;
    await product.save();

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product
    })
}
// delete a new product

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const findProduct = await Product.findByIdAndDelete(id);
    if (!findProduct) {
        return res.status(404).json({
            success: false,
            message: "product not found"
        })
    }
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
}