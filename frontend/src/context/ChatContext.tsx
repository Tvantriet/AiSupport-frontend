import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { useChat } from '../hooks/useChat';
import { ChatMessage } from '../types/chat';
import { Product } from '../types/product';

// Define the shape of our context
interface ChatContextType {
  messages: ChatMessage[];
  followUpSuggestions: string[];
  isLoading: boolean;
  isLoadingFollowUps: boolean;
  sendMessage: (text: string) => Promise<void>;
  resetChat: () => void;
  
  // Add product-related properties
  currentProduct: Product | null;
  selectProduct: (product: Product) => void;
  clearProduct: () => void;
  
  // Keep existing properties for backward compatibility
  productName?: string;
  setProductName: (name: string) => void;
}

// Create context with default values
const ChatContext = createContext<ChatContextType>({
  messages: [],
  followUpSuggestions: [],
  isLoading: false,
  isLoadingFollowUps: false,
  sendMessage: async () => {},
  resetChat: () => {},
  
  // Add product-related defaults
  currentProduct: null,
  selectProduct: () => {},
  clearProduct: () => {},
  
  // Keep existing properties
  setProductName: () => {},
});

interface ChatProviderProps {
  children: ReactNode;
  initialProductName?: string;
  initialProduct?: Product | null;
  onSend?: (message: string) => void;
  onError?: (error: Error) => void;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({
  children,
  initialProductName = 'default',
  initialProduct = null,
  onSend,
  onError,
}) => {
  // Keep original state for backward compatibility
  const [productName, setProductName] = useState(initialProductName);
  
  // Add new product state
  const [currentProduct, setCurrentProduct] = useState<Product | null>(initialProduct);

  // Get the chat hook
  const {
    messages,
    followUpSuggestions,
    isLoading,
    isLoadingFollowUps,
    sendMessage: sendChatMessage,
    resetChat,
    generateFollowUps,
  } = useChat({
    // Send both the ID and name (ID takes precedence)
    productId: currentProduct?.id || '',
    productName: currentProduct?.name || productName,
    onSend,
    onError,
  });

  // Wrap sendMessage to prevent sending if no product is selected
  const sendMessage = useCallback(
    async (text: string) => {
      // Only allow sending if there's a selected product
      if (currentProduct || productName !== 'default') {
        await sendChatMessage(text);
        
        // After message is sent and response received, generate follow-ups
        console.log("Message sent, generating follow-ups");
        generateFollowUps();
      } else {
        console.warn('Cannot send message: No product selected');
      }
    },
    [currentProduct, productName, sendChatMessage, generateFollowUps]
  );

  // Handler for selecting a product
  const selectProduct = useCallback(
    (product: Product) => {
      console.log('Selecting product:', product);
      
      // Update product name for backward compatibility
      setProductName(product.name);
      
      // Set the current product
      setCurrentProduct(product);
      
      // Optionally, reset chat when switching products
      resetChat();
    },
    [resetChat]
  );

  // Handler for clearing the selected product
  const clearProduct = useCallback(() => {
    console.log('Clearing selected product');
    
    // Set product name back to default
    setProductName('default');
    
    // Clear the current product
    setCurrentProduct(null);
    
    // Reset chat when clearing product
    resetChat();
  }, [resetChat]);

  // Create the context value object
  const contextValue: ChatContextType = {
    messages,
    followUpSuggestions,
    isLoading,
    isLoadingFollowUps,
    sendMessage,
    resetChat,
    
    // Add product-related values
    currentProduct,
    selectProduct,
    clearProduct,
    
    // Keep existing values
    productName,
    setProductName,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook for consuming the context
export const useGlobalChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useGlobalChat must be used within a ChatProvider');
  }
  return context;
}; 