import React from "react";
import { Box} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface YearDatePickerProps {
  initialYear?: number;
  onYearChange: (date: number) => void;
}

const YearDatePicker: React.FC<YearDatePickerProps> = ({
  initialYear = new Date().getFullYear(),
  onYearChange,
}) => {
  const handleYearChange = (date: Dayjs | null) => {
    if (date) {
      onYearChange(date.year());
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <DatePicker
          views={["year"]}
          label="Year"
          value={dayjs().year(initialYear)}
          onChange={handleYearChange}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default YearDatePicker;
