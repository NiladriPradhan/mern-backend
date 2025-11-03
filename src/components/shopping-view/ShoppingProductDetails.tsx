import  { useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ import this
import { clearProductDetails, fetchProductDetails } from "@/redux/shopSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const ShoppingProductDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { productDetails, isProductDetailsLoading } = useAppSelector((state) => state.shop);

  useEffect(() => {
    dispatch(clearProductDetails());
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  if (isProductDetailsLoading) return <p className="p-4">Loading product...</p>;
  if (!productDetails)
    return <p className="p-4 text-gray-500">No product found.</p>;

  const product = productDetails?.data || productDetails;
  console.log(product);

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto rounded-lg shadow"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-sm text-gray-500 mb-1">Brand: {product.brand}</p>
          <p className="text-sm text-gray-500 mb-4">
            Category: {product.category}
          </p>

          <div className="flex items-center gap-4 mb-4">
            <p className="text-xl font-bold text-green-600">
              ₹{product.saleprice}
            </p>
            {product.saleprice < product.price && (
              <p className="text-gray-500 line-through">₹{product.price}</p>
            )}
          </div>

          {/* <p className="text-sm text-gray-700 mb-2">
            Stock: {product.totalstock}
          </p> */}

          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingProductDetails;
