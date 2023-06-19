import {
  ArrowDown,
  ArrowUp,
  Check,
  DownloadCloud,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { type ProductSummary } from "./types";
import { providerInfo } from "../providers/providerInfo";
import { Button } from "../ui/button";

type ProductCardListProps = {
  products?: ProductSummary[];
};

export function ProductCardList(props: ProductCardListProps) {
  const { products } = props;

  const getProviderLink = (provider: string) => {
    return providerInfo.find((p) => p.name === provider)?.url || "";
  };

  return (
    <div>
      <div>Product list</div>
      <div className="grid md:grid-cols-2 gap-6 p-8">
        {products?.map((product) => (
          // Was having issues with the id as key prop here, so added productCode (Duplicate ids)
          <Card
            key={`${product.id}-${product.productCode}`}
            className="text-left"
          >
            <CardHeader>
              <div className="flex w-full justify-between">
                <div>
                  <div className="text-2xl font-semibold text-slate-800">
                    {product.friendlyName}
                  </div>
                  <div className="text-2xl font-bold text-blue-800">
                    R{product.productRate} pm
                  </div>
                </div>
                <div className="flex gap-4">
                  <NetSpeedCard type="upload" />
                  <NetSpeedCard type="download" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {product.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check size={20} />
                    <div>{highlight}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-between">
                <div>
                  <Image
                    src={getProviderLink(product.provider)}
                    alt={product.provider}
                    height={90}
                    width={90}
                    priority
                  />
                </div>
                <Button
                  size={"lg"}
                  className="bg-gradient-to-r from-orange-700 to-red-600 text-slate-50"
                >
                  Check Coverage
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

type NetSpeedCardProps = {
  type: "download" | "upload";
};

function NetSpeedCard(props: NetSpeedCardProps) {
  const { type } = props;

  return (
    <div className="rounded-md border border-slate-300 p-4 px-6">
      <div className="text-sm">
        {type === "download" ? "Download" : "Upload"}
      </div>
      <div className="flex gap-4">
        <div>
          <span className="pr-2 text-3xl font-bold">10</span>
          <span>MBPS</span>
        </div>
        <div>
          {type === "download" ? (
            <DownloadCloud size={20} />
          ) : (
            <UploadCloud size={20} />
          )}
        </div>
      </div>
    </div>
  );
}
