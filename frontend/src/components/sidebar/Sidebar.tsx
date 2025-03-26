import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPlus, FaList, FaQuestionCircle, FaSearch } from 'react-icons/fa';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

interface ProductChat {
  id: string;
  productName: string;
  conversations: {
    id: string;
    title: string;
  }[];
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(isOpen || false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock product chats data
  const productChats: ProductChat[] = [
    { 
      id: '1', 
      productName: 'Casio Casiotone CT-s300',
      conversations: [
        { id: '1-1', title: 'Help with configuration' },
        { id: '1-2', title: 'Battery time' }
      ]
    },
    { 
      id: '2', 
      productName: 'HP Pavillion E62ND 16"',
      conversations: [
        { id: '2-1', title: 'Resetting windows on laptop' },
        { id: '2-2', title: 'Battery problems covered by waranty' }
      ]
    }
  ];
  
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
  
  // Update internal state when prop changes
  useEffect(() => {
    if (isOpen !== undefined) {
      setSidebarOpen(isOpen);
    }
  }, [isOpen]);
  
  const handleToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    if (onToggle) {
      onToggle();
    }
  };
  
  const handleNewChat = () => {
    console.log('New chat clicked');
    // Implement new chat functionality
  };
  
  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button 
          className={styles.menuButton} 
          onClick={handleToggle}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}
      
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${sidebarOpen || !isMobile ? styles.open : styles.closed}`}>
        <div className={styles.sidebarContent}>
          <h2 className={styles.sidebarTitle}>My chats</h2>
          
          {/* Product Chats Section */}
          <div className={styles.productChatsSection}>
            {productChats.map(product => (
              <div key={product.id} className={styles.productGroup}>
                <div className={styles.productHeader}>
                  <span className={styles.productName}>{product.productName}</span>
                  <button className={styles.addButton}>
                    <FaPlus />
                  </button>
                </div>
                <ul className={styles.conversationList}>
                  {product.conversations.map(conversation => (
                    <li key={conversation.id}>
                      <a href="#" className={styles.conversationLink}>
                        {conversation.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* New Chat Section */}
          <div className={styles.newChatSection}>
            <h3 className={styles.newChatTitle}>New chat</h3>
            <div className={styles.searchInputContainer}>
              <input
                type="text"
                placeholder="What product do you need help with?"
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Bottom Navigation */}
          <div className={styles.bottomNav}>
            <a href="#" className={styles.bottomNavLink}>
              <FaQuestionCircle />
              <span>Help</span>
            </a>
          </div>
        </div>
        
        {isMobile && (
          <button 
            className={styles.closeButton} 
            onClick={handleToggle}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        )}
      </div>
      
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div className={styles.overlay} onClick={handleToggle} />
      )}
    </>
  );
}; 