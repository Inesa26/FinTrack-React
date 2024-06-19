import axios from "axios";
import { Month } from "../interfaces/Month";

const BASE_URL = "https://localhost:7049/api/monthly-summary";

export interface MonthlySummary {
  year: number;
  month: Month;
  income: number;
  expenses: number;
  balance: number;
}

export const GetMonthlySummariesPerYear = async (
  year: number
): Promise<MonthlySummary[]> => {
  try {
    const response = await axios.get<MonthlySummary[]>(
      `${BASE_URL}/year?year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly-summary:", error);
    throw new Error("Failed to fetch monthly-summary");
  }
};

export const GetMonthlySummaryByYearAndMonth = async (
  year: number,
  month: Month
) => {
  try {
    const response = await axios.get<MonthlySummary>(
      `${BASE_URL}?year=${year}&month=${month}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching monthly-summary for month ${month}:`, error);
    throw new Error(`Failed to fetch monthly-summary for month ${month}`);
  }
};
