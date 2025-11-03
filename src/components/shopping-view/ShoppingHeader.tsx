import { House, LogOut, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { logoutUser } from "@/redux/authSlice";
import { fetchCartItems } from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// ---------- Types ----------
interface RouteItem {
  name: string;
  link: string;
}

interface User {
  _id?: string;
  userName?: string;
  user?: {
    _id?: string;
    userName?: string;
  };
}

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  price: number;
}

interface CartState {
  items?: CartItem[];
  [key: string]: any;
}

// ---------- Component ----------
const routes: RouteItem[] = [];

const ShoppingHeader: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { cartItems } = useAppSelector((state) => state.cart);

  const [cartCount, setCartCount] = useState<number>(0);

  // 🛒 Fetch cart items when user logs in
  useEffect(() => {
    const userId: string =
      (user as string | any)?._id ||
      (user as string | any)?.user?._id ||
      "guest";
    dispatch(fetchCartItems(userId));
  }, [dispatch, user]);

  // 🔢 Update cart count
  useEffect(() => {
    if (Array.isArray(cartItems)) {
      setCartCount(cartItems.length);
    } else if ((cartItems as CartState)?.items) {
      setCartCount((cartItems as CartState).items!.length);
    } else {
      setCartCount(0);
    }
  }, [cartItems]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/shop/home");
  };

  return (
    <div className="fixed top-0 left-0 right-0 p-4 bg-white shadow-md z-10">
      <div className="flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center gap-x-4">
          <Link to="/shop/home">
            <House className="cursor-pointer" />
          </Link>
          <h1
            className="font-semibold text-xl cursor-pointer"
            onClick={() => navigate("/shop/home")}
          >
            E-Commerce
          </h1>
        </div>

        {/* Center - Routes */}
        <div className="hidden md:block font-semibold">
          <ul className="flex gap-x-4">
            {routes.map((elem) => (
              <li
                key={elem.name}
                className="cursor-pointer hover:text-primary"
                onClick={() => navigate(elem.link)}
              >
                {elem.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Cart + User */}
        <div className="flex items-center gap-x-6">
          {/* Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/shop/cart")}
          >
            <ShoppingCart className="text-gray-600 hover:text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-[6px]">
                {cartCount}
              </span>
            )}
          </div>

          {/* User / Login */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {(user as string | any)?.userName
                    ? (user as string | any).userName.toUpperCase().slice(0, 2)
                    : (user as string | any)?.user?.userName
                    ? (user as string | any).user.userName
                        .toUpperCase()
                        .slice(0, 2)
                    : "US"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  Logged in as{" "}
                  {(user as string | any)?.userName ||
                    (user as string | any)?.user?.userName ||
                    "User"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel
                  className="cursor-pointer hover:text-primary"
                  onClick={() => navigate("/shop/account")}
                >
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel
                  className="flex items-center gap-2 cursor-pointer hover:text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" /> Logout
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              onClick={() => navigate("/auth/login")}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" /> Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingHeader;
