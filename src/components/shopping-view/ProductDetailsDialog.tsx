import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  saleprice: number;
  image: string;
  brand: string;
  category: string;
  totalstock: number;
}

interface ProductDetailsDialogProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  product: Product;
}

const ProductDetailsDialog = ({
  openDialog,
  setOpenDialog,
  product,
}: ProductDetailsDialogProps) => {
  if (!product) return null;
console.log(product);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.title}
            className="w-full h-[300px] object-cover rounded-lg"
          />

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-muted-foreground mb-2">{product.description}</p>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-sm">
                  Brand:{" "}
                  <Badge variant="outline" className="capitalize">
                    {product.brand}
                  </Badge>
                </span>
                <span className="font-semibold text-sm">
                  Category:{" "}
                  <Badge variant="outline" className="capitalize">
                    {product.category}
                  </Badge>
                </span>
              </div>

              <div className="flex items-center gap-3">
                {product.saleprice > 0 ? (
                  <>
                    <span className="text-lg line-through text-muted-foreground">
                      ₹{product.price}
                    </span>
                    <span className="text-xl font-semibold text-primary">
                      ₹{product.saleprice}
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-semibold">₹{product.price}</span>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              {/* In stock: {product.totalstock} */}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
