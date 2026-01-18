import type { ProductModel } from "@/shared/interface";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: ProductModel[];
}
const ProductList = ({ products = [] }: ProductListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;