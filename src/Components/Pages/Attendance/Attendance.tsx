import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { attendence } from "./Attendancedata";
import style from "./Attendance.module.css";
import Greentick from "../../../Assest/svgicons/Greentick";
import Redtick from "../../../Assest/svgicons/Redtick";
import Yellowtick from "../../../Assest/svgicons/Yellowtick";

import { useDispatch, useSelector } from "react-redux";

import "./PrintAttendanceSlip.css"; 
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { Box } from "@mui/system";
import Button from "../../Views/Button/Button";

interface Alldata {
  allmonths: string[];
  allyears: string[];
}
function Attendance() {
  // dispatch and selector declare
  const dispatch = useDispatch();
  const attendanceList = useSelector((state: any) => state) || [];

  // print table
  const contentRef:any = useRef();
  const printSlip = useReactToPrint({
    content: () => contentRef.current,
  });
  // capitalizeFirstLetter method
  function capitalizeFirstLetter(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // variable declare

  const currentDate = new Date();
  const currentMonthName = currentDate
    .toLocaleString("default", { month: "long" })
    .toLowerCase(); // Returns 0 for January, 1 for February, ..., 11 for December
  // const currentMonthName = allmonths[currentMonthIndex];

  const currentYear = currentDate.getFullYear();

  const [alldata, setAlldata] = useState<Alldata>({
    allmonths: [],
    allyears: [],
  });

  // state declare
  const [filterState, setFilterState] = useState({
    year: currentYear.toString(),
    month: currentMonthName,
  });

  useEffect(() => {
    const months: string[] = [];
    const years: string[] = [];
    attendence.map((year, yearOfIndex) => {
      years.push(year.year);
      year.year === filterState.year &&
        year.months.map((month, monthOfIndex) => {
          months.push(month.month);
        });
    });
    setAlldata({ ...alldata, allmonths: months, allyears: years });
  }, [filterState]);

  // next and previous button handle onClick
  const toggleClickHandle = (name: string) => {
    setFilterState({
      ...filterState,
      month:
        alldata.allmonths[
          alldata.allmonths.findIndex((month) => filterState.month === month) +
            (name === "previous" ? -1 : 1) !==
          (name === "previous" ? -1 : alldata.allmonths.length)
            ? alldata.allmonths.findIndex(
                (month) => filterState.month === month
              ) + (name === "previous" ? -1 : 1)
            : alldata.allyears.includes(
                (
                  parseInt(filterState.year) + (name === "previous" ? -1 : 1)
                ).toString() as never
              )
            ? name === "previous"
              ? alldata.allmonths.length - 1
              : 1
            : alldata.allmonths.findIndex(
                (month) => filterState.month === month
              )
        ],
      year:
        alldata.allmonths.findIndex((month) => filterState.month === month) +
          (name === "previous" ? -1 : 1) !==
        (name === "previous" ? -1 : alldata.allmonths.length)
          ? filterState.year
          : alldata.allyears.includes(
              (
                parseInt(filterState.year) + (name === "previous" ? -1 : 1)
              ).toString() as never
            )
          ? (
              parseInt(filterState.year) + (name === "previous" ? -1 : 1)
            ).toString()
          : filterState.year,
    });
  };

  // month and year handle on selectchange
  const monthyearChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setFilterState({ ...filterState, [name]: value });
  };
  return (
    <>
      <div className={style.attend_main}>
        <div className={style.attend_main_card}>
          <div className={style.attend_menu_div}>
            <select
              className={style.attend_select}
              name="month"
              onChange={monthyearChangeHandler}
            >
              {alldata.allmonths.map((month, monthOfIndex) => (
                <option
                  key={monthOfIndex}
                  value={month}
                  selected={month === filterState.month ? true : false}
                >
                  {" "}
                  {month}{" "}
                </option>
              ))}
            </select>

            <select
              className={style.attend_select}
              name="year"
              onChange={monthyearChangeHandler}
            >
              {alldata.allyears.map((year: string, yearOfIndex: number) => (
                <option
                  key={yearOfIndex}
                  value={year}
                  selected={year === filterState.year ? true : false}
                >
                  {" "}
                  {year}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className={style.attend_card}>
            <div className={style.attend_card_menu}>
              <div className={style.attend_card_menu_left}>
                <h2>
                  {capitalizeFirstLetter(
                    filterState.month + " " + filterState.year
                  )}
                </h2>
                <div className={style.attend_card_menu_left_btn}>
                  <button
                    className={style.attend_card_menu_left_divicon}
                    onClick={() => toggleClickHandle("previous")}
                  >
                    {/* &#60;  */}
                    <MdKeyboardArrowLeft
                      className={style.attend_card_menu_left_div_icon}
                    />
                  </button>
                  <button
                    className={style.attend_card_menu_left_divicon}
                    onClick={() => toggleClickHandle("next")}
                  >
                    {/* &#62; */}
                    <MdKeyboardArrowRight
                      className={style.attend_card_menu_left_div_icon}
                    />
                  </button>
                </div>
              </div>

              <div className={style.attend_card_menu_right}>
                <p className={style.attend_card_menu_right_tick}>
                  <Greentick width="20px" height="20px" />
                  <p className={style.attend_card_menu_right_tick_para}>
                    Full Day
                  </p>
                </p>
                <p className={style.attend_card_menu_right_tick}>
                  <Yellowtick width="20px" height="20px" />
                  <p className={style.attend_card_menu_right_tick_para}>
                    Half Day
                  </p>
                </p>
                <p className={style.attend_card_menu_right_tick}>
                  <Redtick width="20px" height="20px" />
                  <p className={style.attend_card_menu_right_tick_para}>
                    Leave Day
                  </p>
                </p>
              </div>
            </div>
            <div
              className={style.attend_card_table}
             
            >
              <TableContainer
               
                component={Paper}
                sx={{
                  "&::-webkit-scrollbar": {
                    width: 2,
                    height: "5px",
                    cursor: "pointer",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#F2F5FF",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#8189ff",
                    borderRadius: 2,
                  },
                  position: "relative",
                  overflowX: "auto",
                }}
              >
                <Table aria-label="responsive table" ref={contentRef}
               id={"printableContent"}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          align: "center",
                          position: "sticky",
                          left: "0",
                          Zindex: "2",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        Employee
                      </TableCell>
                      {attendence
                        .find(
                          (yearData, yearDataOfIndex) =>
                            yearData.year === filterState.year
                        )
                        ?.months.find(
                          (monthData, monthDataOfIndex) =>
                            monthData.month === filterState.month
                        )
                        ?.Employees.map(
                          (employee, employeeOfIndex) =>
                            !employeeOfIndex &&
                            Object.keys(employee)
                              .filter((employeeKey) => employeeKey !== "name")
                              .map((key, indexOfkey) => (
                                <TableCell
                                  key={indexOfkey}
                                  sx={{
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    align: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  {indexOfkey + 1}
                                </TableCell>
                              ))
                        )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendence
                      .find(
                        (yearData, yearDataOfIndex) =>
                          yearData.year === filterState.year
                      )
                      ?.months.find(
                        (monthData, monthDataOfIndex) =>
                          monthData.month === filterState.month
                      )
                      ?.Employees.map((employee, employeeOfIndex) => (
                        <TableRow
                          key={employeeOfIndex}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            borderBottom: "none",
                            align: "right",
                          }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              borderBottom: "none",
                              align: "right",
                              position: "sticky",
                              left: "0",
                              Zindex:
                                "2" /* Ensure the fixed header appears above the table */,
                              backgroundColor: "#ffffff",
                              minWidth: "80px",
                            }}
                          >
                            {employee.name}
                          </TableCell>
                          {Object.values(employee).map((user, i) => {
                            return (
                              <TableCell
                                key={i}
                                component="th"
                                scope="row"
                                sx={{
                                  borderBottom: "none",
                                  align: "center",
                                  textAlign: "center",
                                }}
                              >
                                {user === "half" ? (
                                  <Yellowtick width="20px" height="20px" />
                                ) : user === "leave" ? (
                                  <Redtick width="20px" height="20px" />
                                ) : user === "full" ? (
                                  <Greentick width="20px" height="20px" />
                                ) : null}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                id={"printbtn"}
                sx={{
                  backgroundColor: '#8189FF',
                  color: 'white'
                }}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Attendance;
