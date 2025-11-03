// controllers/shopController.js
import Product from "../models/Product.js";

// export const getAllProducts = async (req, res) => {
//   try {
//     const { brand, category, sortBy } = req.query;

//     // Convert "nike,adidas" → ["nike", "adidas"]
//     const filter = {};

//     if (brand) {
//       const brandArray = brand.split(",").map(b => b.trim().toLowerCase());
//       filter.brand = { $in: brandArray };
//     }

//     if (category) {
//       const categoryArray = category.split(",").map(c => c.trim().toLowerCase());
//       filter.category = { $in: categoryArray };
//     }

//     // Sorting logic
//     let sortOption = {};
//     if (sortBy === "price-lowtohigh") sortOption.price = 1;
//     else if (sortBy === "price-hightolow") sortOption.price = -1;
//     else sortOption.createdAt = -1;

//     const products = await Product.find(filter).sort(sortOption);

//     res.status(200).json({ data: products });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };


export const getAllProducts = async (req, res) => {
  try {
    const { brand, category, sortBy } = req.query;
    const filter = {};

    // ✅ Brand filter (case-insensitive)
    if (brand) {
      const brandArray = brand.split(",").map(b => b.trim());
      filter.brand = { 
        $in: brandArray.map(b => new RegExp(`^${b}$`, "i")) 
      };
    }

    // ✅ Category filter (case-insensitive)
    if (category) {
      const categoryArray = category.split(",").map(c => c.trim());
      filter.category = { 
        $in: categoryArray.map(c => new RegExp(`^${c}$`, "i")) 
      };
    }

    // ✅ Sorting
    let sortOption = {};
    if (sortBy === "price-lowtohigh") sortOption.price = 1;
    else if (sortBy === "price-hightolow") sortOption.price = -1;
    else sortOption.createdAt = -1;

    const products = await Product.find(filter).sort(sortOption);

    res.status(200).json({ data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
