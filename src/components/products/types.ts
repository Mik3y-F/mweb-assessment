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

export type PriceRange = {
  min: number;
  max?: number;
  selected: boolean;
  id: number;
};

export type ProductFilters = {
  selectedProviders: string[];
  selectedPriceRanges: PriceRange[];
};
