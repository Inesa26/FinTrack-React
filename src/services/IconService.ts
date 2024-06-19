import axios from "axios";
import { TransactionType } from "../interfaces/TransactionType";

const BASE_URL = "https://localhost:7049/api/icon";

export interface Icon {
  id: number;
  base64Data: string;
  TransactionType: TransactionType;
}

export interface GetAllIconsDto {
  items: Icon[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  transactionType: TransactionType;
}

export const getAllIcons = async (
  pageIndex: number,
  pageSize: number,
  transactionType: TransactionType
): Promise<GetAllIconsDto> => {
  try {
    const response = await axios.get<GetAllIconsDto>(
      `${BASE_URL}?pageIndex=${pageIndex}&pageSize=${pageSize}&transactionType=${transactionType}`
    );
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching icons:", error);
    throw new Error("Failed to fetch icons");
  }
};
