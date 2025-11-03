// import type { CheckAuthProps } from "@/types/check-auth-type";
// import type React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const CheckAuth:React.FC<CheckAuthProps> = ({ isAuthenticated, user, children }) => {
//   const location = useLocation();
//   if (
//     !isAuthenticated &&
//     !(
//       location.pathname.includes("/admin/register") ||
//       location.pathname.includes("/admin/login")
//     )
//   ) {
//     return <Navigate to="/auth/login" replace />;
//   }
//   if (
//     isAuthenticated &&
//     (location.pathname.includes("/admin/register") ||
//       location.pathname.includes("/admin/login"))
//   ) {
//     if (user?.role === "admin") {
//       return <Navigate to="/admin/dashboard" replace />;
//     } else {
//       return <Navigate to="/shop/home" replace />;
//     }
//   }
//   if (
//     isAuthenticated &&
//     user?.role !== "admin" &&
//     location.pathname.includes("admin")
//   ){
//     return <Navigate to="/unauth-page" replace />
//   }
// if(isAuthenticated &&
//     user?.role === "admin" &&
//     location.pathname.includes("shop")
// )

//     return <div>
//         {children}
//     </div>;
// };

// export default CheckAuth;

// import type { CheckAuthProps } from "@/types/check-auth-type";

import { Navigate, useLocation } from "react-router-dom";

interface User {
  role: "user" | "admin";
}

export interface CheckAuthProps {
  isAuthenticated: boolean;
  user: User | null;
  children: React.ReactNode;
}

const CheckAuth: React.FC<CheckAuthProps> = ({
  isAuthenticated,
  user,
  children,
}) => {
  const location = useLocation();

  console.log(location.pathname);

  // 1️⃣ Not authenticated → redirect to login (unless already on /auth)
  if (!isAuthenticated && !location.pathname.startsWith("/auth")) {
    return <Navigate to="/auth/login" replace />;
  }

  // 2️⃣ Authenticated users visiting login/register → redirect by role
  if (isAuthenticated && location.pathname.startsWith("/auth")) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/shop/home" replace />;
    }
  }

  // 3️⃣ Authenticated user (non-admin) trying to access admin route
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/unauth-page" replace />;
  }

  // 4️⃣ Authenticated admin trying to access shop route
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.startsWith("/shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // ✅ Otherwise, render the child route
  return <>{children}</>;
};

export default CheckAuth;
