import { Box, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { Month } from "../../interfaces/Month";
import {
  GetMonthlySummaryByYearAndMonth,
  MonthlySummary,
} from "../../services/MonthlySummaryService";
import YearMonthDatePicker from "../DatePicker/YearMonthDatePicker";

const MonthlySummaryReport: React.FC = () => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState<Month>(
    (dayjs().month() + 1) as Month
  );

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      try {
        const summary: MonthlySummary = await GetMonthlySummaryByYearAndMonth(
          currentYear,
          currentMonth
        );
        setIncome(summary.income);
        setExpenses(summary.expenses);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    fetchMonthlySummary();
  }, [currentYear, currentMonth]);

  const handleDateChange = async (date: Dayjs | null) => {
    if (date) {
      setCurrentYear(date.year());
      setCurrentMonth((date.month() + 1) as Month);
    }
  };

  return (
    <Box sx={{ display: "flex", direction: "row", gap: 1 }}>
      <YearMonthDatePicker
        initialDate={dayjs()
          .set("year", currentYear)
          .set("month", currentMonth - 1)}
        onDateChange={handleDateChange}
      />
      <Box sx={{ ml: 5, width: "400px" }}>
        <Typography
          sx={{ ml: 1, mt: 3, fontWeight: "bold", color: "#064aaf" }}
          variant="h4"
        >
          INCOME: {income.toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{ width: "400px" }}>
        <Typography
          sx={{ ml: 1, mt: 3, fontWeight: "bold", color: "#064aaf" }}
          variant="h4"
        >
          EXPENSES: {expenses.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default MonthlySummaryReport;
