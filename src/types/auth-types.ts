export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthState {
  user: AuthUser | { user: AuthUser } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
