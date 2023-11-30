import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import styled from "./AttendanceDetails.module.css";
import Calender from "../../../../../Views/Calender/Calender";
import { useReactToPrint } from "react-to-print";
import Button from "../../../../../Views/Button/Button";
const AttendanceDetails = () => {
  // print table
  const contentRef: any = useRef();
  const printSlip = useReactToPrint({
    content: () => contentRef.current,
  });
  return (
    <>
      <Box ref={contentRef} id={"printableContent"}>
        <Box sx={{ mt: 4, mb: 3,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <Box >
            <Typography variant="h6" className={styled.textTypography}>
              Leave Date : <span className={styled.textTypographyspan}>22</span>
            </Typography>
            <Typography variant="h6" className={styled.textTypography}>
              Total Present Day :{" "}
              <span className={styled.textTypographyspan}>21</span>
            </Typography>
            <Typography variant="h6" className={styled.textTypography}>
              Leave Day : <span className={styled.textTypographyspan}>01</span>
            </Typography>{" "}
          </Box>
          <Box sx={{textAlign: "center" }}>
            <Button
              id={"printbtn"}
              onClick={() => {
                // @ts-ignore
                document.getElementById("printbtn").style.opacity = "0";
                printSlip();
                // @ts-ignore
                document.getElementById("printbtn").style.opacity = "1";
              }}
              text="Print"
            />
          </Box>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Calender />
        </Box>
      </Box>
    </>
  );
};

export default AttendanceDetails;
