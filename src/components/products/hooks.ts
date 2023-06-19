import { MWEB_BASE_URL } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import {
  type ProductPromoResponse,
  type ProductFilters,
  type PriceRange,
} from "./types";
import {
  getProductsFromPromo,
  applyFiltersOnProducts,
  PRICE_FILTER_RANGES,
} from "./utils";
import { type CampaignResponse, useCampaigns } from "../campaigns/hooks";
import { useState } from "react";
import { type Provider, providerInfo } from "../providers/providerInfo";

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

  // Remove duplicates in the returned product response
  const productSet =
    products?.filter(
      (value, index, self) => self.findIndex((m) => m.id === value.id) === index
    ) || [];

  const filteredProducts = applyFiltersOnProducts(productSet, filters);

  return {
    products: filteredProducts,
    productsQuery: promoProductsQuery,
  };
};

export const useProductSelection = (
  prefetchedCampaignResponse?: CampaignResponse
) => {
  const campaignQuery = useCampaigns({
    initialData: prefetchedCampaignResponse,
  });

  const [selectedCampaign, setSelectedCampaign] = useState(
    prefetchedCampaignResponse?.campaigns[0]
  );

  const [priceRanges, setPriceRanges] = useState(PRICE_FILTER_RANGES);
  const [providers, setProviders] = useState(providerInfo);

  const selectedPriceRanges = priceRanges.filter((range) => range.selected);
  const selectedProviders = providers
    .filter((provider) => provider.selected)
    .map((provider) => provider.name);

  const promoCodes = selectedCampaign?.promocodes || [];
  const { products, productsQuery } = useProducts({
    promoCodes,
    filters: {
      selectedPriceRanges,
      selectedProviders,
    },
  });

  const handleSelectedCampaignChange = (value: string) => {
    const campaign = campaignQuery.data?.campaigns.find(
      (campaign) => campaign.code === value
    );
    setSelectedCampaign(campaign);
  };

  const handleSelectedPriceRangesChange = (value: PriceRange) => {
    const newPriceRanges = priceRanges.map((range) => {
      if (range.id === value.id) {
        return { ...range, selected: !range.selected };
      }
      return range;
    });
    setPriceRanges(newPriceRanges);
  };

  const handleSelectedProvidersChange = (value: Provider) => {
    const newProviders = providers.map((provider) => {
      if (provider.code === value.code) {
        return { ...provider, selected: !provider.selected };
      }
      return provider;
    });
    setProviders(newProviders);
  };

  const handleClearSelectedFilters = () => {
    const newPriceRanges = priceRanges.map((range) => {
      return { ...range, selected: false };
    });
    const newProviders = providers.map((provider) => {
      return { ...provider, selected: false };
    });
    setPriceRanges(newPriceRanges);
    setProviders(newProviders);
  };

  return {
    products,
    productsQuery,

    selectedCampaign,
    campaignQuery,

    priceRanges,
    providers,

    handleSelectedCampaignChange,
    handleSelectedPriceRangesChange,
    handleSelectedProvidersChange,
    handleClearSelectedFilters,
  };
};
