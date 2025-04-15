import { useState, useEffect, useCallback } from 'react';
import { sendChatMessage, getFollowUpQuestions } from '../api/chatService';
import { ChatMessage, ChatHistoryItem } from '../types/chat';

interface ChatOptions {
  productId?: string;
  productName?: string; // Keep for backward compatibility
  onSend?: (message: string) => void;
  onError?: (error: Error) => void;
}

export function useChat({ productId = '', productName = 'default', onSend, onError }: ChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [followUpSuggestions, setFollowUpSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFollowUps, setIsLoadingFollowUps] = useState(false);
  
  const resetChat = useCallback(() => {
    setMessages([]);
    setFollowUpSuggestions([]);
  }, []);
  
  // Fetch follow-up questions for the latest exchange
  const fetchFollowUpQuestions = useCallback(async () => {
    console.log("Attempting to fetch follow-up questions...");
    if (messages.length < 2) {
      console.log("Not enough messages to fetch follow-ups");
      return;
    }
    
    // Get the last user query and assistant response
    const lastUserMessage = [...messages].reverse().find(m => m.sender === 'user');
    const lastAssistantMessage = [...messages].reverse().find(m => m.sender === 'assistant');
    
    if (!lastUserMessage || !lastAssistantMessage) {
      console.log("Missing user or assistant message");
      return;
    }
    
    console.log("Fetching follow-ups for:", {
      userMessage: lastUserMessage.text,
      assistantMessage: lastAssistantMessage.text
    });
    
    // Format history excluding the last exchange
    const historyWithoutLast = messages.slice(0, -2).map(msg => ({
      content: msg.text,
      role: msg.sender
    }));
    
    setIsLoadingFollowUps(true);
    
    try {
      const followUps = await getFollowUpQuestions(
        lastUserMessage.text,
        lastAssistantMessage.text,
        historyWithoutLast,
        productId // Send productId here instead of productName
      );
      
      setFollowUpSuggestions(followUps);
    } catch (error) {
      console.error('Error fetching follow-up questions:', error);
    } finally {
      setIsLoadingFollowUps(false);
    }
  }, [messages, productId]); // Update dependency to productId
  
  // Trigger follow-up questions fetch when a new assistant message is added
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    console.log("Last message changed:", lastMessage);
    if (lastMessage?.sender === 'assistant') {
      console.log("Triggering follow-up question fetch");
      fetchFollowUpQuestions();
    }
  }, [messages, fetchFollowUpQuestions]);
  
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
      const formattedHistory: ChatHistoryItem[] = messages.map(msg => ({
        content: msg.text,
        role: msg.sender
      }));
      
      // Call API using the service - now with productId instead of productName
      const response = await sendChatMessage(
        text, 
        productId, // Send productId as primary identifier
        formattedHistory,
        productName // Still send productName as fallback for backward compatibility
      );
      
      if (response.success && response.response) {
        // Add assistant response
        setMessages(prev => [...prev, {
          text: response.response,
          sender: 'assistant'
        }]);
      } else {
        throw new Error(response.message || 'Failed to get response');
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
  }, [messages, onSend, onError, productId, productName]);
  
  return {
    messages,
    followUpSuggestions,
    isLoading,
    isLoadingFollowUps,
    sendMessage,
    resetChat,
    generateFollowUps: fetchFollowUpQuestions
  };
} 