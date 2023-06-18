import { type ProductSummary } from "./productHooks";

type ProductCardListProps = {
  products?: ProductSummary[];
};

export function ProductCardList(props: ProductCardListProps) {
  const { products } = props;
  return (
    <div>
      <div>Product list</div>
      {products?.map((product) => (
        // Was having issues with the id as key prop here, so added productCode (Duplicate ids)
        <div key={`${product.id}-${product.productCode}`} className="my-4">
          <div className="text-2xl font-semibold">{product.productName}</div>
          <div className="text-sm">{product.provider}</div>
        </div>
      ))}
    </div>
  );
}
