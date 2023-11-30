import React, { useEffect, useState } from "react";
import style from "./ManageDesignation.module.css";
import TextFields from "../../../Views/Textfield/TextFields";
import { useDispatch, useSelector } from "react-redux";
import {
  AddDesignation,
  DeleteDesignation,
  GetAllDesignation,
} from "../../../../Redux/Actions/Manage/Designation";
import { Grid } from "@mui/material";
import { MdDelete } from "react-icons/md";
import Button from "../../../Views/Button/Button";
import Table from "../../../Views/Table/Table";
import ConfirmModel from "../../../Views/ConfirmModel/ConfirmModel";
import { EmployeeApi } from "../../../../Redux/Actions";
import Model from "../../../Views/Model/Modal"
import FormModel from "../../../Views/Model/FormModel";
import { useNavigate } from "react-router-dom";

function ManageDesignation() {
  const [designation, setDesignation] = useState({ name: "" });
  const [activeSave, setActiveSave] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { DesignationAllData,AllUserData } = useSelector((state: any) => ({
    DesignationAllData: state?.designation?.list || [],
    AllUserData: state?.employee?.list || [],
  }));

  useEffect(() => {
    designation?.name !== "" ? setActiveSave(true) : setActiveSave(false);
  }, [designation]);

  useEffect(() => {
    dispatch(GetAllDesignation());
    dispatch(EmployeeApi());
  }, []);


  // for confirmation
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState("");
  const [message, setMessage] = useState("Confirm to delete designation");
  const handleClickOpen = (id: string) => {
    if(AllUserData.some((userData:any) => userData.designation?._id === id)){
      setMessage("This designation already exists in the data ")
       setOpen(true);
    }else{
      setMessage("Confirm to delete designation")
      setOpen(true);
    }
    setRowId(id);
  };
  const handleConfirmAction = async () => {
    await dispatch(DeleteDesignation(rowId));
    dispatch(GetAllDesignation());
    setOpen(false);
  };
  
  const actionButton = {
    label: 'Show',
    onClick: (() => Navigate(`/employee?designation=${rowId}`)),
  };

  return (
    <>
      <section className={`${style.manageDesig}`}>
        <h3>Manage Designation</h3>
        <Grid
          container
          sx={{
            mt: "40px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={12} sm={6}>
            <p>Add Designation</p>
            <TextFields
              value={designation.name}
              onChange={(e: any) => {
                setDesignation((prevstate) => ({
                  ...prevstate,
                  name: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid
            className={`${style.btnGrid}`}
            item
            xs={12}
            sm={6}
            sx={{ textAlign: "end" }}
          >
            <Button
              onClick={() => setDesignation({ name: "" })}
              text="Clear"
              sx={{
                backgroundColor: "#808297",
                color: "#FFFFFF",
                mr: "20px",
              }}
            >
              Clear
            </Button>
            <Button
              className={` ${!activeSave ? style.disabled : ""}`}
              text="Add"
              sx={{
                backgroundColor: "#8189FF",
                color: "#FFFFFF",
              }}
              onClick={async () => {
                await dispatch(AddDesignation(designation));
                dispatch(GetAllDesignation());
                setDesignation({ name: "" });
              }}
            ></Button>
          </Grid>
        </Grid>
        <Grid sx={{ marginTop: "40px" }}>
          <Table
            withindex
            columns={[
              { header: "Designation", field: "name" },
              {
                header: "Delete",
                field: "actions",
                renderInput: (row: any) => (
                  <>
                    <Button
                      // className={`${row.rowIndex < 2 ? style.disabled : ""}`}
                      text="DELETE"
                      sx={{
                        color: "red",
                        backgroundColor: "transparent",
                        border: "1px solid red",
                        fontSize: "12px",
                        padding: "6px 15px",
                      }}
                      startIcon={<MdDelete />}
                      onClick={() => handleClickOpen(row?.rowData?._id)}
                    />
                  </>
                ),
              },
            ]}
            data={DesignationAllData}
          />
        </Grid>
        <ConfirmModel
          onConfirm={() => handleConfirmAction()}
          open={open}
          onClose={() => setOpen(false)}
          message={message}
          actionButton={AllUserData.some((userData:any) => userData.designation?._id === rowId) && actionButton}
        />
      </section>
    </>
  );
}

export default ManageDesignation;
