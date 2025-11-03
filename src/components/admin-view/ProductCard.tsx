import type React from "react";
import type { IProductCardProps } from "@/types/product-card-type";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProductCard: React.FC<IProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    saleprice,
    totalstock,
  } = product;

  const formattedPrice = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const inStock = totalstock > 0;
  return (
    <>
      <Card className={`max-w-sm w-full `}>
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden rounded-t-md bg-muted">
            {image ? (
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full grid place-items-center text-muted-foreground">
                <span>No image</span>
              </div>
            )}

            <div className="absolute top-3 left-3">
              {category && <Badge variant="secondary">{category}</Badge>}
            </div>

            <div className="absolute top-3 right-3">
              <Badge
                className={`${
                  inStock
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {inStock ? `In stock (${totalstock})` : "Out of stock"}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <CardTitle className="text-base line-clamp-2">{title}</CardTitle>
              {brand && (
                <p className="text-sm text-muted-foreground mt-1">
                  Brand: {brand}
                </p>
              )}
              {description && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                  {description}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            {saleprice && saleprice < price ? (
              <>
                <span className="text-lg font-semibold">
                  {formattedPrice(saleprice)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formattedPrice(price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold">
                {formattedPrice(price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              disabled={!inStock}
              onClick={() => onEdit?.(product)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete?.(product)}
            >
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCard;
