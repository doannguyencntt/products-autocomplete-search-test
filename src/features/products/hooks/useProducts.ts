import { getProduct } from '@/apis/product.api';
import type { ProductModel } from '@/shared/interface';
import { useState, useEffect, useCallback } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProduct();
      setProducts(data);
    } catch (err: any) {
      const errorMessage: string = err.message || 'Đã có lỗi xảy ra khi tải sản phẩm.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, loading, error, retry: loadProducts };
};

export default useProducts;