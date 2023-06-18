import { type PriceRange } from "@/components/products/productHooks";

export const MWEB_BASE_URL = "https://apigw.mweb.co.za/prod/baas/proxy";

export const PRICE_FILTER_RANGES: PriceRange[] = [
  {
    min: 0,
    max: 699,
  },
  {
    min: 700,
    max: 999,
  },
  {
    min: 1000,
  }
];
