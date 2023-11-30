import React, {useEffect, useState} from 'react'
import Style from './LeaveEmployee.module.css'
import { Button, Box } from '@mui/material';
import DatePicker from "../../../Views/date-picker/DatePicker";
import {GetAllLeaveApi, UpdateStatusApi} from "../../../../Redux/Actions/Leave";
import {useDispatch, useSelector} from "react-redux";
import Table from "../../../Views/Table/Table";

const LeaveEmployee = () => {

  const dispatch = useDispatch();
  const allLeaves = useSelector((state:any) => state?.leave?.list);
  const [formattedLeaves, setFormattedLeaves] = useState([]);

  useEffect(() => {
    setFormattedLeaves(
        allLeaves?.map((item:any) => ({
          ...item,
          fromDate: new Date(item.fromDate).toLocaleDateString('en-GB'),
          toDate: new Date(item.toDate).toLocaleDateString('en-GB'),
          name: `${item.userId.firstName} ${item.userId.lastName}`,
        }))
    );
  }, [allLeaves]);

  const handleStatus = (leaveId:string, status:string) => {
    dispatch(UpdateStatusApi({leaveId, status}));

    const updatedLeaves:any = formattedLeaves.map((item:any) =>
        item._id === leaveId ? { ...item, status } : item
    );

    setFormattedLeaves(updatedLeaves);
  }

  const columns = [
    { header: "Name", field: "name" },
    { header: "From", field: "fromDate" },
    { header: "To", field: "toDate" },
    { header: "Reason", field: "reasonDescribe" },
    { header: "Type", field: "leaveType" },
    {
      header: "Status",
      field: "status",
      renderInput: ({rowData, rowIndex}: any) => (
          <div>
            {
              rowData.status === "Approved"
                  ? <Button className={`${Style.Approved}`} style={{pointerEvents: 'none'}}>Approved</Button>
                  : rowData.status === "Declined"
                  ? <Button className={`${Style.Decline}`} style={{pointerEvents: 'none'}}>Declined</Button>
                  : <>
                    <Button className={`${Style.Approved}`}
                            onClick={() => handleStatus(rowData._id, "Approved")}>Approve</Button>
                    <Button className={`${Style.Decline}`}
                            onClick={() => handleStatus(rowData._id, "Declined")}>Decline</Button>
                  </>
            }
          </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(GetAllLeaveApi());
  },[]);

  return (
    <>
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "end" }}>
        <DatePicker/>
      </Box>
      <Box sx={{mt: '20px'}}>
        <Table withindex columns={columns} data={formattedLeaves} pagination/>
      </Box>
    </>
  )
}

export default LeaveEmployee