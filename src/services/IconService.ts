import axios from 'axios';
import { TransactionType } from '../interfaces/TransactionType';

export interface Icon {
  id: number;
  base64Data: string;
  TransactionType: TransactionType;
}

export interface IconsResponse {
  items: Icon[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  transactionType: TransactionType;
}

export const fetchIcons = async (pageIndex: number, pageSize: number, transactionType: TransactionType ): Promise<IconsResponse> => {
  try {
    const response = await axios.get<IconsResponse>(
      `https://localhost:7049/api/icon?pageIndex=${pageIndex}&pageSize=${pageSize}&transactionType=${transactionType}`
    );
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching icons:', error);
    throw new Error('Failed to fetch icons');
  }
};
