import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductImageUpload from "@/components/admin-view/image-upload";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/redux/productSlice";
import ProductCard from "@/components/admin-view/ProductCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { Product } from "@/types/product-type";

const AdminProducts = () => {
  const dispatch = useAppDispatch(); // ✅ redux dispatch

  const categories = [
    "men",
    "women",
    "kids",
    "accessories",
    "footwear",
    "electronics",
    "mobile",
  ];
  const brands = ["nike", "adidas", "puma", "levis", "zara", "H&M", "sony"];

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    saleprice: "",
    totalstock: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { productList } = useAppSelector((state) => state.product);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData = {
        image: uploadImageUrl,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        brand: formData.brand,
        price: Number(formData.price),
        saleprice: Number(formData.saleprice),
        totalstock: Number(formData.totalstock),
      };

      // ✅ dispatch Redux action
      const resultAction = await dispatch(
        addNewProduct({ ...productData, rejectValue: "" }) as any
      );

      console.log("✅ Product added:", resultAction);

      // Clear form after success
      setFormData({
        image: "",
        title: "",
        description: "",
        category: "",
        brand: "",
        price: "",
        saleprice: "",
        totalstock: "",
      });
      setUploadImageUrl("");
      setImageFile(null);
    } catch (error) {
      console.error("❌ Error adding product:", error);
    }
  };

  useEffect(() => {
    setFilteredData(
      productList.filter(
        (p) => typeof p._id === "string"
      ) as unknown as Product[]
    );
  }, [productList]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleEditProduct = (p: Product) => {
    setSelectedProduct(p);
    setOpenModal(true);
  };

  const handleDeleteProduct = (p: Product) => {
    dispatch(deleteProduct(p._id!));
    setFilteredData(filteredData.filter((item) => item._id !== p._id));
  };

  const handleSaveChanges = async () => {
    if (!selectedProduct?._id) return;

    const updatedData: Partial<Product> = {
      image: selectedProduct?.image,
      title: selectedProduct.title,
      price: selectedProduct.price,
      saleprice: selectedProduct.saleprice,
      totalstock: selectedProduct.totalstock,
    };

    try {
      dispatch(
        editProduct({
          id: selectedProduct._id,
          formData: updatedData,
        })
      );
      dispatch(fetchAllProducts());
    } catch (error) {
      console.error("❌ Error updating product:", error);
    }

    setOpenModal(false);
  };

  return (
    <>
      <div className="flex flex-col"></div>
      <Sheet>
        <div className="flex justify-between">
          <SheetTrigger asChild>
            <Button>Add New Product</Button>
          </SheetTrigger>
        </div>

        <SheetContent className="flex flex-col overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Product</SheetTitle>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadImageUrl={uploadImageUrl}
              setUploadImageUrl={setUploadImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
            />
            <SheetDescription>
              Fill in the product details below, then click Add Product.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleFormSubmit} className="grid gap-4 p-4">
            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Product name"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Product description"
              />
            </div>

            <div>
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Brand</Label>
              <Select
                value={formData.brand}
                onValueChange={(value) =>
                  setFormData({ ...formData, brand: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Sale Price</Label>
              <Input
                type="number"
                value={formData.saleprice}
                onChange={(e) =>
                  setFormData({ ...formData, saleprice: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Total Stock</Label>
              <Input
                type="number"
                value={formData.totalstock}
                onChange={(e) =>
                  setFormData({ ...formData, totalstock: e.target.value })
                }
              />
            </div>

            <Button type="submit" disabled={imageLoadingState}>
              {imageLoadingState ? "Uploading..." : "Add Product"}
            </Button>
          </form>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredData?.map((product, i) => {
          return product._id ? (
            <ProductCard
              key={i}
              product={product}
              onEdit={(p) => handleEditProduct(p as Product)}
              onDelete={(p) => handleDeleteProduct(p as Product)}
            />
          ) : null;
        })}
        {/* Edit Product Modal */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>

            {selectedProduct && (
              <div className="space-y-3">
                <div>
                  <Label>Image</Label>
                  <Input
                    value={selectedProduct.image}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={selectedProduct.title}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: +e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Sale Price</Label>
                  <Input
                    type="number"
                    value={selectedProduct.saleprice}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        saleprice: +e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    value={selectedProduct.totalstock}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        totalstock: +e.target.value,
                      })
                    }
                  />
                </div>
                <Button onClick={handleSaveChanges} className="w-full">
                  Save Changes
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AdminProducts;
