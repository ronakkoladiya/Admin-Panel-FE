import React, { useState, useEffect } from "react";
import Style from "./TimePicker.module.css";
import { TimePickerProps } from "./TimePicker.types";
import TextFields from "../Textfield/TextFields";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Backdrop, Box, Button, Popover, Typography } from "@mui/material";
import { LocalizationProvider, TimeClock } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const style = {
  width: 300,
  height: 385,
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,

  "& .MuiClock-pin, .MuiClockPointer-root,.MuiClockPointer-thumb": {
    backgroundColor: "#000981",
  },
  "& .MuiClockPointer-thumb ": {
    border: "16px solid #000981 !important ",
  },
};
const TimePicker = ({
  minutes,
  width,
  onChange,
  placeholder,
  value,
}: TimePickerProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const [formattedHour, setformattedHour] = useState<any>(value);
  const [formattedMinute, setformattedMinute] = useState<any>(value);
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedTime(null); // Reset selected time on close
    setSelectedMinute(null);
  };

  const handleHoursChange = (newTime: any) => {
    setSelectedTime(newTime);
  };

  const handleMinutesChange = (newTime: any) => {
    setSelectedMinute(newTime);
  };

  const handleDoneClick = () => {
    if (selectedTime) {
      setformattedHour(
        dayjs(selectedTime).format("HH") == "00"
          ? 12
          : dayjs(selectedTime).format("HH")
      );
    }
    if (selectedMinute) {
      setformattedMinute(dayjs(selectedMinute).format("mm"));
    }

    handleClose();
  };
  useEffect(() => {
    if (formattedHour || formattedMinute) {
      onChange && onChange(minutes ? formattedMinute : formattedHour);
    }
  }, [formattedMinute, formattedHour]);

  useEffect(()=>(
    minutes ? setformattedMinute(value) : setformattedHour(value)
  ),[value])

  return (
    <>
      <div className={Style.timeField} style={{ width: width || "100%" }}>
        <TextFields
          readOnly={true}
          value={minutes ? formattedMinute : formattedHour}
          placeholder={placeholder}
        />
        <AccessTimeIcon className={Style.clockIcon} onClick={handleClick} />
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          sx={{
            mt: 2,
            "& .MuiPaper-root.MuiPopover-paper": {
              borderRadius: "10px",
            },
          }}
          onChange={(e) => console.log()}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select time
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {minutes ? (
                  <TimeClock
                    views={["minutes"]}
                    onChange={handleMinutesChange}
                  />
                ) : (
                  <TimeClock views={["hours"]} onChange={handleHoursChange} />
                )}
              </Box>
            </LocalizationProvider>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-around",
                mt: 1,
              }}
            >
              <Button className={Style.cancelButton} onClick={handleClose}>
                Cancel
              </Button>
              <Button className={Style.doneButton} onClick={handleDoneClick}>
                Done
              </Button>
            </Box>
          </Box>
        </Popover>
      </Backdrop>
    </>
  );
};

export default TimePicker;
