import { useState, useCallback } from 'react';
import { ChatWidgetSettings } from '../types/chat';

interface UseWidgetSettingsProps {
  initialSettings: ChatWidgetSettings;
  onApply: (settings: ChatWidgetSettings) => void;
}

export function useWidgetSettings({ initialSettings, onApply }: UseWidgetSettingsProps) {
  // Form state for all settings
  const [newHeaderTitle, setNewHeaderTitle] = useState(initialSettings.headerTitle);
  const [newHeaderColor, setNewHeaderColor] = useState(initialSettings.headerColor);
  const [newProductName, setNewProductName] = useState(initialSettings.productName);
  const [newProductImage, setNewProductImage] = useState(initialSettings.productImage);
  const [newSendButtonColor, setNewSendButtonColor] = useState(initialSettings.sendButtonColor);
  const [newUserMessageColor, setNewUserMessageColor] = useState(initialSettings.userMessageColor);
  const [newUserMessageTextColor, setNewUserMessageTextColor] = useState(initialSettings.userMessageTextColor);
  const [newBackgroundImage, setNewBackgroundImage] = useState<string | undefined>(initialSettings.backgroundImage);
  
  // Tab state for organizing settings
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'advanced'>('general');
  
  // Handle file uploads for images
  const handleProductImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewProductImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);
  
  const handleBackgroundImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewBackgroundImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);
  
  const removeBackgroundImage = useCallback(() => {
    setNewBackgroundImage(undefined);
  }, []);
  
  // Apply settings
  const handleApply = useCallback(() => {
    const newSettings: ChatWidgetSettings = {
      headerTitle: newHeaderTitle,
      headerColor: newHeaderColor,
      productName: newProductName,
      productImage: newProductImage,
      sendButtonColor: newSendButtonColor,
      userMessageColor: newUserMessageColor,
      userMessageTextColor: newUserMessageTextColor,
      backgroundImage: newBackgroundImage
    };
    
    onApply(newSettings);
  }, [
    newHeaderTitle,
    newHeaderColor,
    newProductName,
    newProductImage,
    newSendButtonColor,
    newUserMessageColor,
    newUserMessageTextColor,
    newBackgroundImage,
    onApply
  ]);
  
  return {
    // State
    newHeaderTitle,
    newHeaderColor,
    newProductName,
    newProductImage,
    newSendButtonColor,
    newUserMessageColor,
    newUserMessageTextColor,
    newBackgroundImage,
    activeTab,
    
    // State setters
    setNewHeaderTitle,
    setNewHeaderColor,
    setNewProductName,
    setNewProductImage,
    setNewSendButtonColor,
    setNewUserMessageColor,
    setNewUserMessageTextColor,
    setNewBackgroundImage,
    setActiveTab,
    
    // Action handlers
    handleProductImageUpload,
    handleBackgroundImageUpload,
    removeBackgroundImage,
    handleApply
  };
} 