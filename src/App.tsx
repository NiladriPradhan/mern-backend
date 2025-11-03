import { Route, Routes } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import AuthLayout from "./components/ui/auth/AuthLayout";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./pages/admin-view/Dashboard";
import AdminFeatures from "./pages/admin-view/Features";
import AdminOrders from "./pages/admin-view/Orders";
import AdminProducts from "./pages/admin-view/Products";
import NotFound from "./pages/note-found/NotFound";
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/ShoppingHome";
import ShoppingListing from "./pages/shopping-view/ShoppingListing";
import ShoppingCheckout from "./pages/shopping-view/ShoppingCheckout";
import ShoppingAccount from "./pages/shopping-view/ShoppingAccount";
import CheckAuth from "./components/common/check-auth";
import HomePage from "./pages/home/HomePage";
import { useEffect } from "react";
import { checkAuth } from "./redux/authSlice";
import CartPage from "./pages/cart/CartPage";
import ShoppingProductDetails from "./components/shopping-view/ShoppingProductDetails";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

const App = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );

  console.log(isLoading, user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="h-[600px] w-[600px]" />;

  return (
    <Routes>
      {/* public routing*/}
      <Route path="/" element={<HomePage />} />
      {/* auth routing*/}
      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* admin routing*/}
      <Route
        path="/admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }
      >
        {/* <Route path="" element={<AdminDashboard />} /> */}
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="features" element={<AdminFeatures />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
      </Route>

      <Route
        path="/shop"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }
      >
        <Route path="home" element={<ShoppingHome />} />
        <Route path="listing" element={<ShoppingListing />} />
        <Route path="details/:id" element={<ShoppingProductDetails />} />
        <Route path="checkout" element={<ShoppingCheckout />} />
        <Route path="account" element={<ShoppingAccount />} />
        <Route path="cart" element={<CartPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
