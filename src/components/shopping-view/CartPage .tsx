import { useEffect } from "react";
import {
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} from "@/redux/cartSlice";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { CartItem } from "@/types/cart-types";

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { cartItems, isLoading } = useAppSelector((state) => state.cart);

  // ✅ Determine correct user ID
  const userId =
    (user as any | string)?._id || (user as any | string)?.user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch, userId]);

  if (isLoading) return <p>Loading cart...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems?.length > 0 ? (
        cartItems
          // Ensure each item has userId for type compatibility
          .map((item: any) => ({
            ...item,
            userId: item.userId ?? userId,
          }))
          .map((item: CartItem) => (
            <div
              key={item.productId._id}
              className="flex justify-between items-center border-b py-4"
            >
              <img
                src={item.productId.image}
                alt={item.productId.title}
                className="w-20 h-20 object-cover"
              />
              <div className="flex-1 px-4">
                <p className="font-semibold">{item.productId.title}</p>
                <p>
                  ₹
                  {item.productId.saleprice && item.productId.saleprice > 0
                    ? item.productId.saleprice
                    : item.productId.price}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() =>
                    dispatch(
                      updateCartItemQty({
                        userId,
                        productId: item.productId._id,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  onClick={() =>
                    dispatch(
                      updateCartItemQty({
                        userId,
                        productId: item.productId._id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                >
                  +
                </Button>
              </div>

              {/* Remove Button */}
              <Button
                variant="destructive"
                onClick={() =>
                  dispatch(
                    deleteCartItem({
                      userId,
                      productId: item.productId._id,
                    })
                  )
                }
              >
                Remove
              </Button>
            </div>
          ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
