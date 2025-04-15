import { useState } from 'react';
import { ChatWidget } from '../components/widget/ChatWidget';
import { WidgetSettings } from '../components/widget/WidgetSettings';
import { Button } from '../components/common/Button';
import { ChatProvider } from '../context/ChatContext';
import styles from './WidgetShowcase.module.scss';
import placeholderImage from "../assets/images/placeholder.png";
import { FaCog } from 'react-icons/fa';
import { ChatWidgetSettings } from '../types/chat';
import { Product } from '../types/product';

const WidgetShowcase = () => {
  const [showSettings, setShowSettings] = useState(false);
  
  // Widget settings state
  const [settings, setSettings] = useState<ChatWidgetSettings>({
    headerTitle: "Chat",
    headerColor: "#333333", // Dark gray header
    productName: "AI Product Support Bot",
    productImage: placeholderImage,
    sendButtonColor: "#333333", // Gray send button
    userMessageColor: "#0078d7", // Blue user message bubbles
    userMessageTextColor: "#ffffff", // White text for user messages
    backgroundImage: undefined
  });
  
  // Background style
  const backgroundStyle = settings.backgroundImage ? {
    backgroundImage: `url(${settings.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {
    backgroundColor: '#ffffff'
  };
  
  // Mock product data
  const productData = {
    name: settings.productName,
    image: settings.productImage
  };
  
  // Custom initial suggestions
  const customSuggestions = [
    "Is it easy to integrate?",
    "What if AI doesnt know the answer?",
    "What data do we get?"
  ];
  
  // Custom message handler
  const handleSendMessage = (message: string) => {
    console.log("Message sent:", message);
    // In a real app, you would send this to your API
  };
  
  const handleSettingsApply = (newSettings: ChatWidgetSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
  };
  
  // For testing: set initialProduct to null to show the product selector first
  const [testProduct, setTestProduct] = useState<Product | null>(null);
  
  // Optional: Add a button to clear the product selection for testing
  const handleClearProduct = () => {
    setTestProduct(null);
  };
  
  return (
    <div className={styles.showcasePage} style={backgroundStyle}>
      <div className={styles.controls}>
        {/* Settings button */}
        <Button 
          className={styles.settingsButton} 
          onClick={() => setShowSettings(true)}
          aria-label="Showcase settings"
          variant="text"
          icon={<FaCog />}
        />
        
        {/* Add a button to clear product selection (for testing) */}
        {testProduct && (
          <Button 
            onClick={handleClearProduct}
            variant="outline"
            size="small"
          >
            Clear Product
          </Button>
        )}
      </div>
      
      <main className={styles.mainContent}>
        {/* Empty main content for clean background */}
      </main>
      
      {/* Pass initialProduct as null to start with product selection */}
      <ChatProvider 
        initialProductName={settings.productName} 
        initialProduct={testProduct} 
        onSend={handleSendMessage}
      >
        <ChatWidget
          initialOpen={true}
          buttonText="Need help?"
          headerTitle={settings.headerTitle}
          headerColor={settings.headerColor}
          sendButtonColor={settings.sendButtonColor}
          userMessageColor={settings.userMessageColor}
          userMessageTextColor={settings.userMessageTextColor}
          onOpen={() => console.log('Widget opened')}
          onClose={() => console.log('Widget closed')}
          onReset={() => console.log('Chat reset')}
        />
      </ChatProvider>
      
      {/* Settings panel */}
      {showSettings && (
        <WidgetSettings
          headerTitle={settings.headerTitle}
          headerColor={settings.headerColor}
          productName={settings.productName}
          productImage={settings.productImage}
          sendButtonColor={settings.sendButtonColor}
          userMessageColor={settings.userMessageColor}
          userMessageTextColor={settings.userMessageTextColor}
          backgroundImage={settings.backgroundImage}
          onApply={handleSettingsApply}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default WidgetShowcase;
