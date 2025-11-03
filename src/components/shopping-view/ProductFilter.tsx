import { filterOptions } from "@/config";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";

interface ProductFilterProps {
  filters: Record<string, string[]>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  handleFilter: (sectionId: string, optionId: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  handleFilter,
}) => {
  return (
    <div className="rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <div key={keyItem} className="border-b pb-2">
            <h3 className="text-lg font-semibold capitalize mb-2">{keyItem}</h3>

            <div className="flex flex-col gap-1">
              {(
                filterOptions as Record<string, { id: string; label: string }[]>
              )[keyItem]?.map((item) => (
                <Label
                  key={item.id}
                  className="flex gap-x-2 text-sm text-gray-700"
                >
                  <Checkbox
                    checked={filters?.[keyItem]?.includes(item.id) ?? false}
                    className="border border-black"
                    onCheckedChange={() => handleFilter(keyItem, item.id)}
                  />
                  {item.label}
                </Label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
