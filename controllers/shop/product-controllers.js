import Product from "../../models/Products.js";

// export const getFilterProducts = async (req, res) => {
//     try {

//         const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
//         let filters = {};

//         if (category.length) {
//             filters.category = { $in: category.split(',') }
//         }

//         if (brand.length) {
//             filters.brand = { $in: brand.split(",") };
//         }


//         let sort = {};
//         switch (sortBy) {
//             case 'price-lowtohigh':
//                 sort.price = 1;
//                 break;
//             case 'price-hightolow':
//                 sort.price = -1;
//                 break;
//             case 'title-atoz':
//                 sort.title = 1;
//                 break;
//             case 'title-ztoa':
//                 sort.title = -1;
//                 break;

//             default:
//                 sort.price = 1;
//                 break;
//         }

//         const products = await Product.find(filters).sort(sort);

//         res.status(200).json({
//             success: true,
//             data: products
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(50).json({
//             success: false,
//             message: "Some error occured"
//         })

//     }
// }


export const getFilterProducts = async (req, res) => {
  try {
    const { category, brand, sortBy = "price-lowtohigh" } = req.query;
    let filters = {};

    // ✅ Category filter (case-insensitive)
    if (category) {
      const categoryArray = category.split(",").map((c) => c.trim());
      filters.category = {
        $in: categoryArray.map((c) => new RegExp(`^${c}$`, "i")),
      };
    }

    // ✅ Brand filter (case-insensitive)
    if (brand) {
      const brandArray = brand.split(",").map((b) => b.trim());
      filters.brand = {
        $in: brandArray.map((b) => new RegExp(`^${b}$`, "i")),
      };
    }

    // ✅ Sorting
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    // ✅ Fetch products
    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("❌ Error in getFilterProducts:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
};


export const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            res.status(400).json({
                success: false,
                message: "product not found"
            })
        }
        res.status(200).json({
            success: true,
            data: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error in getting product details"
        })
    }
}