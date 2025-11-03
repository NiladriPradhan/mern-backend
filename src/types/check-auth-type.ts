interface User {
  role: "admin" | "user";
}

export interface CheckAuthProps {
  isAuthenticated: boolean;
  user: User | null;
  children: React.ReactNode;
}
