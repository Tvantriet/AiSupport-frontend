import apiClient from './apiClient';
import { ChatHistoryItem, ChatResponse } from '../types/chat';

export async function sendChatMessage(
  query: string,
  productId: string = '',
  conversationHistory: ChatHistoryItem[] = [],
  productName: string = 'default' // Keep for backward compatibility
): Promise<ChatResponse> {
  try {
    const response = await apiClient.post('/chat/process', {
      query,
      productId, // Send product ID primarily
      productName, // Keep sending name for backward compatibility
      conversationHistory
    });
    
    // Transform the response if needed to ensure consistent structure
    const result: ChatResponse = {
      ...response.data,
      // If followUpQuestions doesn't exist, use an empty array
      followUpQuestions: response.data.followUpQuestions || []
    };
    
    return result;
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

export async function getFollowUpQuestions(
  query: string,
  response: string,
  conversationHistory: ChatHistoryItem[] = [],
  productId: string = ''
): Promise<string[]> {
  try {
    console.log("Fetching follow-up questions...");
    
    const resp = await apiClient.post('/chat/follow-up-questions', {
      query,
      response,
      conversationHistory,
      productId
    });
    
    console.log("Follow-up questions response:", resp.data);
    
    // Handle the case where followUpQuestions is an object with a question property
    if (resp.data.followUpQuestions && resp.data.followUpQuestions.question) {
      console.log("Found question in object format:", resp.data.followUpQuestions.question);
      return [resp.data.followUpQuestions.question];
    }
    
    // Handle array format
    if (Array.isArray(resp.data.followUpQuestions)) {
      return resp.data.followUpQuestions;
    }
    
    // Handle object format with multiple questions
    if (resp.data.followUpQuestions && typeof resp.data.followUpQuestions === 'object') {
      const questions = Object.values(resp.data.followUpQuestions)
        .filter(q => q && typeof q === 'string')
        .map(q => q.toString());
      
      if (questions.length > 0) {
        console.log("Extracted questions from object:", questions);
        return questions;
      }
    }
    
    // Check alternative property names
    if (Array.isArray(resp.data.suggestions)) {
      return resp.data.suggestions;
    }
    
    // If we find no array but have a string, wrap it in an array
    if (typeof resp.data.followUpQuestions === 'string') {
      return [resp.data.followUpQuestions];
    }
    
    console.warn("No follow-up questions found in response:", resp.data);
    return [];
  } catch (error) {
    console.error('Error getting follow-up questions:', error);
    return [];
  }
} 