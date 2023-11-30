import React from 'react'
import Style from './DashboardHoliday.module.css'
import Calender from "../../../Views/Calender/Calender";
import {Box} from "@mui/material";

const DashboardHoliday = () => {
  return (
      <>
        <Box sx={{margin: "25px 0"}}>
          <Calender/>
        </Box>
      </>
  )
}

export default DashboardHoliday
