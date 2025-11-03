import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { addToCart } from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface Product {
  _id: string;
  title: string;
  price: number;
  saleprice: number;
  image: string;
  description?: string;
  category?: string;
  brand?: string;
  totalstock?: number;
}

interface ShoppingProductTitleProps {
  product: Product;
  handleGetProductDetails: (id: string) => void;
}

const ShoppingProductTitle: React.FC<ShoppingProductTitleProps> = ({
  product,
  handleGetProductDetails,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleAddToCart = () => {
    console.log("🛒 Add to cart clicked:", product._id);
    const userId = user?._id || (user as any | string)?.user?._id || "guest";
    dispatch(addToCart({ userId, productId: product._id, quantity: 1 }));
  };

  return (
    <Card className="w-full max-w-sm mx-auto shadow-md hover:shadow-lg transition-all duration-200">
      <div
        className="relative cursor-pointer"
        onClick={() => handleGetProductDetails(product._id)}
      >
        <img
          src={product.image || "/placeholder.png"}
          alt={product.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
        {product.saleprice > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2 line-clamp-1">{product.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground text-lg font-semibold">
            ₹{product.price}
          </span>
          {product.saleprice > 0 && (
            <span className="text-lg font-semibold text-primary">
              ₹{product.saleprice}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full" variant="default">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTitle;
