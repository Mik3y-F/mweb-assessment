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
        <div key={product.productCode} className="my-4">
          <div className="text-2xl font-semibold">{product.productName}</div>
          <div className="text-sm">{product.provider}</div>
        </div>
      ))}
    </div>
  );
}
