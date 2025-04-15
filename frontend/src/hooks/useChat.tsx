export const useChat = ({ productName, onSend, onError }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followUpSuggestions, setFollowUpSuggestions] = useState<string[]>([]);
  const [isLoadingFollowUps, setIsLoadingFollowUps] = useState(false);
  
  // Send a message and get response
  const sendMessage = async (text: string) => {
    setIsLoading(true);
    
    try {
      // Add user message
      const newMessages = [...messages, { sender: 'user', text }];
      setMessages(newMessages);
      
      // Send to API and get response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: newMessages,
          productName
        })
      });
      
      const data = await response.json();
      
      // Add AI response to messages
      setMessages([...newMessages, { sender: 'assistant', text: data.message }]);
      
      // After receiving AI response, we should generate follow-ups
      // But this might not be happening!
      
      if (onSend) onSend(text);
    } catch (error) {
      console.error('Error sending message:', error);
      if (onError) onError(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generate follow-up suggestions based on current conversation
  const generateFollowUps = async () => {
    console.log("Starting to generate follow-up suggestions");
    // Don't generate follow-ups if there are no messages
    if (messages.length === 0) return;
    
    setIsLoadingFollowUps(true);
    
    try {
      const response = await fetch('/api/follow-ups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages,
          productName
        })
      });
      
      const data = await response.json();
      console.log("Follow-up data received:", data);
      
      if (data.suggestions && Array.isArray(data.suggestions)) {
        setFollowUpSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error('Error generating follow-ups:', error);
      setFollowUpSuggestions([]);
    } finally {
      setIsLoadingFollowUps(false);
    }
  };
  
  // Reset everything
  const resetChat = () => {
    setMessages([]);
    setFollowUpSuggestions([]);
  };
  
  return {
    messages,
    followUpSuggestions,
    isLoading,
    isLoadingFollowUps,
    sendMessage,
    resetChat,
    generateFollowUps  // Export this function
  };
}; 