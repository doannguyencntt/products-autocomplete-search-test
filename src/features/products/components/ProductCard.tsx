import { LazyImage } from '@/shared/components/LazyImage';
import type { ProductModel } from '@/shared/interface/products.interface';
import { memo } from 'react';

interface ProductCardProps {
  product: ProductModel;
}
const ProductCard = memo(({ product }: ProductCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain p-4 bg-white"
      /> */}
      <LazyImage src={product.image} alt={product.title} className="w-full h-48 object-contain p-4 bg-white"/>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.title}</h3>
        <p className="mt-2 text-xl font-bold text-blue-600">${product.price}</p>
      </div>
    </div>
  );
});

export default ProductCard;