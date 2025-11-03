import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";

import ProductDetailsDialog from "@/components/shopping-view/ProductDetailsDialog";
import ProductFilter from "@/components/shopping-view/ProductFilter";
import ShoppingProductTitle from "@/components/shopping-view/ShoppingProductTitle";
import { sortOptions } from "@/config";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/redux/shopSlice";
import type { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

// ---------- Interfaces ----------
export interface ProductData {
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

export interface ProductListResponse {
  data: ProductData[];
}

export interface ProductDetailsResponse {
  data: ProductData;
}

interface FilterParams {
  [key: string]: string[];
}

// ---------- Helper Function ----------
const createSearchParamsHelper = (filterParams: FilterParams): string => {
  const queryParams: string[] = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (value.length > 0) {
      queryParams.push(`${key}=${encodeURIComponent(value.join(","))}`);
    }
  }
  return queryParams.join("&");
};

// ---------- Component ----------
const ShoppingListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState<FilterParams>({});
  const [sort, setSort] = useState<string>("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { shopProductList, isProductDetailsLoading, productDetails } =
    useAppSelector((state: RootState) => state.shop);
  console.log(searchParams);
  console.log(productDetails);

  // ✅ Extract products safely (handle both shapes: array or { data: [...] })
  const data: ProductData[] = Array.isArray(shopProductList)
    ? (shopProductList as ProductData[])
    : (shopProductList as ProductListResponse)?.data ?? [];

  useEffect(() => {
    const savedFilters = JSON.parse(sessionStorage.getItem("filters") || "{}");
    setFilters(savedFilters);
  }, []);

  useEffect(() => {
    if (!filters) return;
    const queryString = createSearchParamsHelper(filters);
    setSearchParams(queryString);
    dispatch(
      fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
    );
  }, [dispatch, filters, sort, setSearchParams]);

  const handleFilter = (sectionId: string, optionId: string) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (!updated[sectionId]) updated[sectionId] = [optionId];
      else {
        const index = updated[sectionId].indexOf(optionId);
        if (index === -1) updated[sectionId].push(optionId);
        else updated[sectionId].splice(index, 1);
        if (updated[sectionId].length === 0) delete updated[sectionId];
      }
      sessionStorage.setItem("filters", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSort = (value: string) => setSort(value);

  const handleGetProductDetails = (id: string) => {
    dispatch(fetchProductDetails(id));
    setOpenDialog(true);
  };

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 p-4 border rounded-xl shadow-sm bg-white animate-pulse"
        >
          <div className="h-48 w-full bg-gray-200 rounded-lg" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
          <div className="h-8 w-full bg-gray-200 rounded-lg mt-2" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-[200px_1fr] gap-6 p-4 md:p-6 mt-14">
      {/* Sidebar Filter */}
      <ProductFilter
        setFilters={setFilters}
        filters={filters}
        handleFilter={handleFilter}
      />

      {/* Product Listing */}
      <div className="flex flex-col">
        <div className="flex justify-between pb-2 items-center">
          <h1 className="text-lg font-semibold">Products</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowUpDown className="h-4 w-4" />
                <span>Sort By</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {sortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <hr className="mb-4" />

        {/* Product Cards */}
        {isProductDetailsLoading ? (
          renderSkeletons()
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.length > 0 ? (
              data.map((product) => (
                <ShoppingProductTitle
                  key={product._id}
                  product={product}
                  handleGetProductDetails={handleGetProductDetails}
                />
              ))
            ) : (
              <p className="text-gray-500">No products found.</p>
            )}
          </div>
        )}
      </div>

      {/* Product Details Dialog */}
      {openDialog && productDetails && (
        <ProductDetailsDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          product={productDetails.data}
        />
      )}
    </div>
  );
};

export default ShoppingListing;
