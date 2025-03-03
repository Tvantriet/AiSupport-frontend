import styles from './ProductDetails.module.scss';

interface ProductProps {
  product: {
    name: string;
    image: string;
    reviews: string;
  };
}

export const ProductDetails = ({ product }: ProductProps) => {
  return (
    <div className={styles.productDetails}>
      <div className={styles.productImage}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.productLinks}>
        <a href="#" className={styles.productPage}>Product page</a>
        <span className={styles.divider}>|</span>
        <a href="#" className={styles.productReviews}>Product reviews: {product.reviews}</a>
      </div>
      <h1 className={styles.productTitle}>{product.name}</h1>
    </div>
  );
}; 