import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { add, sub } from "date-fns";
import { useState } from "react";
import Button from "@mui/material/Button";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export default function DateRangePicker() {
  const [startDate, setStartDate] = useState<Date | null>(
    sub(new Date(), { days: 7 }),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  return (
    <div>
      <DatePicker
        label="Start Date"
        format="dd/MM/yyyy"
        value={startDate}
        onChange={setStartDate}
        views={["day", "month", "year"]}
      />
      <DatePicker
        label="End Date"
        format="dd/MM/yyyy"
        value={endDate}
        onChange={setEndDate}
        views={["day", "month", "year"]}
      />
      <Button
        sx={{ height: 56 }}
        onClick={() => {
          setStartDate(sub(startDate!, { months: 1 }));
          setEndDate(sub(endDate!, { months: 1 }));
        }}
      >
        <KeyboardDoubleArrowLeftIcon />
      </Button>
      <Button
        sx={{ height: 56 }}
        onClick={() => {
          setStartDate(sub(startDate!, { days: 7 }));
          setEndDate(sub(endDate!, { days: 7 }));
        }}
      >
        <KeyboardArrowLeftIcon />
      </Button>
      <Button
        sx={{ height: 56 }}
        onClick={() => {
          setStartDate(add(startDate!, { days: 7 }));
          setEndDate(add(endDate!, { days: 7 }));
        }}
      >
        <KeyboardArrowRightIcon />
      </Button>
      <Button
        sx={{ height: 56 }}
        onClick={() => {
          setStartDate(add(startDate!, { months: 1 }));
          setEndDate(add(endDate!, { months: 1 }));
        }}
      >
        <KeyboardDoubleArrowRightIcon />
      </Button>
    </div>
  );
}
