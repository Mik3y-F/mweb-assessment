import { Building2, Coins, ListFilter } from "lucide-react";
import { type Provider } from "../providers/providerInfo";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { type PriceRange } from "./types";
import { Badge } from "../ui/badge";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { ProviderFilter } from "../providers/ProviderFilter";

type ProductFilterMenuBarProps = {
  priceRanges: PriceRange[];
  handleSelectedPriceRangesChange: (value: PriceRange) => void;
  providers: Provider[];
  handleSelectedProvidersChange: (value: Provider) => void;
};

export function ProductFilterMenuBar(props: ProductFilterMenuBarProps) {
  const {
    priceRanges,
    handleSelectedPriceRangesChange,
    providers,
    handleSelectedProvidersChange,
  } = props;

  const selectedPriceRanges = () => {
    return priceRanges.filter((priceRange) => priceRange.selected);
  };

  const selectedProviders = () => {
    return providers.filter((provider) => provider.selected);
  };

  return (
    <Menubar>
      <ListFilter size={20} />
      <MenubarMenu>
        <MenubarTrigger>
          <div className="flex gap-2 ">
            <Coins size={18} />
            <div className="whitespace-nowrap text-sm">Price Range</div>
            <Badge className="bg-green-600 text-xs">
              {selectedPriceRanges().length}
            </Badge>
          </div>
        </MenubarTrigger>
        <MenubarContent className="w-full">
          <PriceRangeFilter
            priceRanges={priceRanges}
            handleSelectedPriceRangesChange={handleSelectedPriceRangesChange}
          />
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <div className="flex gap-2 ">
            <Building2 size={18} />
            <div className="text-sm">Providers</div>
            <Badge className="bg-green-600 text-xs">
              {selectedProviders().length}
            </Badge>
          </div>
        </MenubarTrigger>
        <MenubarContent className="w-full">
          <ProviderFilter
            providers={providers}
            handleSelectedProvidersChange={handleSelectedProvidersChange}
          />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
