import { getSuggestions } from '@/apis/product.api';
import { useState, useRef, useCallback } from 'react';
import type { SuggestionItemModel } from '../interface/products.interface';

const cache = new Map();

const useAutocomplete = (query: string) => {
  const [suggestions, setSuggestions] = useState<SuggestionItemModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController>(null);

  const fetchData = useCallback(async (q: string) => {
    if (cache.has(q)) {
      setSuggestions(cache.get(q));
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);
    
    try {
      const data = await getSuggestions(q, abortControllerRef.current.signal);
      const results = data || [];
      cache.set(q, results);
      setSuggestions(results);
    } catch (err: any) {
      const errorMessage: string = err.message || 'Đã có lỗi xảy ra khi tải sản phẩm.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const retry = useCallback((q: string = query) => {
    fetchData(q);
  }, [fetchData, query]);

  return { suggestions, loading, error, fetchSuggestions: fetchData, retry };
};

export default useAutocomplete;