import React from 'react';
import styles from './ProductDetails.module.scss';
import { Product } from '../../types/product';

interface ProductDetailsProps {
  product: Product | null;
  hasMessages?: boolean;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, hasMessages = false }) => {
  // If no product is selected, don't render anything
  if (!product) {
    return null;
  }

  // If messages exist, show minimized version
  if (hasMessages) {
    return (
      <div className={styles.productDetailsMinimized}>
        <div className={styles.productImageSmall}>
          {product.image && <img src={product.image} alt={product.name} />}
        </div>
        <div className={styles.productNameSmall}>{product.name}</div>
      </div>
    );
  }

  // Full product details display
  return (
    <div className={styles.productDetails}>
      <div className={styles.productContent}>
        <div className={styles.productImageWrapper}>
          {product.image && <img 
            src={product.image} 
            alt={product.name} 
            className={styles.productImage}
          />}
        </div>
        <div className={styles.productInfo}>
          <h2 className={styles.productName}>{product.name}</h2>
          {product.reviews && <div className={styles.productReviews}>{product.reviews}</div>}
          {product.description && <p className={styles.productDescription}>{product.description}</p>}
        </div>
      </div>
    </div>
  );
}; 