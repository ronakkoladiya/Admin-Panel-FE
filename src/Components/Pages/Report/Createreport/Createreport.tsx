import React, { useState, useEffect } from "react";
import Button from "../../../Views/Button/Button";
import { Box, Grid } from "@mui/material";
import TextFields from "../../../Views/Textfield/TextFields";
import DatePicker from "../../../Views/date-picker/DatePicker";
import Addicon from "../../../../Assest/svgicons/Addicon";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllProjectNameApi,
  ReportAddApi,
} from "../../../../Redux/Actions/Report";
import dayjs from "dayjs";
import CreateReportAdd from "../ChildComponents/CreateReportAdd";
import { AllProjectNameDetailsTypes, allreportdataTypes, errorsTypes, projectTypes } from "./Createreport.types";



function Createreport() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { AllProjectNameDetails, EmployeeId, firstName, lastName } =
    useSelector((state: any) => ({
      EmployeeId: state?.auth?.userDetails?._id,
      firstName: state?.auth?.userDetails?.firstName,
      lastName: state?.auth?.userDetails?.lastName,
      AllProjectNameDetails: state?.report?.projectname || [],
    }));

  const EmployeeName = `${firstName} ${lastName}`;
  const [errors, setErrors] = useState<errorsTypes>({
    reportDate: "",
    employeeId: "",
    projectData: [],
  });

  const [allreportdata, setAllreportdata] = useState<allreportdataTypes>({
    reportDate: "",
    employeeId: EmployeeId || "",
    project: [
      {
        projectId: "",
        hours: 0,
        minutes: 0,
        description: "",
      },
    ],
  });

  const [currentdata, setCurrentdata] = useState<projectTypes>({
    projectId: "",
    hours: 0,
    minutes: 0,
    description: "",
  });

  useEffect(() => {
    dispatch(GetAllProjectNameApi());
  }, []);


  // calculate total time of all projects 
  const calculateTotalTime = () => {
    let totalHours = 0;
    let totalMinutes = 0;
  
    allreportdata.project.forEach((project:any ) => {
      totalHours += parseInt(project.hours, 10) || 0;
      totalMinutes += parseInt(project.minutes, 10) || 0;
    });
  
    if (totalMinutes >= 60) {
      const additionalHours = Math.floor(totalMinutes / 60);
      totalHours += additionalHours;
      totalMinutes -= additionalHours * 60;
    }
  
    return { totalHours, totalMinutes };
  };
  const { totalHours, totalMinutes } = calculateTotalTime();


  const handleAddData = () => {
    setAllreportdata((prevData: allreportdataTypes) => ({
      ...prevData,
      project: [...prevData.project, currentdata],
    }));
  };

  const handleDeleteData = (projectIndex: number) => {
    setAllreportdata((prevData: allreportdataTypes) => {
      return {
        ...prevData,
        project: prevData.project.filter(
          (project: projectTypes, projectOfIndex: number) =>
            projectOfIndex !== projectIndex
        ),
      };
    });
  };

  const handleClearData = (projectIndex: number) => {
    setAllreportdata((prevData: allreportdataTypes) => {
      return {
        ...prevData,
        project: prevData.project.map((project: projectTypes, pIndex: number) =>
          pIndex === projectIndex ? currentdata : project
        ),
      };
    });
  };

  const changehandler = (event: any, projectIndex: number) => {
    const { name, value } = event.target;
    setErrors((prevErrors: errorsTypes) => ({
      ...prevErrors,
      projectData: prevErrors.projectData.map(
        (projectError: projectTypes, pIndex: number) =>
          pIndex === projectIndex
            ? { ...projectError, [name]: "" }
            : projectError
      ),
    }));
    setAllreportdata((prevData: allreportdataTypes) => {
      return {
        ...prevData,
        project: prevData.project.map((project: projectTypes, pIndex: number) =>
          pIndex === projectIndex
            ? {
                ...project,
                [name]: value,
              }
            : project
        ),
      };
    });
  };

  const changehourshandler = (event: string, index: number) => {
    setErrors((prevErrors: errorsTypes) => ({
      ...prevErrors,
      projectData: prevErrors.projectData.map(
        (projectError: projectTypes, pIndex: number) =>
          pIndex === index ? { ...projectError, hours: "" } : projectError
      ),
    }));
    setAllreportdata((prevData: allreportdataTypes) => {
      return {
        ...prevData,
        project: prevData.project.map((project: projectTypes, pIndex: number) =>
          pIndex === index ? { ...project, hours: parseInt(event) } : project
        ),
      };
    });
  };

  const changeminuteshandler = (event: string, index: number) => {
    setAllreportdata((prevData: allreportdataTypes) => {
      return {
        ...prevData,
        project: prevData.project.map((project: projectTypes, pIndex: number) =>
          pIndex === index ? { ...project, minutes: parseInt(event) } : project
        ),
      };
    });
  };

  const getReportDate = (event: string, index: number) => {
    const reportfinaldate = dayjs(event).format("MM/DD/YYYY");
    setErrors((prevErrors: errorsTypes) => ({
      ...prevErrors,
      reportDate: "",
    }));
    setAllreportdata((prevData: allreportdataTypes) => ({
      ...prevData,
      reportDate: reportfinaldate,
    }));
  };

  const projectNameOption = AllProjectNameDetails.map(
    (projectDetails: AllProjectNameDetailsTypes) => ({
      value: projectDetails._id,
      Text: projectDetails.projectName,
    })
  );

  const cancleAllData = () => {
    navigate("/report");
  };

  // Validation function to check if the report data is valid
  const validateReportData = () => {
    const newErrors: any = {
      reportDate: "",
      employeeId: "",
      projectData: [],
    };

    // Validate reportDate and projectName
    if (!allreportdata.reportDate) {
      newErrors.reportDate = "Report date is required";
    }

    if (!allreportdata.employeeId) {
      newErrors.employeeId = "Employee name is required";
    }

    allreportdata.project.forEach((project: projectTypes, projectIndex: number) => {
      const projectErrors: projectTypes = {
        projectId: "",
        hours: "",
        minutes: "",
        description: "",
      };

      if (!project.projectId) {
        projectErrors.projectId = "Project Name is required";
      }

      if (!project.hours) {
        projectErrors.hours = "Hours is required";
      }

      if (!project.description) {
        projectErrors.description = "Description is required";
      }

      newErrors.projectData.push(projectErrors);
    });

    // Set the errors state based on the validation results
    setErrors(newErrors);

    // Check if there are any errors in the newErrors object
    const hasErrors = Object.keys(newErrors).some((key) =>
      key === "projectData"
        ? newErrors[key].some((projectErrors: projectTypes) =>
            Object.values(projectErrors).some((error) => error !== "")
          )
        : newErrors[key]  !== ""
    );

    return !hasErrors;
  };

  const saveAllData = async () => {
    const isValid = validateReportData();

    if (isValid) {
      // If data is valid, submit the form
      await dispatch(ReportAddApi(allreportdata));
      navigate("/report");
    } 
  };

  return (
    <>
      <Box>
        {/* First row: Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 4 }}>
          <Box sx={{ px: 2 }}>
            <Button text="Cancel" onClick={cancleAllData} />
          </Box>
          <Box>
            <Button
              text="Save"
              onClick={saveAllData}
              sx={{ backgroundColor: "#8189FF", color: "#FFFFFF" }}
            />
          </Box>
        </Box>

        {/* Second row: Total Time */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 3 }}>
          <Box
            sx={{
              textAlign: "center",
              padding: "10px",
              backgroundColor: "#ffffff",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Total Time:</span>
            <span> {totalHours} hours, {totalMinutes} minutes</span>
          </Box>
        </Box>

        {/* Third row: Report Date and Employee Name */}
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={6}
          >
            <Grid item xs={12} sm={6} md={6}>
              <h6
                style={{
                  color: "#00032E",
                  fontSize: "15px",
                  fontWeight: "400",
                  paddingBottom: "10px",
                }}
              >
                Report Date
              </h6>
              <DatePicker
                onChange={getReportDate}
                dateField
                placeholder="Report Date"
                header="Report Date"
              />
              {/* Display the error message for reportDate */}
              {errors.reportDate && (
                <div style={{ color: "red" }}>{errors.reportDate}</div>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <h6
                style={{
                  color: "#00032E",
                  fontSize: "15px",
                  fontWeight: "400",
                  paddingBottom: "10px",
                }}
              >
                Employee Name
              </h6>
              <TextFields
                placeholder="@Aditya"
                name="employeeId"
                value={EmployeeName}
                readOnly
              />
              {/* Display the error message for projectName */}
            </Grid>
          </Grid>
        </Box>

        {/* Fourth row: Report Data */}
        <CreateReportAdd
          errors={errors}
          allreportdata={allreportdata}
          changehandler={changehandler}
          projectNameOption={projectNameOption}
          changehourshandler={changehourshandler}
          changeminuteshandler={changeminuteshandler}
          handleClearData={handleClearData}
          handleDeleteData={handleDeleteData}
        />
      </Box>

      {/* Fifth row: Add Button */}
      <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
        <button
          onClick={handleAddData}
          style={{ cursor: "pointer", background: "none", border: "none" }}
        >
          <Addicon width="62px" height="62px" />
        </button>
      </Box>
    </>
  );
}

export default Createreport;
