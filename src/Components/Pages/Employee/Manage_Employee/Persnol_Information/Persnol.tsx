import React, { useEffect, useMemo } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import style from "./persnol.module.css";
import {
  EmployeeApiById,
  IEmployeeDetails,
} from "../../../../../Redux/Actions";
import dayjs from "dayjs";

const Personal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const employeeId = useMemo(
    () => location.pathname.split("/")[2],
    [location.pathname]
  );
  const employee = useSelector(
    (state: any) =>
      state?.employee?.detail?.[employeeId] || state?.auth?.userDetails
  );

  const convertDateOfBirth = new Date(employee?.dateOfBirth);
  const convertJoinDate = new Date(employee?.joinDate);

  useEffect(() => {
    dispatch(EmployeeApiById({ id: employeeId } as IEmployeeDetails));
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className={style.card_div2}>
            <h6>Basic Information</h6>
            <div className={style.main_type_div}>
              <div className={style.mng_type_div}>
                <p className={style.type_p1}>
                  First Name
                  <p className={style.type_p2}>{employee?.firstName}</p>
                </p>
              </div>
              <div className={style.mng_type_div}>
                <p className={style.type_p1}>
                  Middle Name
                  <p className={style.type_p2}>{employee?.middleName}</p>
                </p>
              </div>
              <div className={style.mng_type_div}>
                <p className={style.type_p1}>
                  Last Name
                  <p className={style.type_p2}>{employee?.lastName}</p>
                </p>
              </div>
              <div className={style.mng_type_div}>
                <p className={style.type_p1}>
                  Gender
                  <p className={style.type_p2}>{employee?.gender}</p>
                </p>
              </div>
              <div className={style.mng_type_div}>
                <p className={style.type_p1}>
                  Birth date
                  <p className={style.type_p2}>
                    {dayjs(convertDateOfBirth).format("ddd MMM DD YYYY")}
                  </p>
                </p>
              </div>
              <div className={style.mng_type_div}>
                <p className={style.type_p1}>
                  Hiring
                  <p className={style.type_p2}>
                    {dayjs(convertJoinDate).format("ddd MMM DD YYYY")}
                  </p>
                </p>
              </div>
              <div className={style.mng_type_div}>
                <p className={style.type_p1}>
                  Job Title
                  <p className={style.type_p2}>{employee?.designation?.name}</p>
                </p>
              </div>
              <div className={style.mng_type_div}>
                <p className={style.type_p1}>
                  Employee Id
                  <p className={style.type_p2}>{employee?._id}</p>
                </p>
              </div>

              <div className={style.mng_type_div}>
                <p className={style.type_p1}>
                  Phone Number
                  <p className={style.type_p2}>{employee?.phone}</p>
                </p>
              </div>
              <div className={style.mng_type_div}>
                <p className={style.type_p1}>
                  Email ID
                  <p className={style.type_p2}>{employee?.email}</p>
                </p>
              </div>
              <div className={style.mng_type_div}>
                <p className={style.type_p1}>
                  Address
                  <p className={style.type_p2}>{employee?.branch?.branchName}</p>
                </p>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className={style.card_div3}>
            <h6>Emergency Contact</h6>
            <div className={style.main_type_div2}>
              <p className={style.type_p1}>
                Name
                <p className={style.type_p2}>Jone Deo</p>
              </p>
              <p className={style.type_p1}>
                Relationship
                <p className={style.type_p2}>Father</p>
              </p>
              <p className={style.type_p1}>
                Phone
                <p className={style.type_p2}>0000 0000</p>
              </p>
            </div>
            <div className={style.address_div}>
              <p className={style.type_p1}>
                Address
                <p className={style.type_p2}>
                  0000, Silver Business Point, Op Nayara Pump, Uttaran, Surat
                </p>
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className={style.card_div3}>
            <h6>Emergency Contact</h6>
            <div className={style.main_type_div2}>
              <p className={style.type_p1}>
                Name
                <p className={style.type_p2}>Jone Deo</p>
              </p>
              <p className={style.type_p1}>
                Relationship
                <p className={style.type_p2}>Father</p>
              </p>
              <p className={style.type_p1}>
                Phone
                <p className={style.type_p2}>0000 0000</p>
              </p>
            </div>
            <div className={style.address_div}>
              <p className={style.type_p1}>
                Address
                <p className={style.type_p2}>
                  0000, Silver Business Point, Op Nayara Pump, Uttaran, Surat
                </p>
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Personal;
