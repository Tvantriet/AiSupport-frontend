import { useState, useEffect } from "react";
import { ChatContainer } from "./ChatContainer";
import { ChatInput } from "./ChatInput";
import { SuggestionBubbles } from "./SuggestionBubbles";
import styles from "./ChatInterface.module.scss";

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'bot'}>>([]);
  const [followUpSuggestions, setFollowUpSuggestions] = useState<string[]>([]);
  
  // Initial suggestions (would come from backend in the future)
  const initialSuggestions = [
    "How do I connect the keyboard to MIDI?", 
    "What are the key features?",
    "Is this compatible with my DAW software?"
  ];
  
  // Initial question and answer for demo
  useEffect(() => {
    // Uncomment this to show an initial question and answer
    // setMessages([
    //   {text: "does the piano use MIDI???", sender: 'user' as const},
    //   {text: "Yes, the Casio Casiotone CT-S300 supports MIDI. It has a USB (to host) terminal, which allows it to be used as a MIDI keyboard when connected to a computer via a USB cable.", sender: 'bot' as const}
    // ]);
  }, []);
  
  const handleSendMessage = (text: string) => {
    // Add user message
    const newMessages = [...messages, {text, sender: 'user' as const}];
    setMessages(newMessages);
    
    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      let response = "";
      let newSuggestions: string[] = [];
      
      if (text.toLowerCase().includes("midi")) {
        response = "Yes, the Casio Casiotone CT-S300 supports MIDI. It has a USB (to host) terminal, which allows it to be used as a MIDI keyboard when connected to a computer via a USB cable.";
        newSuggestions = [
          "How do I connect the keyboard to my computer?",
          "Which MIDI apps work best with this keyboard?",
          "Can I use this with a DAW?"
        ];
      } else if (text.toLowerCase().includes("feature")) {
        response = "The key features include 61 full-size keys, 400 tones, 77 rhythms, and USB connectivity for MIDI. It's also portable with battery power option.";
        newSuggestions = [
          "How long does the battery last?",
          "Can I connect external speakers?",
          "Does it have weighted keys?"
        ];
      } else if (text.toLowerCase().includes("troubleshoot")) {
        response = "For troubleshooting, first check all connections are secure. If you're having MIDI issues, ensure your drivers are up to date. For more specific help, please describe the exact issue you're experiencing.";
        newSuggestions = [
          "My keyboard isn't recognized by my computer",
          "The sound is distorted",
          "Some keys aren't working"
        ];
      } else if (text.toLowerCase().includes("configuration")) {
        response = "To configure your keyboard, connect it to your computer via USB. You can then use the Casio Music App to customize settings, or connect directly to your DAW software.";
        newSuggestions = [
          "Where can I download the Casio Music App?",
          "How do I change instrument sounds?",
          "Can I save custom settings?"
        ];
      } else if (text.toLowerCase().includes("general")) {
        response = "I can answer questions about specifications, compatibility, features, and usage of the Casio Casiotone CT-S300. What would you like to know?";
        newSuggestions = [
          "What's the warranty period?",
          "Does it come with a stand?",
          "How much does it weigh?"
        ];
      } else {
        response = `Thanks for asking about "${text}". This is a simulated response that would come from your actual backend or AI service.`;
        newSuggestions = [
          "Tell me about the sound quality",
          "Is there a headphone jack?",
          "Can I use this for live performances?"
        ];
      }
      
      const botResponse = {
        text: response,
        sender: 'bot' as const
      };
      setMessages(prev => [...prev, botResponse]);
      
      // Update follow-up suggestions based on the response
      setFollowUpSuggestions(newSuggestions);
    }, 1000);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };
  
  const resetChat = () => {
    setMessages([]);
    setFollowUpSuggestions([]);
  };

  return (
    <div className={styles.chatInterface}>
      <ChatContainer 
        messages={messages} 
        onSuggestionClick={handleSuggestionClick}
        initialSuggestions={initialSuggestions}
      />
      <div className={styles.chatInputContainer}>
        <ChatInput onSendMessage={handleSendMessage} />
        
        <div className={styles.bottomSection}>
          {messages.length > 0 && (
            <div className={styles.resetButton}>
              <button onClick={resetChat}>
                Reset conversation
              </button>
            </div>
          )}
          
          {/* Show follow-up suggestions only after conversation has started */}
          {followUpSuggestions.length > 0 && (
            <SuggestionBubbles 
              suggestions={followUpSuggestions} 
              onSuggestionClick={handleSuggestionClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}; 