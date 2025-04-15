import React from 'react';
import { useGlobalChat } from '../../context/ChatContext';
import { ProductSelector } from '../product/ProductSelector';
import { ChatWidgetBody } from './ChatWidgetBody';
import { ChatWidgetFooter } from './ChatWidgetFooter';
import { ChatWidgetHeader } from './ChatWidgetHeader';
import styles from './ChatWidget.module.scss'; // Reuse existing styles

// Define props that ChatWidgetContent needs to pass down
interface ChatWidgetContentProps {
  emptyStateText: string;
  initialSuggestions: string[];
  customEmptyState?: React.ReactNode;
  customFooter?: React.ReactNode;
  customHeader?: React.ReactNode;
  headerTitle: string;
  headerColor?: string;
  bodyClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  sendButtonColor?: string;
  userMessageColor?: string;
  userMessageTextColor?: string;
  handleSuggestionClick: (suggestion: string) => void; // Pass down handler
  handleReset: () => void; // Pass down handler
  toggleWidget: () => void; // Add this prop
}

export const ChatWidgetContent: React.FC<ChatWidgetContentProps> = ({
  emptyStateText,
  initialSuggestions,
  customEmptyState,
  customHeader,
  customFooter,
  headerTitle,
  headerColor,
  bodyClassName,
  headerClassName,
  footerClassName,
  sendButtonColor,
  userMessageColor,
  userMessageTextColor,
  handleSuggestionClick,
  handleReset,
  toggleWidget, // Add this prop
}) => {
  const {
    currentProduct,
    selectProduct,
    messages,
    isLoading,
    isLoadingFollowUps,
    sendMessage,
    followUpSuggestions,
  } = useGlobalChat();

  // If we need to render the header separately for the product selector
  const renderHeader = () => (
    <ChatWidgetHeader
      customHeader={customHeader}
      headerTitle={currentProduct ? currentProduct.name : headerTitle}
      headerColor={headerColor}
      headerClassName={headerClassName}
      toggleWidget={toggleWidget} // Pass the prop here
    />
  );

  if (!currentProduct) {
    // If no product is selected, show the selector with header
    return (
      <>
        {renderHeader()}
        <div className={`${styles.widgetBody} ${bodyClassName || ''} ${styles.productSelectorWrapper}`}>
          <ProductSelector onProductSelect={selectProduct} />
        </div>
      </>
    );
  }

  // If a product is selected, show the chat body and footer
  return (
    <>
      {renderHeader()}
      <ChatWidgetBody
        messages={messages}
        product={currentProduct}
        emptyStateText={emptyStateText}
        initialSuggestions={initialSuggestions}
        customEmptyState={customEmptyState}
        bodyClassName={bodyClassName}
        userMessageColor={userMessageColor}
        userMessageTextColor={userMessageTextColor}
        handleSuggestionClick={handleSuggestionClick}
        isLoading={isLoading}
      />
      <ChatWidgetFooter
        customFooter={customFooter}
        handleSendMessage={sendMessage}
        followUpSuggestions={followUpSuggestions}
        handleSuggestionClick={handleSuggestionClick}
        sendButtonColor={sendButtonColor}
        footerClassName={footerClassName}
        messagesExist={messages.length > 0}
        isLoading={isLoading}
        isLoadingFollowUps={isLoadingFollowUps}
        resetChat={handleReset}
      />
    </>
  );
}; 