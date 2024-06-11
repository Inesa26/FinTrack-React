import axios from 'axios';
import { TransactionType } from '../interfaces/TransactionType';

const BASE_URL = 'https://localhost:7049/api/category';

export interface CreateCategoryCommand {
    title: string;
    iconId: number;
    type: TransactionType;
  }
  

export interface CreateCategoryDto {
  id: number;
  title: string;
  iconId: number;
}

export const createCategory = async (command: CreateCategoryCommand) => {
  console.log('Sending data:', command); 
  try {
      const response = await axios.post(BASE_URL, command, {
          headers: {
              Authorization: `Bearer ${localStorage.token}`,
              'Content-Type': 'application/json',
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error creating category:', error);
      throw error;
  }}