import { useState, useEffect } from "react";
import { ChatInterface } from "../components/chat/ChatInterface";
import { ChatInput } from "../components/chat/ChatInput";
import { SuggestionBubbles } from "../components/chat/SuggestionBubbles";
import { Sidebar } from "../components/sidebar/Sidebar";
import { ChatProvider } from "../context/ChatContext";
import { useGlobalChat } from "../context/ChatContext";
import styles from "./Landing.module.scss";
import placeholderImage from "../assets/images/placeholder.png";
import { Link } from 'react-router-dom';
import { ProductSelector } from "../components/product/ProductSelector";
import { ProductDetails } from "../components/product/ProductDetails";
import { ChatContainer } from "../components/chat/ChatContainer";
import { Button } from '../components/ui/Button';

// Mock product data (replace with your actual data source)
const productData = {
  name: "Casio Casiotone CT-S300 Zwart",
  image: placeholderImage,
  reviews: "9.0/10 (13 reviews)"
};

// ChatSection component that uses ChatContext
const ChatSection = () => {
  const {
    messages,
    followUpSuggestions,
    isLoading,
    isLoadingFollowUps,
    sendMessage,
    resetChat,
    currentProduct,
    selectProduct
  } = useGlobalChat();
  
  // Separate loading indicator for just the chat input vs follow-up suggestions
  const isInputDisabled = isLoading && messages.length > 0 && 
    messages[messages.length - 1].sender === 'user';

  return (
    <>
      <div className={styles.chatSection}>
        {!currentProduct ? (
          // Show product selector if no product is selected
          <div className={styles.productSelectorContainer}>
            <h2>Select a Product to Get Support</h2>
            <ProductSelector onProductSelect={selectProduct} />
          </div>
        ) : (
          // Show chat interface if a product is selected
          <>
            <ProductDetails product={currentProduct} hasMessages={messages.length > 0} />
            <ChatContainer 
              messages={messages} 
              isLoading={isLoading} 
              initialSuggestions={[
                "How does this product work?",
                "What are the key features?",
                "How much does it cost?"
              ]}
              onSuggestionClick={sendMessage}
              product={currentProduct}
              followUpSuggestions={followUpSuggestions}
              isLoadingFollowUps={isLoadingFollowUps}
            />
            
            <div className={styles.chatInputWrapper}>
              <div className={styles.chatInputContainer}>
                <ChatInput 
                  onSendMessage={sendMessage} 
                  disabled={isInputDisabled}
                />
                
                {/* Show the suggestions container even when loading */}
                {(followUpSuggestions.length > 0 || isLoadingFollowUps) && messages.length > 0 && 
                  messages[messages.length - 1].sender === 'assistant' && (
                  <div className={styles.suggestionsContainer}>
                    <p className={styles.suggestionsHeading}>
                      {isLoadingFollowUps ? "Thinking of follow-up questions..." : "You might want to ask:"}
                    </p>
                    
                    {!isLoadingFollowUps && followUpSuggestions.length > 0 && (
                      <SuggestionBubbles
                        suggestions={followUpSuggestions}
                        onSuggestionClick={sendMessage}
                      />
                    )}
                    
                    {isLoadingFollowUps && (
                      <div className={styles.suggestionsLoading}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                      </div>
                    )}
                  </div>
                )}
                
                {messages.length > 0 && (
                  <div className={styles.resetButton}>
                    <button onClick={resetChat}>
                      Reset conversation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const Landing = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
  // Check if we're on mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/widget-showcase" className={styles.showcaseLink}>
            View Widget Showcase
          </Link>
        </div>
      </header>
      
      <div className={styles.mainContent}>
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        
        <div className={styles.container}>
          <ChatProvider initialProductName={productData.name}>
            <ChatSection />
          </ChatProvider>
        </div>
      </div>
    </div>
  );
};

export default Landing;
