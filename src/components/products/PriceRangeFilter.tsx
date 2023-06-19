import { type PriceRange } from "./types";
import { MenubarCheckboxItem } from "../ui/menubar";

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
    <div className="">
      {priceRanges.map((priceRange, idx) => (
        <div className="" key={idx}>
          <MenubarCheckboxItem
            id="price-range"
            checked={priceRange.selected}
            onCheckedChange={() => handleSelectedPriceRangesChange(priceRange)}
          >
            {generatePriceRangeLabel(priceRange)}
          </MenubarCheckboxItem>
        </div>
      ))}
    </div>
  );
}
