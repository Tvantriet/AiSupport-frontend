import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Product } from '../../types/product';
import styles from './ProductSelector.module.scss';
import { LoadingSpinner } from '../common/LoadingSpinner';
import apiClient from '../../api/apiClient';

interface ProductSelectorProps {
  onProductSelect: (product: Product) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({ onProductSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Refs for the search container and intersection observer
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingElementRef = useRef<HTMLDivElement>(null);

  // Function to fetch products
  const fetchProducts = useCallback(async (query: string, pageNum: number, append: boolean = false) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiClient.get('/api/products/search', {
        params: {
          q: query,
          page: pageNum,
          limit: 10 // Number of results per "page"
        }
      });
      
      if (response.data.success) {
        // If appending (loading more), combine the results with existing products
        if (append && pageNum > 1) {
          setProducts(prev => [...prev, ...response.data.products]);
        } else {
          setProducts(response.data.products);
        }
        
        // Update pagination info
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
        setHasMore(response.data.page < response.data.totalPages);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('An error occurred while fetching products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Setup intersection observer for infinite scrolling
  useEffect(() => {
    const options = {
      root: searchContainerRef.current,
      rootMargin: '0px',
      threshold: 0.1
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        // If the loading element is visible, we load more products
        loadMoreProducts();
      }
    };

    observerRef.current = new IntersectionObserver(callback, options);
    
    if (loadingElementRef.current) {
      observerRef.current.observe(loadingElementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading]);

  // Fetch products when search term changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        setPage(1); // Reset to first page on new search
        fetchProducts(searchTerm, 1, false);
      } else {
        // If search is cleared, reset to show recommended/featured products
        fetchInitialProducts();
      }
    }, 500); // Debounce search input

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, fetchProducts]);

  // Fetch initial/featured products on component mount
  const fetchInitialProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Here you can fetch initial/featured products or categories
      // For now, we'll just fetch with an empty query
      const response = await apiClient.get('/api/products/search', {
        params: {
          page: 1,
          limit: 10
        }
      });
      
      if (response.data.success) {
        setProducts(response.data.products);
        setPage(response.data.page);
        setTotalPages(response.data.totalPages);
        setHasMore(response.data.page < response.data.totalPages);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching initial products:', err);
      setError('An error occurred while fetching products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialProducts();
  }, [fetchInitialProducts]);

  // Function to load more products
  const loadMoreProducts = () => {
    if (page < totalPages) {
      fetchProducts(searchTerm, page + 1, true);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Handle product selection
  const handleSelectProduct = (product: Product) => {
    onProductSelect(product);
  };

  return (
    <div className={styles.productSelector}>
      <h4>Select a product</h4>
      
      <div className={styles.searchBarWrapper}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>
      
      <div className={styles.resultsContainer} ref={searchContainerRef}>
        {error ? (
          <div className={styles.errorState}>
            <span>{error}</span>
          </div>
        ) : products.length > 0 ? (
          <>
            <ul className={styles.resultsList}>
              {products.map((product) => (
                <li key={product.id} className={styles.resultItem}>
                  <button
                    type="button"
                    className={styles.resultButton}
                    onClick={() => handleSelectProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.resultImage}
                    />
                    <span className={styles.resultName}>{product.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Loading indicator at bottom that triggers more content */}
            <div ref={loadingElementRef} className={styles.loadMoreTrigger}>
              {isLoading && hasMore && (
                <div className={styles.loadingState}>
                  <LoadingSpinner size="small" />
                  <span>Loading more products...</span>
                </div>
              )}
            </div>
          </>
        ) : isLoading ? (
          <div className={styles.loadingState}>
            <LoadingSpinner size="medium" />
            <span>Searching products...</span>
          </div>
        ) : (
          <div className={styles.noResultsState}>
            {searchTerm ? 'No products found' : 'Featured products will appear here'}
          </div>
        )}
      </div>
    </div>
  );
}; 