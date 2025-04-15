export interface ChatMessage {
  text: string;
  sender: 'user' | 'assistant';
}

export interface ChatResponse {
  response: string;
  followUpQuestions?: string[];
  success: boolean;
  message?: string;
}

export interface ChatHistoryItem {
  content: string;
  role: 'user' | 'assistant';
}

export interface ChatWidgetSettings {
  headerTitle: string;
  headerColor: string;
  productName: string; 
  productImage: string;
  sendButtonColor: string;
  userMessageColor: string;
  userMessageTextColor: string;
  backgroundImage?: string;
} 