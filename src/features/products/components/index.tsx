import Autocomplete from '@/shared/components/Autocomplete';
import ProductList from '@/features/products/components/ProductList';
import useProducts from '@/features/products/hooks/useProducts';
import { useEffect, useMemo, useState } from 'react';
import useAutocomplete from '@/shared/hooks/useAutocomplete';
import useDebounce from '@/shared/hooks/useDebounce';
import { SkeletonCard } from '@/shared/components/Skeleton/SkeletonCard';

export const ProductWrapper = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { products, loading, error, retry } = useProducts();

  const debouncedValue = useDebounce(searchQuery, 300);

  const { suggestions,
    loading: autocompleteLoading,
    error: autocompleteError,
    fetchSuggestions,
    retry: retryAutocomplete
  } = useAutocomplete(searchQuery);

  const filteredProducts = useMemo(() => {
    if (!debouncedValue.trim()) return products;
    return products.filter(p => p.title.toLowerCase().includes(debouncedValue.toLowerCase()));
  }, [products, debouncedValue]);

  const calculateMatchCount = useMemo(() => {
    if (!searchQuery.trim()) return 'Tìm kiếm sản phẩm';
    return filteredProducts?.length === 0
      ? 'Không có sản phẩm nào đc tìm thấy'
      : `${filteredProducts.length} sản phẩm được tìm thấy`;
  }, [filteredProducts, searchQuery]);

  useEffect(() => {
    if (debouncedValue.length >= 2) {
      fetchSuggestions(debouncedValue);
    }
  }, [fetchSuggestions, debouncedValue]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className='flex flex-col'>
        <div className="text-3xl font-bold text-gray-900 mb-6">{calculateMatchCount}</div>

        <Autocomplete
          dataSource={suggestions}
          loading={autocompleteLoading}
          value={searchQuery}
          error={autocompleteError}
          onChange={setSearchQuery}
          onSelect={setSearchQuery}
          onRetry={() => retryAutocomplete(debouncedValue)} />
      </div>

      {
        loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(9)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )
      }

      {error && (
        <div className="text-center mt-8">
          <p className="text-red-600 mb-4">Lỗi: {error}</p>
          <button
            onClick={retry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
};