import { MWEB_BASE_URL } from "@/shared/constants";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export type ProductPromoResponse = ProductPromoCode[];

export type ProductPromoCode = {
  promoCode: string;
  promoCodeDescription: string;
  promoCodeTagLine: string;
  promoCodeCategory: string;
  promoCodeSubcategory: string;
  provider: string;
  coverageStatusOptionKey: string;
  coverageStatusDisplayValue: string;
  promoUrlSlug?: string;
  promoProductTagline?: string;
  promoProductDescription?: string;
  products: Product[];
};

export type Product = {
  productCode: string;
  productName: string;
  category: string;
  subcategory: string;
  consumerCategory?: string;
  productDescription: string;
  productRate: number;
  productDiscountType: string;
  productDiscountAmount: number;
  productDiscountPeriod: number;
  productDiscountSequence: number;
  onceOffCharge: boolean;
  summary: string;
  isHero: boolean;
  heroOption: string;
  heroTagLine?: string;
  heroImage?: string;
  sellOnline: boolean;
  accessLimit: number;
  accessLimitUnits: string;
  highlight1?: string;
  highlight2: string;
  highlight3: string;
  highlight1Icon: string;
  highlight2Icon: string;
  highlight3Icon: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  includes: unknown[]; // Have no idea what this is supposed to be
  highlights: string[];
  technicalTerms?: string;
  lineSpeed: number;
  parameters: Parameter[];
  hasPreProduct: boolean;
  preProduct?: PreProduct;
  genericWorkflowImplementation?: GenericWorkflowImplementation;
  productDescriptionAlternative?: string;
  friendlyName: string;
  invoiceRollupDescription: string;
  minimumContractMonths: number;
  productType: string;
  chargePeriod: string;
  highlight4?: string;
  highlight5?: string;
  highlight6?: string;
  highlight4Icon: string;
  highlight5Icon: string;
  highlight6Icon: string;
  displayPrice?: number;
  tagLine: string;
  id: string;
};

export type Parameter = {
  name: string;
  value: string;
};

export type PreProduct = {
  preProductCode: string;
  preProductName: string;
  preProductFriendlyName: string;
  preProductInvoiceRollupDescription: string;
  preProductRate: number;
  preProductDiscountAmount: number;
  preProductDiscountType: string;
  preProductDiscountedProductRate: number;
  preProductDiscountPeriodInDays: number;
  preProductDiscountSavings: number;
  preProductDisplay: string;
};

export type GenericWorkflowImplementation = {
  id: number;
  name: string;
  supportsGenericLocationLookup: boolean;
  supportsPreOrders: boolean;
  locationIdRequired: LocationIdRequired;
  supportedLocationLookupTypes: SupportedLocationLookupTypes;
};

export type LocationIdRequired = {
  RECONNECT: boolean;
  CHANGE: boolean;
  NEW: boolean;
  SWITCH_LINE: boolean;
};

export type SupportedLocationLookupTypes = {
  ONT_SERIAL: boolean;
  COORDINATES_WITH_RADIUS: boolean;
  COORDINATES: boolean;
  LOCATION_NUMBER: boolean;
  FULL_ADDRESS: boolean;
};

export type ProductSummary = {
  productCode: string;
  productName: string;
  productRate: number;
  provider: string;
  subcategory: string;
  id: string;
};

export const getSummarizedProduct = ({
  productCode,
  productName,
  productRate,
  subcategory,
  id,
}: Product): ProductSummary => {
  const provider = subcategory
    .replace("Uncapped", "")
    .replace("Capped", "")
    .trim();
  return { productCode, productName, productRate, provider, id, subcategory };
};

export const getProductsFromPromo = (
  promo: ProductPromoCode
): ProductSummary[] => {
  return promo.products.map(getSummarizedProduct);
};

export type PriceRange = {
  min: number;
  max?: number;
};

type ProductFilters = {
  selectedProviders: string[];
  selectedPriceRanges: PriceRange[];
};

export const applyFiltersOnProducts = (
  products: ProductSummary[],
  filters: ProductFilters
) => {
  const { selectedProviders: providers, selectedPriceRanges } = filters;

  const selectedProviders = new Set(providers);

  return products
    .filter((p) => {
      if (providers.length === 0) {
        return true;
      }
      return selectedProviders.has(p.subcategory);
    })
    .filter((p) => filterByPriceRanges(p, selectedPriceRanges));
};

const isPriceWithinRange = (
  price: number,
  min: number,
  max: number | undefined
): boolean => {
  return max === undefined ? price >= min : price >= min && price <= max;
};

const isAnyPriceRangeSelected = (
  selectedPriceRanges: PriceRange[]
): boolean => {
  return selectedPriceRanges.length === 0;
};

export const filterByPriceRanges = (
  product: ProductSummary,
  selectedPriceRanges: PriceRange[]
): boolean => {
  if (isAnyPriceRangeSelected(selectedPriceRanges)) {
    return true;
  }

  return selectedPriceRanges.some((range) =>
    isPriceWithinRange(product.productRate, range.min, range.max)
  );
};

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
