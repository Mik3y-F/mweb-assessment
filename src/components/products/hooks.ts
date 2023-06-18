import { MWEB_BASE_URL } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { type ProductPromoResponse, type ProductFilters } from "./types";
import { getProductsFromPromo, applyFiltersOnProducts } from "./utils";

export const generatePromoCodeProductsURL = (promocodes: string[]) => {
  return `${MWEB_BASE_URL}/marketing/products/promos/${promocodes.join(
    ","
  )}?sellable_online=true`;
};

export const fetchProducts = (
  promoCodes: string[]
): Promise<ProductPromoResponse> =>
  axios
    .get<ProductPromoResponse>(generatePromoCodeProductsURL(promoCodes))
    .then((response) => response.data);

export const useProducts = (params: {
  promoCodes: string[];
  filters: ProductFilters;
}) => {
  const { promoCodes, filters } = params;

  const promoProductsQuery = useQuery({
    queryKey: ["promoProducts", promoCodes],
    queryFn: () => fetchProducts(promoCodes),
    enabled: !!promoCodes.length,
  });

  const { data } = promoProductsQuery;
  const products = data ? data.map(getProductsFromPromo).flat() : undefined;

  // Remove duplicates
  const uniqueProducts =
    products?.filter(
      (value, index, self) => self.findIndex((m) => m.id === value.id) === index
    ) || [];

  const filteredProducts = applyFiltersOnProducts(uniqueProducts, filters);

  return {
    products: filteredProducts,
    ...promoProductsQuery,
  };
};
