import {
  Check,
  DownloadCloud,
  SearchX,
  UploadCloud,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { type ProductSummary } from "./types";
import { providerInfo } from "../providers/providerInfo";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

type ProductCardListProps = {
  products?: ProductSummary[];
  isLoading?: boolean;
  isError?: boolean;
};

export function ProductCardList(props: ProductCardListProps) {
  const { products, isLoading, isError } = props;

  const [animationParent] = useAutoAnimate();

  const getProviderLink = (provider: string) => {
    return providerInfo.find((p) => p.name === provider)?.url || "";
  };

  return (
    <div className="h-full w-full">
      {products?.length === 0 && !isLoading && !isError && (
        <div className="p-20 text-center md:p-40">
          <div className="my-auto text-xl font-semibold text-slate-300 md:text-3xl">
            No products found
          </div>
          <SearchX className="mx-auto mt-4 text-slate-300" size={40} />
        </div>
      )}
      {products?.length === 0 ? null : (
        <div
          className="grid h-full w-full gap-6 py-8 pt-4 lg:grid-cols-2"
          ref={animationParent}
        >
          {products?.map((product) => (
            // Was having issues with the id as key prop here, so added productCode (Duplicate ids)
            <Card
              key={`${product.id}-${product.productCode}`}
              className="text-left"
            >
              <CardHeader className="p-4 md:p-6">
                <div className="flex w-full flex-wrap justify-between">
                  <div className="pb-4">
                    <div className="text-2xl font-semibold text-slate-800">
                      {product.friendlyName}
                    </div>
                    <div className="text-2xl font-bold text-blue-800">
                      R{product.productRate} pm
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-4">
                    <NetSpeedCard
                      type="download"
                      speed={product.netSpeeds.download}
                    />
                    <NetSpeedCard
                      type="upload"
                      speed={product.netSpeeds.upload}
                    />
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
                    className="bg-gradient-to-r from-red-700 to-red-600 text-slate-50"
                  >
                    Check Coverage
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {isLoading && (
        <div className="grid h-full w-full gap-6 py-8 pt-4 lg:grid-cols-2">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="h-40 w-full bg-slate-200" />
            ))}
        </div>
      )}
      {isError && (
        <div className="p-20 text-center md:p-40">
          <div className="my-auto text-xl font-semibold text-slate-300 md:text-3xl">
            Unexpected Error Occurred
          </div>
          <XCircle className="mx-auto mt-4 text-slate-300" size={40} />
        </div>
      )}
    </div>
  );
}

type NetSpeedCardProps = {
  type: "download" | "upload";
  speed: string;
};

function NetSpeedCard(props: NetSpeedCardProps) {
  const { type, speed } = props;

  return (
    <div className="rounded-md border border-slate-300 p-4 px-6">
      <div className="text-xs md:text-sm">
        {type === "download" ? "Download" : "Upload"}
      </div>
      <div className="flex gap-2 md:gap-4">
        <div>
          <span className="pr-2 text-xl font-bold md:text-2xl">{speed}</span>
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
