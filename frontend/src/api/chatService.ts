import apiClient from './apiClient';
import { ChatHistoryItem, ChatResponse } from '../types/chat';

export async function sendChatMessage(
  query: string,
  productName: string = 'default',
  conversationHistory: ChatHistoryItem[] = []
): Promise<ChatResponse> {
  try {
    const response = await apiClient.post('/chat/process', {
      query,
      productName,
      conversationHistory
    });
    
    return response.data;
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error;
  }
}

export async function getProductChats(productId: string) {
  try {
    const response = await apiClient.get(`/products/${productId}/chats`);
    return response.data;
  } catch (error) {
    console.error('Get Product Chats Error:', error);
    throw error;
  }
}

export async function getChatHistory(chatId: string) {
  try {
    const response = await apiClient.get(`/chats/${chatId}/history`);
    return response.data;
  } catch (error) {
    console.error('Get Chat History Error:', error);
    throw error;
  }
} 