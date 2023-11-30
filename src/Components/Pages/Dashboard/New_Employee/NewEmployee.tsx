import React from 'react'
import  style  from './NewEmployee.module.css'
import {Box, Grid} from "@mui/material";
import DatePicker from "../../../Views/date-picker/DatePicker";
import EmployeeList from "../../Employee/EmployeesList";
import {useNavigate} from "react-router-dom";
import {paths} from "../../../../Utiles/constant";

const NewEmployee = () => {

    const navigate = useNavigate();

    return (
        <>
            <Box sx={{margin: '15px 0'}}>
              <Grid className={`${style.titleWrapper}`} container sx={{justifyContent: 'space-between'}}>
                <Grid item>
                  <h2>New Employee</h2>
                </Grid>
                <Grid className={`${style.btnDiv}`} item sx={{display: 'flex', alignItems: 'center'}}>
                  <button
                      className={`${style.addEmployeeBtn}`}
                      onClick={() => navigate(`${paths.newEmployee}${paths.addEmployee}`)}
                  >
                      + Add
                  </button>
                  <DatePicker/>
                </Grid>
              </Grid>
            </Box>

            <EmployeeList/>
        </>
    )
}

export default NewEmployee