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
    sendMessage,
    resetChat
  } = useGlobalChat();

  return (
    <>
      <div className={styles.chatSection}>
        <ChatInterface 
          product={productData} 
          messages={messages}  
          followUpSuggestions={followUpSuggestions}
          onSuggestionClick={sendMessage}
          onReset={resetChat}
        />
      </div>
      
      <div className={styles.chatInputWrapper}>
        <div className={styles.chatInputContainer}>
          <ChatInput onSendMessage={sendMessage} />
          
          {followUpSuggestions.length > 0 && (
            <SuggestionBubbles
              suggestions={followUpSuggestions}
              onSuggestionClick={sendMessage}
            />
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
