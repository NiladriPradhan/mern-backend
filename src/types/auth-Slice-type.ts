export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user"; // ✅ make it required + specific
}


export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User | null;
}

export interface AuthSlice {
  isLoading: boolean;
  user: User | null;
  isAuthenticated: boolean;
}
