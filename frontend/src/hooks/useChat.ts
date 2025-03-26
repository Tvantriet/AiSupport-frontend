import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'assistant';
}

interface ChatOptions {
  productName?: string;
  onSend?: (message: string) => void;
  onError?: (error: Error) => void;
}

export function useChat({ productName = 'default', onSend, onError }: ChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [followUpSuggestions, setFollowUpSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const resetChat = useCallback(() => {
    setMessages([]);
    setFollowUpSuggestions([]);
  }, []);
  
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message immediately
    const newMessage: ChatMessage = { text, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);
    
    // Call onSend callback if provided
    if (onSend) onSend(text);
    
    // Clear suggestions until bot responds
    setFollowUpSuggestions([]);
    
    try {
      // Format history for API
      const formattedHistory = messages.map(msg => ({
        content: msg.text,
        role: msg.sender
      }));
      
      // Call API
      const response = await axios.post('http://localhost:3000/api/chat/process', {
        query: text,
        productName,
        conversationHistory: formattedHistory
      });
      
      if (response.data && response.data.response) {
        // Add assistant response
        setMessages(prev => [...prev, {
          text: response.data.response,
          sender: 'assistant'
        }]);
        
        // Set follow-up suggestions if available
        if (response.data.suggestions && response.data.suggestions.length > 0) {
          setFollowUpSuggestions(response.data.suggestions);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble connecting to the server right now. Please try again later.",
        sender: 'assistant'
      }]);
      
      if (onError && error instanceof Error) onError(error);
    } finally {
      setIsLoading(false);
    }
  }, [messages, onSend, onError, productName]);
  
  return {
    messages,
    followUpSuggestions,
    isLoading,
    sendMessage,
    resetChat
  };
} 