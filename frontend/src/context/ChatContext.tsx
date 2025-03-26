import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useChat, ChatMessage } from '../hooks/useChat';

// Define the shape of our context
interface ChatContextType {
  messages: ChatMessage[];
  followUpSuggestions: string[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
  resetChat: () => void;
  productName?: string;
  setProductName: (name: string) => void;
}

// Create context with default values
const ChatContext = createContext<ChatContextType>({
  messages: [],
  followUpSuggestions: [],
  isLoading: false,
  sendMessage: async () => {},
  resetChat: () => {},
  setProductName: () => {}
});

interface ChatProviderProps {
  children: ReactNode;
  initialProductName?: string;
  onSend?: (message: string) => void;
  onError?: (error: Error) => void;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ 
  children, 
  initialProductName = 'default',
  onSend,
  onError
}) => {
  const [productName, setProductName] = useState(initialProductName);
  
  const { 
    messages, 
    followUpSuggestions, 
    isLoading, 
    sendMessage, 
    resetChat 
  } = useChat({
    productName,
    onSend,
    onError
  });
  
  // Create the context value object
  const contextValue: ChatContextType = {
    messages,
    followUpSuggestions,
    isLoading,
    sendMessage,
    resetChat,
    productName,
    setProductName
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