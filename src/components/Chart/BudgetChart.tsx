import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  GetMonthlySummaryByYearAndMonth,
  MonthlySummary,
} from "../../services/MonthlySummaryService";

interface ChartData {
  name: string;
  value: number;
}

const BudgetChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchAndCalculateData = async () => {
      try {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; //0-11

        const summary: MonthlySummary = await GetMonthlySummaryByYearAndMonth(
          year,
          month
        );

        const remainingPercentage =
          ((summary.income - summary.expenses) / summary.income) * 100;
        const expensesPercentage = (summary.expenses / summary.income) * 100;

        setChartData([
          { name: "Remaining Income", value: remainingPercentage },
          { name: "Expenses", value: expensesPercentage },
        ]);
      } catch (error) {
        console.error("Error fetching and calculating data:", error);
      }
    };

    fetchAndCalculateData();
  }, []);

  return (
    <div style={{ height: "200px", width: "200px" }}>
      <PieChart
        series={[
          {
            data: chartData,
            innerRadius: 24,
            outerRadius: 80,
            paddingAngle: 5,
            cornerRadius: 7,
            startAngle: -90,
            endAngle: 180,
            cx: 86,
            cy: 81,
          },
        ]}
        height={200}
      />
    </div>
  );
};

export default BudgetChart;
