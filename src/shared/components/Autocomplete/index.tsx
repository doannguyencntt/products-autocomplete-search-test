
import type { SuggestionItemModel } from '@/shared/interface/products.interface';
import { useState, useRef, useEffect, useCallback } from 'react';
import { SkeletonListLoader } from '../Skeleton/SkeletonListLoader';

interface AutocompleteProps {
  value: string;
  dataSource: SuggestionItemModel[];
  loading?: boolean;
  error?: string | null;
  maxItems?: number;
  placeholder?: string;
  onRetry?: () => void;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

const Autocomplete = ({ 
    value, placeholder = 'Tìm kiếm ...', 
    dataSource, 
    loading, 
    maxItems = 10,
    error, 
    onChange, 
    onSelect, 
    onRetry }: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleItems = dataSource.slice(0, maxItems);

  const handleSelect = useCallback((suggestion: string) => {
    onSelect(suggestion);
    setActiveIndex(-1);
  }, [onSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        return;

      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(i => Math.min(i + 1, visibleItems.length - 1));
        return;

      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(i => Math.max(i - 1, 0));
        return;

      case 'Enter':
        if (activeIndex >= 0) {
          e.preventDefault();
          handleSelect(visibleItems[activeIndex].title);
        }
        return;

      case 'Tab':
        setIsOpen(false);
        setActiveIndex(-1);
        return;
    }
  }, [isOpen, activeIndex, visibleItems, handleSelect]);

  const handleOnChange = useCallback((val: string) => {
    onChange(val);
    setActiveIndex(-1);

    if (val.length >= 2) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [onChange]);

  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full mb-8">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => handleOnChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="autocomplete-list"
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
      />

      {isOpen && (
        <ul
          id="autocomplete-list"
          role="listbox"
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {loading && <li className="px-4 py-3 text-center text-gray-500">
            <SkeletonListLoader />  
          </li>}
          {error && (
            <li className="px-4 py-3 text-red-600 text-center">
              Lỗi: {error} <button onClick={onRetry} className="ml-2 underline hover:text-red-800 cursor-pointer">Thử lại</button>
            </li>
          )}
          {!loading && !error && visibleItems.map((sug: SuggestionItemModel, index) => (
            <li
              key={sug.id}
              id={`suggestion-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onClick={() => handleSelect(sug.title)}
              ref={(el) => { if (el) itemRefs.current[index] = el; }}
              className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${index === activeIndex ? 'bg-blue-100' : ''}`}
            >
              {sug.title}
            </li>
          ))}
          {!loading && !error && dataSource.length === 0 && <li className="px-4 py-3 text-gray-500 text-center">Không có kết quả.</li>}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;