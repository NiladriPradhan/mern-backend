import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} from "@/redux/cartSlice";

//
// ✅ 1. Define interfaces for strong typing
//
interface Product {
  _id: string;
  title: string;
  price: number;
  saleprice: number;
  image: string;
}

interface CartItem {
  _id: string;
  productId: Product;
  quantity: number;
}

export default function CartPage() {
  //
  // ✅ 2. Typed Redux hooks
  //
  const dispatch = useAppDispatch();
  const { cartItems, isLoading } = useAppSelector(
    (state) => state.cart as unknown as { cartItems: CartItem[]; isLoading: boolean }
  );
  const { user } = useAppSelector((state) => state.auth);

  //
  // ✅ 3. User ID fallback
  //
  const userId: string = user?._id || (user as any | string )?.user?._id || "guest";

  //
  // ✅ 4. Fetch cart items once
  //
  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch, userId]);

  //
  // ✅ 5. Update quantity
  //
  const handleQtyChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: string,
    newQty: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (newQty < 1) return;
    dispatch(updateCartItemQty({ userId, productId, quantity: newQty }));
  };

  //
  // ✅ 6. Remove item
  //
  const handleRemoveItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteCartItem({ userId, productId }));
  };

  //
  // ✅ 7. Calculate total
  //
  const total = cartItems?.reduce((acc: number, item) => {
    const price =
      item.productId?.saleprice > 0
        ? item.productId.saleprice
        : item.productId?.price;
    return acc + price * item.quantity;
  }, 0);

  //
  // ✅ 8. Loading and empty states
  //
  if (isLoading)
    return <p className="text-center mt-10">Loading your cart...</p>;

  if (!cartItems?.length)
    return <p className="text-center mt-10 text-lg">🛒 Your cart is empty</p>;

  //
  // ✅ 9. Render
  //
  return (
    <div className="max-w-4xl mx-auto mt-24 p-4">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <Card
            key={item._id}
            className="shadow-md hover:shadow-lg transition-all"
          >
            <CardContent className="flex justify-between items-center p-4">
              {/* 🖼️ Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.productId?.image || "/placeholder.png"}
                  alt={item.productId?.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.productId?.title}
                  </h2>
                  <p className="text-gray-600">
                    ₹
                    {item.productId?.saleprice > 0
                      ? item.productId.saleprice
                      : item.productId?.price}
                  </p>
                </div>
              </div>

              {/* ➕➖ Quantity + Delete */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={(e) =>
                    handleQtyChange(e, item.productId._id, item.quantity - 1)
                  }
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <span className="px-3 font-semibold">{item.quantity}</span>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={(e) =>
                    handleQtyChange(e, item.productId._id, item.quantity + 1)
                  }
                >
                  <Plus className="w-4 h-4" />
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={(e) => handleRemoveItem(e, item.productId._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 🧾 Total */}
      <div className="flex justify-between items-center mt-8 border-t pt-4">
        <h2 className="text-xl font-bold">Total:</h2>
        <span className="text-xl font-semibold">₹{total.toFixed(2)}</span>
      </div>

      <Button className="mt-6 w-full text-lg py-6">Proceed to Checkout</Button>
    </div>
  );
}
