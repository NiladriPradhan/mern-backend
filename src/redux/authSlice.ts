import type { AuthResponse, AuthSlice } from "@/types/auth-Slice-type";
import { createAsyncThunk, createSlice,type PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

// ---------- Async Thunks ----------

// ✅ Register User
export const registerUser = createAsyncThunk<
  AuthResponse, // return type
  { name: string; email: string; password: string }, // argument type
  { rejectValue: string } // rejection type
>("/auth/register", async (formData, { rejectWithValue }) => {
  try {
    const res = await axios.post<AuthResponse>(
      "http://localhost:4000/api/auth/register",
      formData,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

// ✅ Login User
export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>("/auth/login", async (formData, { rejectWithValue }) => {
  try {
    const res = await axios.post<AuthResponse>(
      "http://localhost:4000/api/auth/login",
      formData,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// ✅ Logout User
export const logoutUser = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: string }
>("/auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.post<AuthResponse>(
      "http://localhost:4000/api/auth/logout",
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Logout failed");
  }
});

// ✅ Check Auth
export const checkAuth = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: string }
>("/auth/checkAuth", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get<AuthResponse>("http://localhost:4000/api/auth/verify", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return rejectWithValue("Session expired, please login again");
  }
});

// ---------- Initial State ----------
const initialState: AuthSlice = {
  isLoading: true,
  user: null,
  isAuthenticated: false,
};

// ---------- Slice ----------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: () => {},
    login: () => {},
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = !!action.payload.success;
        toast.success(action.payload.message);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        toast.error(action.payload ?? "Registration failed");
      })

      // 🔹 Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        const { success, user, message } = action.payload;
        state.isAuthenticated = !!success;
        state.user = success ? user ?? null : null;
        state.isLoading = false;
        toast[success ? "success" : "error"](message);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        toast.error(action.payload ?? "Login failed");
      })

      // 🔹 Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      // 🔹 Logout
      .addCase(logoutUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isAuthenticated = false;
        state.user = null;
        toast.success(action.payload.message);
      })
      .addCase(logoutUser.rejected, (_, action) => {
        toast.error(action.payload ?? "Logout failed");
      });
  },
});

export const { register, login } = authSlice.actions;
export default authSlice.reducer;
