import axios from "axios";
import { TransactionType } from "../interfaces/TransactionType";
import { Category } from "./CategoryService";

const BASE_URL = "https://localhost:7049/api/transaction";

export interface CreateTransactionCommand {
  amount: number;
  date: string;
  description: string;
  categoryId: number;
  transactionType: TransactionType;
}

export interface UpdateTransactionCommand {
  transactionId: number;
  amount: number;
  date: string;
  description: string;
  categoryId: number;
  transactionType: TransactionType;
}

export interface TransactionCategory {
  id: number;
  date: string;
  category: Category;
  description: string;
  amount: number;
  transactionType: TransactionType;
}

export interface Transaction {
  id: number;
  date: string;
  categoryId: number;
  description: string;
  amount: number;
  transactionType: TransactionType;
}

export interface GetAllTransactionsDto {
  items: TransactionCategory[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}

export const createTransaction = async (command: CreateTransactionCommand) => {
  console.log("Sending data:", command);
  try {
    const response = await axios.post(BASE_URL, command, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

export const getAllTransactions = async (
  pageIndex: number,
  pageSize: number,
  sortBy: string = "Date",
  sortOrder: string = "asc"
): Promise<GetAllTransactionsDto> => {
  try {
    const response = await axios.get<GetAllTransactionsDto>(
      `${BASE_URL}?pageIndex=${pageIndex}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
};

export const updateTransaction = async (command: UpdateTransactionCommand) => {
  try {
    const response = await axios.put(`${BASE_URL}`, command, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error updating transaction ${command.transactionId}:`,
      error
    );
    throw error;
  }
};

export const getTransactionById = async (transactionId: number) => {
  try {
    const response = await axios.get<Transaction>(
      `${BASE_URL}/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching transaction ${transactionId}:`, error);
    throw new Error(`Failed to fetch transaction ${transactionId}`);
  }
};

export const deleteTransaction = async (transactionId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting transaction ${transactionId}:`, error);
    throw new Error(`Failed to delete transaction ${transactionId}`);
  }
};
