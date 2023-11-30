import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import DropDown from "../../../Views/DropDown/DropDown";
import DatePicker from "../../../Views/date-picker/DatePicker";
import TextAreas from "../../../Views/Textarea/Textareas";
import style from "./CreateLeave.module.css";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Views/Button/Button";
import { useNavigate } from "react-router-dom";
import { LeaveAddApi } from "../../../../Redux/Actions/Leave";
interface leaveDataTypes{
  userId: string,
  leaveType: string,
  reasonDescribe: string,
  fromDate: string,
  toDate: string,
  timeOffLeave: string,
}
interface leaveErrorDataTypes{
  leaveType: string,
  reasonDescribe: string,
  fromDate: string,
  toDate: string,
  timeOffLeave: string,
}

const CreateLeave = () => {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const { EmployeeId } = useSelector((state: any) => ({
    EmployeeId: state?.auth?.userDetails?._id,
  }));

  // Initialize state for leave data and errors
  const [leaveData, setLeaveData] = useState<leaveDataTypes>({
    userId: EmployeeId,
    leaveType: "",
    reasonDescribe: "",
    fromDate: "",
    toDate: "",
    timeOffLeave: "",
  });
  const [errors, setErrors] = useState<leaveErrorDataTypes>({
    timeOffLeave: "",
    fromDate: "",
    leaveType: "",
    toDate: "",
    reasonDescribe: "",
  });

  // Function to validate the form
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validation for Leave Type
    if (!leaveData.timeOffLeave) {
      newErrors.timeOffLeave = "Leave Type is required";
      isValid = false;
    } else {
      newErrors.timeOffLeave = "";
    }

    // Validation Type Of Leave
    if (!leaveData.leaveType) {
      newErrors.leaveType = "Type Of Leave is required";
      isValid = false;
    } else {
      newErrors.leaveType = "";
    }

    // Validation for From Date
    if (!leaveData.fromDate) {
      newErrors.fromDate = "From Date is required";
      isValid = false;
    } else if (new Date(leaveData.fromDate) < new Date()) {
      newErrors.fromDate = "From Date is be greater than today's date";
      isValid = false;
    } else {
      newErrors.fromDate = "";
    }

    // Validation for To Date
    if (!leaveData.toDate) {
      newErrors.toDate = "To Date is required";
      isValid = false;
    } else if (dayjs(leaveData.toDate).isBefore(leaveData.fromDate)) {
      newErrors.toDate = "To Date must be greater than or equal to From Date";
      isValid = false;
    } else {
      newErrors.toDate = "";
    }

    // Validation for Reason
    if (!leaveData.reasonDescribe) {
      newErrors.reasonDescribe = "Reason is required";
      isValid = false;
    } else if (leaveData.reasonDescribe.replace(/\s/g, "").length < 5) {
      newErrors.reasonDescribe = "Reason must be at least 5 letters";
      isValid = false;
    } else if (leaveData.reasonDescribe.replace(/\s/g, "").length > 100) {
      newErrors.reasonDescribe = "Reason cannot exceed 100 letters";
      isValid = false;
    } else {
      newErrors.reasonDescribe = "";
    }
    setErrors(newErrors);
    return isValid;
  };

  // Function to handle changes in the 'fromDate' field
  const onChangeFromDate = (event: string) => {
    const reportfinaldate = dayjs(event).format("MM/DD/YYYY");
    setErrors((prevError: leaveErrorDataTypes) => ({
      ...prevError,
      fromDate: "",
    }));
    setLeaveData((prevData: leaveDataTypes) => ({
      ...prevData,
      fromDate: reportfinaldate,
    }));
  };

  // Function to handle changes in the 'toDate' field
  const onChangeToDate = (event: string) => {
    const reportfinaldate = dayjs(event).format("MM/DD/YYYY");
    setErrors((prevError: leaveErrorDataTypes) => ({
      ...prevError,
      toDate: "",
    }));
    setLeaveData((prevData: leaveDataTypes) => ({
      ...prevData,
      toDate: reportfinaldate,
    }));
  };

  // Function to handle changes in input fields
  const changehandler = (event: any) => {
    const { name, value } = event.target;
    setErrors((prevError: leaveErrorDataTypes) => ({
      ...prevError,
      [name]: "",
    }));
    setLeaveData((prevData: leaveDataTypes) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // Function to save leave data
  const saveLeaveData = () => {
    const isValid = validateForm();
    if (isValid) {
      Dispatch(LeaveAddApi(leaveData));
      Navigate("/leave");
    }
  };

  return (
    <>
      {/* First row: Buttons Save and Cancel */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 4 }}>
        <Box sx={{ px: 2 }}>
          <Button text="Cancel" onClick={() => Navigate("/leave")} />
        </Box>
        <Box>
          <Button
            text="Save"
            onClick={saveLeaveData}
            sx={{ backgroundColor: "#8189FF", color: "#FFFFFF" }}
          />
        </Box>
      </Box>

      {/* Second row: Leave Form */}
      <Box sx={{ backgroundColor: "#ffffff", borderRadius: "10px", my: 5 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={4}
          sx={{
            padding: "50px 30px 50px 30px",
            "& .MuiGrid-item": { paddingTop: 0 },
          }}
        >
          <Grid item xs={12} sm={6} md={6}>
            <h6 className={style.h6tag}>Leave Type</h6>
            <DropDown
              onChange={changehandler}
              value={leaveData.timeOffLeave}
              name="timeOffLeave"
              options={[
                { value: "", Text: "Select Type" },
                { value: "fullDay", Text: "Full Day" },
                { value: "halfDay", Text: "Half Day" },
                { value: "shortDay", Text: "Short Day" },
              ]}
            />
            {/* Display error message for Leave Type */}
            <div className={style.error}>{errors.timeOffLeave}</div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <h6 className={style.h6tag}>Type Of Leave</h6>
            <DropDown
              onChange= {changehandler}
              value={leaveData.leaveType}
              name="leaveType"
              options={[
                { value: "", Text: "Select Type Of Leave" },
                { value: "casual", Text: "Casual" },
                { value: "medical", Text: "Medical" },
                { value: "maternity", Text: "Maternity" },
                { value: "lwop", Text: "LWOP" },
                { value: "emergency", Text: "Emergency" },
              ]}
            />
            {/* Display error message for Leave Type */}
            <div className={style.error}>{errors.leaveType}</div>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <h6 className={style.h6tag}>From Date</h6>
            <DatePicker
              placeholder="00-00-0000"
              dateField
              value={leaveData.fromDate}
              onChange={onChangeFromDate}
            />
            {/* Display error message for From Date */}
            <div className={style.error}>{errors.fromDate}</div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <h6 className={style.h6tag}>To Date</h6>
            <DatePicker
              dateField
              placeholder="00-00-0000"
              value={leaveData.toDate}
              onChange={onChangeToDate}
            />
            {/* Display error message for To Date */}
            <div className={style.error}>{errors.toDate}</div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <h6 className={style.h6tag}>Reason</h6>
            <TextAreas
              minRows={5}
              maxRows={5}
              resize="none"
              placeholder="Enter your description here..."
              value={leaveData.reasonDescribe}
              name="reasonDescribe"
              onChange={changehandler}
            />
            {/* Display error message for Reason */}
            <div className={style.error}>{errors.reasonDescribe}</div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "20px 0px 0px 0px ",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CreateLeave;
