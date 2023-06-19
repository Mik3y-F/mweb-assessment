import { type PriceRange } from "./types";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

type PriceRangeFilterProps = {
  priceRanges: PriceRange[];
  handleSelectedPriceRangesChange: (value: PriceRange) => void;
};

export function PriceRangeFilter(props: PriceRangeFilterProps) {
  const { priceRanges, handleSelectedPriceRangesChange } = props;

  const generatePriceRangeLabel = (range: PriceRange) => {
    if (range.max === undefined) return `R${range.min} +`;
    return `R${range.min} - R${range.max}`;
  };

  return (
    <div className="mx-auto my-10 flex w-fit space-x-6 text-center">
      {priceRanges.map((priceRange, idx) => (
        <div className="flex items-center space-x-2" key={idx}>
          <Checkbox
            id="price-range"
            checked={priceRange.selected}
            onCheckedChange={() => handleSelectedPriceRangesChange(priceRange)}
          />
          <Label
            htmlFor="price-range"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {generatePriceRangeLabel(priceRange)}
          </Label>
        </div>
      ))}
    </div>
  );
}
