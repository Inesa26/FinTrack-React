import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React from "react";

interface YearMonthDayDatePickerProps {
  onDateChange: (date: string) => void;
}

const YearMonthDayDatePicker: React.FC<YearMonthDayDatePickerProps> = ({
  onDateChange,
}) => {
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      onDateChange(formattedDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem>
          <DesktopDatePicker onChange={handleDateChange} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default YearMonthDayDatePicker;
