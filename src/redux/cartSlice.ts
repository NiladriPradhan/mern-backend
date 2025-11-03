import { createSlice, createAsyncThunk,type PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// ---------- Interfaces ----------
export interface CartItem {
  _id: string;
  productId: string;
  title?: string;
  image?: string;
  price: number;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  totalAmount?: number;
}

export interface CartState {
  cartItems: CartItem[];
  isLoading: boolean;
  error?: string | null;
}

// ---------- Initial State ----------
const initialState: CartState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

// ---------- Thunks ----------
export const fetchCartItems = createAsyncThunk<
  CartResponse, // ✅ Return type
  string,       // ✅ Argument type (userId)
  { rejectValue: string } // ✅ Rejection type
>(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<{ data: CartResponse }>(
        `http://localhost:4000/api/shop/cart/${userId}`
      );
      return data.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Error fetching cart");
    }
  }
);

export const addToCart = createAsyncThunk<
  CartResponse,
  { userId: string; productId: string; quantity: number }
>(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { dispatch }) => {
    const { data } = await axios.post<{ data: CartResponse }>(
      `http://localhost:4000/api/shop/cart/add`,
      { userId, productId, quantity }
    );
    dispatch(fetchCartItems(userId)); // refresh cart
    return data.data;
  }
);

export const updateCartItemQty = createAsyncThunk<
  CartResponse,
  { userId: string; productId: string; quantity: number }
>(
  "cart/updateCartItemQty",
  async ({ userId, productId, quantity }, { dispatch }) => {
    const { data } = await axios.put<{ data: CartResponse }>(
      `http://localhost:4000/api/shop/cart/update`,
      { userId, productId, quantity }
    );
    dispatch(fetchCartItems(userId));
    return data.data;
  }
);

export const deleteCartItem = createAsyncThunk<
  CartResponse,
  { userId: string; productId: string }
>(
  "cart/deleteCartItem",
  async ({ userId, productId }, { dispatch }) => {
    const { data } = await axios.delete<{ data: CartResponse }>(
      `http://localhost:4000/api/shop/cart/remove`,
      { data: { userId, productId } }
    );
    dispatch(fetchCartItems(userId));
    return data.data;
  }
);

// ---------- Slice ----------
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.isLoading = false;
        state.cartItems = action.payload.items || [];
      })
      .addCase(fetchCartItems.rejected, (state) => {

        state.isLoading = false;
        state.cartItems = [];
        // state.error = action.payload || "Failed to fetch cart";
      });
  },
});

export default cartSlice.reducer;
