import { useState, useEffect } from 'react';
import styles from './ProductDetails.module.scss';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface ProductProps {
  product: {
    name: string;
    image: string;
    reviews: string;
  };
  hasMessages: boolean;
}

export const ProductDetails = ({ product, hasMessages }: ProductProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Collapse automatically when first message is sent
  useEffect(() => {
    if (hasMessages) {
      setIsExpanded(false);
    }
  }, [hasMessages]);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.productDetails}>
      {isExpanded ? (
        // Expanded view
        <>
          <div className={styles.productImage}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={styles.productLinks}>
            <a href="#" className={styles.productPage}>Product page</a>
            <span className={styles.divider}>|</span>
            <a href="#" className={styles.productReviews}>Product reviews: {product.reviews}</a>
          </div>
          <h1 className={styles.productTitle}>{product.name}</h1>
          {hasMessages && (
            <button 
              className={styles.collapseButton} 
              onClick={toggleExpand}
              aria-label="Collapse product details"
            >
              <FaChevronUp />
            </button>
          )}
        </>
      ) : (
        // Collapsed view
        <div className={styles.collapsedView}>
          <div className={styles.collapsedContent}>
            <div className={styles.miniImage}>
              <img src={product.image} alt={product.name} />
            </div>
            <h2 className={styles.miniTitle}>{product.name}</h2>
          </div>
          <div className={styles.collapsedActions}>
            <a href="#" className={styles.miniLink}>Product</a>
            <span className={styles.miniDivider}>|</span>
            <a href="#" className={styles.miniLink}>Reviews</a>
            <button 
              className={styles.expandButton} 
              onClick={toggleExpand}
              aria-label="Expand product details"
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 