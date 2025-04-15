import apiClient from './apiClient';
import { Product } from '../types/product';
import appleWatchImage from '../assets/images/placeholders/abc.png';

// Mock data for testing - remove or comment out when connecting to real API
const MOCK_PRODUCTS: Product[] = [
  {
    id: 'apple-watch-series-10-4',
    name: 'Apple watch series 10',
    image: appleWatchImage,
    reviews: '4.5/5 (120 reviews)',
    description: 'apple smart watch with advanced features'
  },
  {
    id: 'prod-2',
    name: 'Wireless Headphones',
    image: 'https://via.placeholder.com/100?text=Headphones',
    reviews: '4.7/5 (89 reviews)',
    description: 'Noise-cancelling wireless headphones with 30-hour battery'
  },
  {
    id: 'prod-3',
    name: 'Fitness Tracker',
    image: 'https://via.placeholder.com/100?text=Tracker',
    reviews: '4.2/5 (210 reviews)',
    description: 'Water-resistant fitness tracker with heart rate monitoring'
  },
  {
    id: 'prod-4',
    name: 'Smartphone X',
    image: 'https://via.placeholder.com/100?text=Phone',
    reviews: '4.8/5 (350 reviews)',
    description: 'Latest smartphone with advanced camera system'
  }
];

// Function to search for products
// Assumes backend endpoint /api/products/search?q={query}
// The backend should return { success: boolean, products: Product[] }
export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) {
    return [];
  }
  
  // For testing: simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Filter mock products based on query
  const lowerQuery = query.toLowerCase();
  const results = MOCK_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) || 
    (product.description && product.description.toLowerCase().includes(lowerQuery))
  );
  
  console.log(`Mock search for "${query}" returned ${results.length} results`);
  return results;
  
  // Comment out the actual API call for now
  /*
  try {
    console.log(`Searching products with query: "${query}"`);
    const response = await apiClient.get('/products/search', {
      params: { q: query }
    });
    
    // ... rest of your original function
  } catch (error) {
    // ... error handling
  }
  */
}

// Optional: Function to get a single product by ID if needed later
export async function getProductById(productId: string): Promise<Product | null> {
  try {
    const response = await apiClient.get(`/products/${productId}`);
    if (response.data.success && response.data.product) {
      return response.data.product;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    return null;
  }
} 