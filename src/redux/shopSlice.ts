import type { FilterParams, ProductDetailsResponse, ProductListResponse, ShopSlice } from "@/types/shop-slice-type";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
// ---------- Async Thunks ----------

// ✅ Fetch all filtered products
export const fetchAllFilteredProducts = createAsyncThunk<
  ProductListResponse, // return type
  { filterParams: FilterParams; sortParams: string }, // argument type
  { rejectValue: string } // reject type
>("/products/fetchFilteredProducts", async ({ filterParams, sortParams }, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams({
      ...Object.fromEntries(
        Object.entries(filterParams || {}).map(([key, value]) => [
          key,
          Array.isArray(value) ? value.join(",") : value,
        ])
      ),
      sortBy: sortParams,
    }).toString();

    const { data } = await axios.get<ProductListResponse>(
      `http://localhost:4000/api/shop/products/get?${query}`
    );

    console.log("🛍️ API Response:", data);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Error fetching products");
  }
});

// ✅ Fetch single product details
export const fetchProductDetails = createAsyncThunk<
  ProductDetailsResponse,
  string,
  { rejectValue: string }
>("/products/fetchProductDetails", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<ProductDetailsResponse>(
      `http://localhost:4000/api/shop/products/get/${id}`
    );
    console.log("📦 Product Details Response:", data);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Error fetching product details");
  }
});

// ---------- Initial State ----------
const initialState: ShopSlice = {
  isProductListLoading: false,
  isProductDetailsLoading: false,
  shopProductList: [],
  productDetails: null,
};

// ---------- Slice ----------
const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🧾 Product list fetching
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isProductListLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action: PayloadAction<ProductListResponse>) => {
        state.isProductListLoading = false;
        state.shopProductList = action.payload;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isProductListLoading = false;
        state.shopProductList = [];
      })

      // 📦 Product details fetching
      .addCase(fetchProductDetails.pending, (state) => {
        state.isProductDetailsLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action: PayloadAction<ProductDetailsResponse>) => {
        state.isProductDetailsLoading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isProductDetailsLoading = false;
        state.productDetails = null;
      });
  },
});

export const { clearProductDetails } = shopSlice.actions;
export default shopSlice.reducer;
