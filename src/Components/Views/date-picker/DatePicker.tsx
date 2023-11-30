import React, { useState,useEffect } from 'react'
import Style from './DatePicker.module.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import TextFields from '../Textfield/TextFields';
import { DatePickerProps } from "./index.types"
import Popover from '@mui/material/Popover';
import Backdrop from '@mui/material/Backdrop';

const style = {
  width: 350,
  height: 415,
  borderRadius: "10px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  '& .MuiDateCalendar-root': {
    width: "300px",
    height: "285px",
  },
  '& .MuiPickersDay-dayWithMargin': {
    borderRadius: "2px",
  },
  "& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected.MuiPickersDay-dayWithMargin": {
    backgroundColor: "#979EFF",
  },
  '&:focus-visible': {
    outline: 'none'
  },
};

const DatePicker = ({ dateField, onChange,width,placeholder,header,value,name }: DatePickerProps) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [getDate, setGetDate] = useState(value || "")
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };

  const handleDateChange = (newDate: any) => {
    setSelectedDate(newDate);
  };

  const handleDone = () => {
    if (selectedDate) {
      setGetDate(dayjs(selectedDate).format('MM-DD-YYYY'));
    } else {
      setGetDate(dayjs().format('MM-DD-YYYY'));
    }
    onChange && onChange(getDate);
    handleClose();
  };

  useEffect(() => {
    if (getDate) {
      onChange && onChange(getDate);
    }
  }, [getDate]);

  return (
    <>
      {dateField ? <div className={Style.dateField} style={{ width: width || '100%' }}>
        <TextFields value={getDate} readOnly={true} placeholder={placeholder || "MM-DD-YYYY"}/>
        <CalendarMonthIcon className={Style.calenderIcon} onClick={handleClick} />
      </div> :
        <Button startIcon={<CalendarMonthIcon />} className={Style.Date_menu} onClick={handleClick}>
          Date
        </Button>
      }
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        sx={{ mt: 2 ,'& .MuiPaper-root.MuiPopover-paper': {
          borderRadius: "10px",
      
        },}}
        onChange={(e)=>console.log()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           {  header || "Leave Date"}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar onChange={handleDateChange} value={selectedDate} />
          </LocalizationProvider>
          <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-around", mt: 1 }}>
            <Button className={Style.cancelButton} onClick={handleClose}>Cancel</Button>
            <Button className={Style.doneButton} onClick={handleDone}>Done</Button>
          </Box>
        </Box>
      </Popover>
      </Backdrop>
    </>

  )
}
export default DatePicker