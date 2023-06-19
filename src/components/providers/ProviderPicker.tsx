import { CheckCheck } from "lucide-react";
import { type Provider } from "./providerInfo";
import Image from "next/image";

type ProviderPickerProps = {
  providers: Provider[];
  handleSelectedProvidersChange: (value: Provider) => void;
};

export function ProviderPicker(props: ProviderPickerProps) {
  const { providers, handleSelectedProvidersChange } = props;

  return (
    <div className="mx-auto flex w-full justify-center gap-6">
      {providers.map((provider) => (
        <div
          key={provider.code}
          className="relative"
          onClick={() => handleSelectedProvidersChange(provider)}
        >
          <div>
            <Image
              src={provider.url}
              alt={provider.name}
              height={70}
              width={70}
              priority
            />
          </div>
          {provider.selected && (
            <div className="absolute -left-3 -top-2 z-50 rounded-full bg-green-600">
              <CheckCheck className="p-0.5 text-slate-50" size={17} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
