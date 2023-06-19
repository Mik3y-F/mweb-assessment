import { MenubarCheckboxItem } from "../ui/menubar";
import { type ProviderPickerProps } from "./ProviderPicker";

type ProviderFilterProps = ProviderPickerProps;

export function ProviderFilter(props: ProviderFilterProps) {
  const { providers, handleSelectedProvidersChange } = props;

  return (
    <div className="">
      {providers.map((provider, idx) => (
        <div className="" key={idx}>
          <MenubarCheckboxItem
            id="price-range"
            checked={provider.selected}
            onCheckedChange={() => handleSelectedProvidersChange(provider)}
          >
            {provider.name}
          </MenubarCheckboxItem>
        </div>
      ))}
    </div>
  );
}
