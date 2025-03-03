import { ProductDetails } from "../components/product/ProductDetails";
import { ChatInterface } from "../components/chat/ChatInterface";
import styles from "./Landing.module.scss";
import placeholderImage from "../assets/images/placeholder.png";

// Mock product data (replace with your actual data source)
const productData = {
  name: "Casio Casiotone CT-S300 Zwart",
  image: placeholderImage,
  reviews: "9.0/10 (13 reviews)"
};

const Landing = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}></div>
      </header>
      <div className={styles.container}>
        <div className={styles.chatSection}>
          <ProductDetails product={productData} />
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Landing;
