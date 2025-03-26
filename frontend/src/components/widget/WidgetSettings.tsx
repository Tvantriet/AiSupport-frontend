import { FC, useRef } from 'react';
import { FaUpload } from 'react-icons/fa';
import styles from './WidgetSettings.module.scss';
import { useWidgetSettings } from '../../hooks/useWidgetSettings';
import { ChatWidgetSettings } from '../../types/chat';

interface WidgetSettingsProps extends ChatWidgetSettings {
  onApply: (settings: ChatWidgetSettings) => void;
  onClose: () => void;
}

export const WidgetSettings: FC<WidgetSettingsProps> = ({ 
  headerTitle,
  headerColor,
  productName,
  productImage,
  sendButtonColor,
  userMessageColor,
  userMessageTextColor,
  backgroundImage,
  onApply,
  onClose
}) => {
  const initialSettings: ChatWidgetSettings = {
    headerTitle,
    headerColor,
    productName,
    productImage,
    sendButtonColor,
    userMessageColor,
    userMessageTextColor,
    backgroundImage
  };
  
  const {
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
    setNewSendButtonColor,
    setNewUserMessageColor,
    setNewUserMessageTextColor,
    setActiveTab,
    
    // Action handlers
    handleProductImageUpload,
    handleBackgroundImageUpload,
    removeBackgroundImage,
    handleApply
  } = useWidgetSettings({ initialSettings, onApply });
  
  // Refs for file inputs
  const productImageInputRef = useRef<HTMLInputElement>(null);
  const backgroundImageInputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div className={styles.settingsOverlay}>
      <div className={styles.settingsPanel}>
        <h2>Widget Settings</h2>
        <p>Customize the appearance and behavior of the chat widget</p>
        
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'general' ? styles.active : ''}`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'appearance' ? styles.active : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              Appearance
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'advanced' ? styles.active : ''}`}
              onClick={() => setActiveTab('advanced')}
            >
              Advanced
            </button>
          </div>
          
          {activeTab === 'general' && (
            <div className={styles.tabContent}>
              <div className={styles.formGroup}>
                <label>Header title</label>
                <input 
                  type="text" 
                  value={newHeaderTitle} 
                  onChange={(e) => setNewHeaderTitle(e.target.value)}
                  placeholder="Chat"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Product name</label>
                <input 
                  type="text" 
                  value={newProductName} 
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="AI Product Support Bot"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Product image</label>
                <div className={styles.imageUpload}>
                  <div className={styles.previewImage}>
                    <img src={newProductImage} alt="Product" />
                  </div>
                  <input
                    type="file"
                    ref={productImageInputRef}
                    onChange={handleProductImageUpload}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <button 
                    className={styles.uploadButton}
                    onClick={() => productImageInputRef.current?.click()}
                  >
                    <FaUpload />
                    <span>Upload image</span>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div className={styles.tabContent}>
              <div className={styles.formGroup}>
                <label>Header color</label>
                <div className={styles.colorInput}>
                  <input 
                    type="color" 
                    value={newHeaderColor} 
                    onChange={(e) => setNewHeaderColor(e.target.value)}
                  />
                  <input 
                    type="text" 
                    value={newHeaderColor} 
                    onChange={(e) => setNewHeaderColor(e.target.value)}
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Send button color</label>
                <div className={styles.colorInput}>
                  <input 
                    type="color" 
                    value={newSendButtonColor} 
                    onChange={(e) => setNewSendButtonColor(e.target.value)}
                  />
                  <input 
                    type="text" 
                    value={newSendButtonColor} 
                    onChange={(e) => setNewSendButtonColor(e.target.value)}
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>User message color</label>
                <div className={styles.colorInput}>
                  <input 
                    type="color" 
                    value={newUserMessageColor} 
                    onChange={(e) => setNewUserMessageColor(e.target.value)}
                  />
                  <input 
                    type="text" 
                    value={newUserMessageColor} 
                    onChange={(e) => setNewUserMessageColor(e.target.value)}
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>User message text color</label>
                <div className={styles.colorInput}>
                  <input 
                    type="color" 
                    value={newUserMessageTextColor} 
                    onChange={(e) => setNewUserMessageTextColor(e.target.value)}
                  />
                  <input 
                    type="text" 
                    value={newUserMessageTextColor} 
                    onChange={(e) => setNewUserMessageTextColor(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'advanced' && (
            <div className={styles.tabContent}>
              <div className={styles.formGroup}>
                <label>Background image</label>
                <div className={styles.imageUpload}>
                  {newBackgroundImage ? (
                    <div className={styles.previewImage}>
                      <img src={newBackgroundImage} alt="Background" />
                      <button 
                        className={styles.removeButton}
                        onClick={removeBackgroundImage}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className={styles.noImage}>
                        No background image selected
                      </div>
                      <input
                        type="file"
                        ref={backgroundImageInputRef}
                        onChange={handleBackgroundImageUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                      <button 
                        className={styles.uploadButton}
                        onClick={() => backgroundImageInputRef.current?.click()}
                      >
                        <FaUpload />
                        <span>Upload image</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.buttons}>
          <button
            className={styles.applyButton} 
            onClick={handleApply}
          >
            Apply
          </button>
          <button 
            className={styles.closeButton}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}; 