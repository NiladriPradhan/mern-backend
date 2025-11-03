// src/types/shop-slice-type.ts

// 👕 Single Product Type
export interface Product {
  data: Product;
  _id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  saleprice: number;
  totalstock: number;
}

// 🧾 Product List Response (array of products)
export type ProductListResponse = Product[];

// 📦 Product Details Response (single product)
export type ProductDetailsResponse = Product;

// 🧮 Filter Params for querying products
export interface FilterParams {
  category?: string[];
  brand?: string[];
  minPrice?: string;
  maxPrice?: string;
  search?: string;
}

// 🏪 Shop Slice State
export interface ShopSlice {
  isProductListLoading: boolean;
  isProductDetailsLoading: boolean;
  shopProductList: ProductListResponse;
  productDetails: ProductDetailsResponse | null;
}
