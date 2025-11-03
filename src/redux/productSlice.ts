import type { Product } from "@/types/cart-types";
import type { ProductResponse, ProductSlice } from "@/types/product-slice-type";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// ---------- Initial State ----------
const initialState: ProductSlice = {
  isLoading: false,
  productList: [],
};

// ---------- Thunks ----------

// ✅ Add new product
export const addNewProduct = createAsyncThunk<
  // return type
  Product, // argument type
  { rejectValue: string } // reject type
>("/products/addNewProduct", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<Product>(
      "http://localhost:4000/api/admin/products/add",
      formData,
      { headers: { "Content-Type": "application/json" } }
    );
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to add product");
  }
});

// ✅ Fetch all products
export const fetchAllProducts = createAsyncThunk<
  Product[], // return type
  void, // argument type
  { rejectValue: string }
>("/products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<{ success: boolean; products: Product[] }>(
      "http://localhost:4000/api/admin/products/get"
    );
    return data.products;
  } catch {
    return rejectWithValue("Failed to fetch products");
  }
});

// ✅ Edit product
export const editProduct = createAsyncThunk<
  ProductResponse,
  { id: string; formData: Partial<Product> },
  { rejectValue: string }
>("/products/editProduct", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put<ProductResponse>(
      `http://localhost:4000/api/admin/products/edit/${id}`,
      formData
    );
    return data;
  } catch {
    return rejectWithValue("Failed to update product");
  }
});

// ✅ Delete product
export const deleteProduct = createAsyncThunk<
  ProductResponse,
  string,
  { rejectValue: string }
>("/products/deleteProduct", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete<ProductResponse>(
      `http://localhost:4000/api/admin/products/delete/${id}`
    );
    return data;
  } catch {
    return rejectWithValue("Failed to delete product");
  }
});

// ---------- Slice ----------
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.productList = action.payload.map(product => ({
          ...product,
          description: product.description ?? "",
          category: product.category ?? "",
          brand: product.brand ?? "",
          saleprice: product.saleprice ?? 0,
          totalstock: product.totalstock ?? 0
        }));
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default productSlice.reducer;
