// src/types/product-slice-type.ts

export interface Product {
  _id?: string;
  image: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  saleprice?: number;
  totalstock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  products?: Product[];
  product?: Product;
}

export interface ProductSlice {
  isLoading: boolean;
  productList: Product[];
}
