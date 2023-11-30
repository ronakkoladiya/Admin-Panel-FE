import React, {useEffect} from "react";
import Table from "../../Views/Table/Table";
import { Box } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import Button from "../../Views/Button/Button";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GetAllLeaveApi} from "../../../Redux/Actions/Leave";

const columns = [
  { header: "Apply Date", field: "createdAt" },
  { header: "Reason", field: "reasonDescribe" },
  { header: "From Date", field: "fromDate" },
  { header: "To Date", field: "toDate" },
  { header: "Type", field: "leaveType" },
  { header: "Status", field: "status" },
];

const Leave = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allLeaves = useSelector((state:any) => state?.leave?.list);

  const formattedLeaves = allLeaves?.map((item:any) => ({
    ...item,
    fromDate: new Date(item.fromDate).toLocaleDateString("en-GB"),
    toDate: new Date(item.toDate).toLocaleDateString("en-GB"),
    createdAt: new Date(item.createdAt).toLocaleDateString("en-GB"),
  }));

  useEffect(() => {
    dispatch(GetAllLeaveApi());
  },[]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "32px 0 30px 0",
        }}
      >
        <Box>
          <Button
            text="Add"
            onClick={() => navigate("/leave/createleave")}
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
      <Box>
        <Table withindex columns={columns} data={formattedLeaves} pagination/>
      </Box>
    </>
  );
};

export default Leave;
