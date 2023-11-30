import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import style from "./ManageTechnology.module.css";
import TextFields from "../../../Views/Textfield/TextFields";
import { useDispatch, useSelector } from "react-redux";
import {
  AddTechnology,
  DeleteTechnology,
} from "../../../../Redux/Actions/Manage/Technology";
import { GetTechnologyApi } from "../../../../Redux/Actions/Project";
import { MdDelete } from "react-icons/md";
import Table from "../../../Views/Table/Table";
import Button from "../../../Views/Button/Button";
import ConfirmModel from "../../../Views/ConfirmModel/ConfirmModel";

function ManageTechnology() {
  const [technology, setTechnology] = useState({ name: "" });
  const [activeSave, setActiveSave] = useState(false);
  const dispatch = useDispatch();

  const allTech = useSelector((state: any) => state?.technology?.list);

  useEffect(() => {
    technology?.name !== "" ? setActiveSave(true) : setActiveSave(false);
  }, [technology]);

  useEffect(() => {
    dispatch(GetTechnologyApi());
  }, []);

  // for confirmation
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState("");
  const handleClickOpen = (id: string) => {
    setOpen(true);
    console.log(open);
    setRowId(id);
  };
  const handleConfirmAction = async () => {
    await dispatch(DeleteTechnology(rowId));
    dispatch(GetTechnologyApi());
    setOpen(false);
  };
  return (
    <>
      <section className={`${style.manageTech}`}>
        <h3>Manage Technology</h3>
        <Grid
          container
          sx={{
            mt: "40px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={12} sm={6}>
            <p>Add Technology</p>
            <TextFields
              value={technology.name}
              onChange={(e: any) => {
                setTechnology((prevstate) => ({
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
              onClick={() => setTechnology({ name: "" })}
              text="Clear"
              sx={{
                backgroundColor: "#808297",
                color: "#FFFFFF",
                mr: "20px",
              }}
            />
            <Button
              className={` ${!activeSave ? style.disabled : ""}`}
              text="Add"
              sx={{
                backgroundColor: "#8189FF",
                color: "#FFFFFF",
              }}
              onClick={async () => {
                await dispatch(AddTechnology(technology));
                dispatch(GetTechnologyApi());
                setTechnology({ name: "" });
              }}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ mt: "40px" }}>
          <Table
            withindex
            columns={[
              { header: "Technology", field: "name" },
              { header: "Language", field: "name" },
              {
                header: "Actions",
                field: "actions",
                renderInput: ({ rowData, rowIndex }: any) => (
                  <div>
                    <Button
                      className={`${rowIndex <= 3 ? style.disabled : ""}`}
                      text="DELETE"
                      sx={{
                        color: "red",
                        backgroundColor: "transparent",
                        border: "1px solid red",
                        fontSize: "12px",
                        padding: "6px 15px",
                      }}
                      startIcon={<MdDelete />}
                      onClick={() => handleClickOpen(rowData._id)}
                    />
                  </div>
                ),
              },
            ]}
            data={allTech}
          />
        </Grid>
        <ConfirmModel
          onConfirm={() => handleConfirmAction()}
          open={open}
          onClose={() => setOpen(false)}
        />
      </section>
    </>
  );
}

export default ManageTechnology;
