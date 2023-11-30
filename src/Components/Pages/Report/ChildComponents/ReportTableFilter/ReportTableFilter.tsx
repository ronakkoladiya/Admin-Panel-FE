import React, { useState } from "react";

import { Grid } from "@mui/material";
import DropDown from "../../../../Views/DropDown/DropDown";
import DatePicker from "../../../../Views/date-picker/DatePicker";
import style from "./ReportTableFilter.module.css"
import Searchicon from "../../../../../Assest/svgicons/Searchicon";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


interface filterDataTypes {
  employee: string ;
  project: string ;
  startdate: string ;
  enddate: string ;
}
const ReportTableFilter = ({ data, handleClickSearchData, userRole }: any) => {
  const {EmployeeName} = useSelector((state: any) => ({
    EmployeeName: state?.report?.employeename || [],
  }));
  
  const [filterData, setFilterData] = useState<filterDataTypes>({
    employee: "",
    project: "",
    startdate: "",
    enddate: "",
  });
  const location = useLocation();


  // set option For ProjectName 
  const finalOption: any = [];
  data.forEach((dataItem: any) => {
    if (!finalOption.includes(dataItem.project)) {
      finalOption.push(dataItem.project);
    }
  });
  let options: any = [];
  options = finalOption.map((dataItem: any, dataOfIndex: number) => ({
    value: dataItem,
    Text:  dataItem,
  }));

  const onChangeHandler = (event: any) => {
    setFilterData({ ...filterData, [event.target.name]: event.target.value });
  };

  const onChangeStartDate = (value: any) => {
    setFilterData({ ...filterData, startdate: value });
  };

  const onChangeEndDate = (value: any) => {
    setFilterData({ ...filterData, enddate: value });
  };
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        {userRole === "admin" && location.pathname === "/report" && (
          <Grid item xs={12} sm={6} md={2.75}>
            <h6 className={`${style.common_h6}`}>Employee</h6>
            <DropDown
              onChange={onChangeHandler}
              value={filterData?.employee}
              name="employee"
              selectsx={{ backgroundColor: "#fff" }}
              enabled
              options={[{ value: "", Text: "All" },
              ...(Array.isArray(EmployeeName) ? EmployeeName.map((dataItem: any, dataOfIndex: number) => ({
                value: dataItem._id,
                Text: `${dataItem.firstName} ${dataItem.lastName}`,
              })) : [])
            ]}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={2.75}>
          <h6 className={`${style.common_h6}`}>Project</h6>
          <DropDown
            onChange={onChangeHandler}
            value={filterData.project}
            selectsx={{ backgroundColor: "#fff" }}
            name="project"
            enabled
            options={[{ value: "", Text: "All" }, ...options]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.75}>
          <h6 className={`${style.common_h6}`}>Start Date</h6>
          <DatePicker
            onChange={onChangeStartDate}
            value={filterData.startdate}
            dateField
            placeholder="Date"
            header="Start Date"
          />
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={2.75}>
          <h6 className={`${style.common_h6}`}>End Date</h6>
          <DatePicker
            onChange={onChangeEndDate}
            dateField
            value={filterData.enddate}
            placeholder="Date"
            header="End Date"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <h6 className={`${style.search_btn_h6}`}>
            <button
              onClick={() => handleClickSearchData(filterData)}
              className={`${style.search_button}`}
            >
              <Searchicon height="40px" width="40px" />
            </button>
          </h6>
        </Grid>
      </Grid>
    </>
  );
};

export default ReportTableFilter;
