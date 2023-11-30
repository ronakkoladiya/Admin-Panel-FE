import React from 'react'
import NavigationTab from '../../../../Views/NavigationTab/NavigationTab'
import {Persnol} from '../Persnol_Information'
import {Bank} from '../Bank_information'
import {Document} from '../Document_Information'
import {Other} from '../Other_Information'
import { useLocation, useNavigate } from 'react-router'
import { AttendanceDetails } from '../Other_Information/AttendanceDetails'
import { SalaryDetails } from '../Other_Information/SalaryDetails'
import { Report } from '../../../Report'
import {AddEmployee} from "../../../Dashboard/Add_Employee";
import AddBank from "../Bank_information/Add_Bank_Information/Add_Bank";

const EmployeeRouting = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tabParam = params.get("subtab");

  const tabs = [
    {
      label: "Personal Information",
      tab: `personalinfo`,
      component: tabParam==='editpersonalinfo' ? <AddEmployee/> : <Persnol />,
    },
    {
      label: "Bank Information",
      tab: `bankinfo`,
      component: tabParam==='editbankinfo' ? <AddBank/> : <Bank />,
    },
    {
      label: "Document Information",
      tab: `docinfo`,
      component: <Document />,
    },
    {
      label: "Other Information",
      tab: `otherinfo`,
      component: tabParam === 'attendancedetails' ? <AttendanceDetails/> : tabParam === 'salarydetails' ? <SalaryDetails/> : <Other />,
    },
    {
      label: "Report",
      tab: `report`,
      component:  <Report/>,
    },
  ];

  return (
    <>
      <NavigationTab tabs={tabs} />
    </>
  )
}

export default EmployeeRouting