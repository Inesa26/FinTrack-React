import axios from "axios";
import { TransactionType } from "../interfaces/TransactionType";
import { Icon } from "./IconService";

const BASE_URL = "https://localhost:7049/api/category";

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

export interface Category {
  id: number;
  title: string;
  icon: Icon;
  transactionType: TransactionType;
}

export interface GetAllCategoriesDto {
  items: Category[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}

export const createCategory = async (command: CreateCategoryCommand) => {
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
    console.error("Error creating category:", error);
    throw error;
  }
};

export const getAllCategories = async (
  pageIndex: number,
  pageSize: number,
  transactionType: TransactionType
): Promise<GetAllCategoriesDto> => {
  try {
    const response = await axios.get<GetAllCategoriesDto>(
      `${BASE_URL}?pageIndex=${pageIndex}&pageSize=${pageSize}&transactionType=${transactionType}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};
