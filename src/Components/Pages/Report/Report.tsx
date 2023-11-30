import React, { useEffect, useState } from "react";
import Table from "../../Views/Table/Table";
import { Box } from "@mui/material";
import Button from "../../Views/Button/Button";
import { IoMdAdd } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAllEmployeeNameApi,
  GetAllReportApi,
  GetReportApiByid,
} from "../../../Redux/Actions/Report";
import Complateicon from "../../../Assest/svgicons/Complateicon";
import Runningicon from "../../../Assest/svgicons/Runningicon";
import ReportTableFilter from "./ChildComponents/ReportTableFilter/ReportTableFilter";
import { dataTypes, filterDataTypes, stateHandlerTypes } from "./Report.types";


const Report = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { userRole, EmployeeId, reportList } = useSelector((state: any) => ({
    userRole: state?.auth?.userDetails?.userType,
    EmployeeId:
      state?.auth?.userDetails?.userType === "admin"
        ? location.pathname.split("/")[2]
        : state?.auth?.userDetails?._id || "",
    reportList: state?.report?.list,
  }));
  const columns = [
    { header: "Report Date", field: "reportdate" },
    { header: "Project", field: "project" },
    { header: "Task", field: "task", rowsx: {minWidth: '200px'} },
    { header: "Hours", field: "hours" },
    { header: "Status", field: "status" },
    { header: "Actions", field: "actions" },
  ];
  const [data, setData] = useState<dataTypes[]>([]);
  const [currentPageData, setCurrentPageData] = useState(data);

  useEffect(() => {
    if (userRole === "admin" && location.pathname === "/report") {
      dispatch(GetAllReportApi());
    } else {
      dispatch(GetReportApiByid(EmployeeId));
    }

    dispatch(GetAllEmployeeNameApi());
  }, [location.pathname]);

  useEffect(() => {
    setData([]);
    reportList?.map((report: any, reportOfIndex: number) => {
      const reportDate = new Date(report.reportDate);
      const employeeId = report?.employeeId?._id;
      const reportId = report._id;
      const day = reportDate.getDate().toString().padStart(2, "0");
      const month = (reportDate.getMonth() + 1).toString().padStart(2, "0");
      const year = reportDate.getFullYear();

      const formattedreportDate = `${month}-${day}-${year}`;

      report?.project?.map((project: any, projectOfIndex: number) => {
        const description = project?.description;
        const Hours = project?.hours + ":" + project?.minutes + ":00";

        const projectName = project?.projectId?.projectName;
        const endDate = new Date(project?.projectId?.endDate);
        const currentDate = new Date();
        const endTimestamp = endDate.getTime();
        const currentTimestamp = currentDate.getTime();

        let Status =
          currentTimestamp > endTimestamp ? <Complateicon /> : <Runningicon />;

        setData((prevData: any) => [
          ...prevData,
          {
            employeeId: employeeId,
            id: reportId,
            reportdate: formattedreportDate,
            project: projectName,
            task: description,
            hours: Hours,
            status: Status,
            actions: "9 Jan 2023",
          },
        ]);
      });
    });
  }, [reportList]);

  useEffect(() => {
    setCurrentPageData(data);
  }, [data]);
  

  const convertDateFormat = (inputDate: string) => {
    const parts = inputDate.split("-");
    if (parts.length === 3) {
      return `${parts[1]}/${parts[0]}/${parts[2]}`;
    } else {
      return inputDate;
    }
  };

  const handleClickSearchData = (filterData: filterDataTypes) => {
    setCurrentPageData(
      data.filter((dataItem: dataTypes) => {
        const reportDate = dataItem.reportdate;
        const startDate = convertDateFormat(filterData.startdate);
        const endDate = convertDateFormat(filterData.enddate);

        const finalreportDate = new Date(
          reportDate.split("/").reverse().join("/")
        );
        const finalstartDate = new Date(
          startDate.split("/").reverse().join("/")
        );
        const finalendDate = new Date(endDate.split("/").reverse().join("/"));

        if (userRole === "admin" && location.pathname === "/report") {
          return (
            (!filterData.project || dataItem.project === filterData.project) &&
            (!filterData.employee ||
              dataItem.employeeId === filterData.employee) &&
            (!filterData.startdate || finalreportDate >= finalstartDate) &&
            (!filterData.enddate || finalreportDate <= finalendDate)
          );
        } else {
          return (
            (!filterData.project || dataItem.project === filterData.project) &&
            (!filterData.startdate || finalreportDate >= finalstartDate) &&
            (!filterData.enddate || finalreportDate <= finalendDate)
          );
        }
      })
    );
    // stateHandler({ name: "goPageValue", value: 1 }, setPaginationData); 
  };

  const addHandleClick = () => {
    navigate("/report/createreport");
  };


  return (
    <>
      {/* first row: Add Button  */}
      <Box>
        {userRole === "employee" && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 4 }}>
            <Box>
              <Button
                text="Add"
                onClick={addHandleClick}
                startIcon={<IoMdAdd />}
                sx={{
                  backgroundColor: "#8189FF",
                  color: "#FFFFFF",
                  px: 3,
                  py: 1.3,
                }}
              />
            </Box>
          </Box>
        )}
        {/* Second row: Report Date and Project Name  */}
        <Box sx={{ pt: 2 }}>
          <ReportTableFilter
            handleClickSearchData={handleClickSearchData}
            userRole={userRole}
            data={data}
          />
        </Box>
        {/* Third row: Report Table*/}
        <Box sx={{ my: 3 }}>
          <Table withindex columns={columns} data={currentPageData} pagination />
        </Box>
      </Box>
    </>
  );
};

export default Report;
