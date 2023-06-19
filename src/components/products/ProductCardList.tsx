import { Card, CardContent, CardHeader } from "../ui/card";
import { type ProductSummary } from "./types";

type ProductCardListProps = {
  products?: ProductSummary[];
};

export function ProductCardList(props: ProductCardListProps) {
  const { products } = props;
  return (
    <div>
      <div>Product list</div>
      <div className="grid grid-cols-2 gap-6 p-8">
        {products?.map((product) => (
          // Was having issues with the id as key prop here, so added productCode (Duplicate ids)
          <Card key={`${product.id}-${product.productCode}`} className="">
            <CardHeader>
              <div className="text-2xl font-semibold">
                {product.productName}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm">{product.provider}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
