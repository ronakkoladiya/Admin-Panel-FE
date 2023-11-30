import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import style from "./AddEmployee.module.css";
import { GetTechnologyApi } from "../../../../Redux/Actions/Project";
import TextFields from "../../../Views/Textfield/TextFields";
import DatePicker from "../../../Views/date-picker/DatePicker";
import DropDown from "../../../Views/DropDown/DropDown";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  AddEmployeeApi,
  GetDesignationApi,
  GetBranchApi,
  EmployeeApiById,
  UpdateEmployeeApi,
} from "../../../../Redux/Actions/Emplyoee";

function AddEmployee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tabParam = params.get("subtab");
  const [activeSave, setActiveSave] = useState(false);

  const employeeId = location.pathname.split("/")[2];

  let { getDesignation, getBranch, getTech, editEmployee, userRole } =
    useSelector((state: any) => ({
      getDesignation: state?.designation?.list || [],
      getBranch: state?.branch?.list || [],
      getTech: state?.technology?.list || [],
      editEmployee: state?.employee?.detail?.[employeeId] || {},
      userRole: state?.auth?.userDetails?.userRole,
    }));

  const formattedJD = dayjs(editEmployee.joinDate).format("MM-DD-YYYY");
  const formattedDOB = dayjs(editEmployee.dateOfBirth).format("MM-DD-YYYY");

  const [userData, setUserData] = useState(
    tabParam === "editpersonalinfo"
      ? {
          firstName: editEmployee.firstName,
          middleName: editEmployee.middleName,
          lastName: editEmployee.lastName,
          email: editEmployee.email,
          designation: editEmployee?.designation?._id,
          gender: editEmployee.gender,
          phone: editEmployee.phone,
          branch: editEmployee?.branch?._id,
          joinDate: formattedJD,
          dateOfBirth: formattedDOB,
          password: editEmployee?.password,
          confirmPassword: editEmployee?.confirmPassword,
          technology: editEmployee.technology,
          userType: editEmployee.userType,
          userRole: userRole?._id || "64f187284cef0b80411eb6ca",
        }
      : {
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          designation: "",
          gender: "",
          phone: "",
          branch: "",
          joinDate: "",
          dateOfBirth: "",
          password: "",
          confirmPassword: "",
          technology: "",
          userType: "",
          userRole: userRole?._id || "64f187284cef0b80411eb6ca",
        }
  );

  const getUserData = (name: string, value: any) => {
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveHandler = () => {
    if (tabParam === "editpersonalinfo") {
      dispatch(UpdateEmployeeApi(userData, employeeId));
    } else {
      dispatch(AddEmployeeApi(userData));
    }
    navigate(-1);
  };

  useEffect(() => {
    const passwordMatch = userData.password === userData.confirmPassword;
    const allFieldsFilled = Object.values(userData).every((value) =>
      Array.isArray(value) ? value.length > 0 : value !== ""
    );

    setActiveSave(allFieldsFilled && passwordMatch);
  }, [userData]);

  useEffect(() => {
    dispatch(GetDesignationApi());
    dispatch(GetBranchApi());
    dispatch(GetTechnologyApi());
    if (employeeId && employeeId !== 'add-employee') {
      dispatch(EmployeeApiById({ id: employeeId }));
    }
  }, []);

  return (
    <>
      <Box
        sx={{ marginTop: `${tabParam === "editpersonalinfo" ? "25px" : "0"}` }}
      >
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Grid item>
            <h2>{`${
              tabParam === "editpersonalinfo" ? "Edit Employee" : "Add Employee"
            }`}</h2>
          </Grid>
          <Grid
            className={`${style.actionBtns}`}
            item
            sx={{ display: "flex", alignItems: "center" }}
          >
            <button
              className={`${style.cancelBtn}`}
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              className={`${style.saveBtn} ${
                !activeSave ? style.disabled : ""
              }`}
              onClick={saveHandler}
            >
              Save
            </button>
          </Grid>
        </Grid>
        <section className={`${style.formSec}`}>
          <div className={`${style.textField}`}>
            <p>First Name</p>
            <TextFields
              type={"text"}
              placeholder={"First Name"}
              name={"firstName"}
              value={userData.firstName}
              onChange={(e: any) => getUserData(e.target.name, e.target.value)}
            />
          </div>
          <div className={`${style.textField}`}>
            <p>Middle Name</p>
            <TextFields
              type={"text"}
              placeholder={"Middle Name"}
              name={"middleName"}
              value={userData.middleName}
              onChange={(e: any) => getUserData(e.target.name, e.target.value)}
            />
          </div>
          <div className={`${style.textField}`}>
            <p>Last Name</p>
            <TextFields
              type={"text"}
              placeholder={"Last Name"}
              name={"lastName"}
              value={userData.lastName}
              onChange={(e: any) => getUserData(e.target.name, e.target.value)}
            />
          </div>
          <div className={`${style.textField}`}>
            <p>Email</p>
            <TextFields
              type={"email"}
              placeholder={"Email"}
              name={"email"}
              value={userData.email}
              onChange={(e: any) => getUserData(e.target.name, e.target.value)}
            />
          </div>
          <div className={`${style.textField}`}>
            <p>Password</p>
            <TextFields
              type={"password"}
              placeholder={"Password"}
              name={"password"}
              value={userData.password}
              onChange={(e: any) => getUserData(e.target.name, e.target.value)}
            />
          </div>
          <div className={`${style.textField}`}>
            <p>Confirm Password</p>
            <TextFields
              type={"password"}
              placeholder={"Confirm Password"}
              name={"confirmPassword"}
              value={userData.confirmPassword}
              onChange={(e: any) => getUserData(e.target.name, e.target.value)}
            />
          </div>
          <div className={`${style.textField}`}>
            <p>Designation</p>
            <DropDown
              value={userData.designation || ""}
              options={[
                { value: "", Text: "Designation" },
                ...getDesignation?.map((item: any) => ({
                  value: item._id,
                  Text: item.name,
                })),
              ]}
              onChange={(e: any) => getUserData("designation", e.target.value)}
            />
          </div>
          <div className={`${style.textField}`}>
            <p>Gender</p>
            <DropDown
              value={userData.gender || ""}
              options={[
                { value: "", Text: "Gender" },
                { value: "male", Text: "Male" },
                { value: "female", Text: "Female" },
              ]}
              onChange={(e: any) => getUserData("gender", e.target.value)}
            />
          </div>
          <div className={`${style.textField}`}>
            <p>Date Of Birth</p>
            <DatePicker
              header="Date of Birth"
              dateField
              value={userData.dateOfBirth}
              onChange={(newDate: any) => getUserData("dateOfBirth", newDate)}
            />
          </div>
          <div className={`${style.textField}`}>
            <p>Phone</p>
            <TextFields
              type={"number"}
              placeholder={"Phone"}
              name={"phone"}
              value={userData.phone}
              onChange={(e: any) => getUserData(e.target.name, e.target.value)}
            />
          </div>
          <div className={`${style.textField}`}>
            <p>Branch</p>
            <DropDown
              value={userData.branch || ""}
              options={[
                { value: "", Text: "Branch" },
                ...getBranch?.map((item: any) => ({
                  value: item._id,
                  Text: item.branchName,
                })),
              ]}
              onChange={(e: any) => getUserData("branch", e.target.value)}
            />
          </div>
          <div className={`${style.textField}`}>
            <p>Join Date</p>
            <DatePicker
              header="Joining Date"
              dateField
              value={userData.joinDate}
              onChange={(newDate: any) => getUserData("joinDate", newDate)}
            />
          </div>
          <div className={`${style.textField}`}>
            <p>Technology</p>
            <DropDown
              value={userData.technology || ""}
              options={[
                { value: "", Text: "Technology" },
                ...getTech?.map((item: any) => ({
                  Text: item.name,
                  value: item._id,
                })),
              ]}
              onChange={(e: any) => getUserData("technology", e.target.value)}
            />
          </div>
          <div className={`${style.textField}`}>
            <p>User Type</p>
            <DropDown
              value={userData.userType || ""}
              options={[
                { value: "", Text: "User Type" },
                { value: "admin", Text: "Admin" },
                { value: "employee", Text: "Employee" },
              ]}
              onChange={(e: any) => getUserData("userType", e.target.value)}
            />
          </div>
        </section>
      </Box>
    </>
  );
}

export default AddEmployee;
