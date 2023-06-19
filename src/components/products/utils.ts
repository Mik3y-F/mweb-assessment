import {
  type ProductPromoCode,
  type Product,
  type ProductSummary as FormattedProduct,
  type ProductFilters,
  type PriceRange,
} from "./types";

export const PRICE_FILTER_RANGES: PriceRange[] = [
  {
    id: 1,
    min: 0,
    selected: true,
    max: 699,
  },
  {
    id: 2,
    min: 700,
    max: 999,
    selected: false,
  },
  {
    id: 3,
    min: 1000,
    selected: false,
  },
];

export const formatProductResponse = (product: Product): FormattedProduct => {
  const { subcategory } = product;
  const provider = subcategory
    .replace("Uncapped", "")
    .replace("Capped", "")
    .trim();
  return { ...product, provider };
};

export const getProductsFromPromo = (
  promo: ProductPromoCode
): FormattedProduct[] => {
  return promo.products.map(formatProductResponse);
};

export const applyFiltersOnProducts = (
  products: FormattedProduct[],
  filters: ProductFilters
) => {
  const { selectedProviders: providers, selectedPriceRanges } = filters;

  const selectedProviders = new Set(providers);

  return products
    .filter((p) => {
      if (providers.length === 0) {
        return true;
      }
      return selectedProviders.has(p.provider);
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
  product: FormattedProduct,
  selectedPriceRanges: PriceRange[]
): boolean => {
  if (isAnyPriceRangeSelected(selectedPriceRanges)) {
    return true;
  }

  return selectedPriceRanges.some((range) =>
    isPriceWithinRange(product.productRate, range.min, range.max)
  );
};
