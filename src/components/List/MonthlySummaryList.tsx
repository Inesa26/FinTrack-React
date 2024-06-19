import { Box, Typography } from "@mui/material";
import { useState } from "react";
import YearDatePicker from "../DatePicker/YearDatePicker";
import MonthlySummaryTable from "../Table/MonthlySummaryTable";

export default function MonthlySummaryList() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ ml: 1, mt: 3 }} variant="h4">
          BILL
        </Typography>
        <YearDatePicker
          initialYear={selectedYear}
          onYearChange={handleYearChange}
        />
      </Box>
      <MonthlySummaryTable year={selectedYear} />
    </div>
  );
}
