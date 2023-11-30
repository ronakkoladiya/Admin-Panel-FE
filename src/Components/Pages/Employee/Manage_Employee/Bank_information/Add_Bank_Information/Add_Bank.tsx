import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Add_Bank.module.css";
import { Box, Grid } from "@mui/material";
import TextFields from "../../../../../Views/Textfield/TextFields";

import { PostBankDetails } from "../../../../../../Redux/Actions/Bank";
import { useSelector, useDispatch } from "react-redux";

function AddBank() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, bankDetail } = useSelector((state: any) => ({
    userId: location.pathname.split("/")[2] || state?.auth?.userDetails?._id,
    bankDetail: state?.bank?.bankDetails,
  }));

  const [activeSave, setActiveSave] = useState(false);

  const [bankDetails, setBankDetails] = useState(
    bankDetail?  {
        userId: bankDetail.userId,
        bankName: bankDetail.bankName,
        accountNumber: bankDetail.accountNumber,
        ifsc: bankDetail.ifsc,
        upiNumber: bankDetail.upiNumber,
      }: {
      userId: userId,
      bankName: "",
      accountNumber: "",
      ifsc: "",
      upiNumber: "",
    }
  );

  const getBankDetails = (name: string, value: any) => {
    if (name === "accountNumber") {
      const updateValue = value.replace(/\D/g, "");

      setBankDetails((prevState: any) => ({
        ...prevState,
        [name]: updateValue.replace(/(\d{4}(?=\d))/g, "$1 "),
      }));
    } else {
      setBankDetails((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const saveHandler = async () => {
    console.log(bankDetails);
   
      await dispatch(PostBankDetails(bankDetails));
    
    navigate(-1);
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(bankDetails).every((value) =>
      Array.isArray(value) ? value.length > 0 : value !== ""
    );

    setActiveSave(allFieldsFilled);
  }, [bankDetails]);

  return (
    <>
      <Box sx={{ marginTop: "25px" }}>
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Grid item>
            <h2>Add Bank Information</h2>
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
            <p>Bank Name</p>
            <TextFields
              type={"text"}
              placeholder={"Bank Name"}
              name={"bankName"}
              value={bankDetails.bankName}
              onChange={(e: any) =>
                getBankDetails(e.target.name, e.target.value)
              }
            />
          </div>
          <div className={`${style.textField}`}>
            <p>Account Number</p>
            <TextFields
              type={"text"}
              placeholder={"Account Number"}
              name={"accountNumber"}
              value={bankDetails.accountNumber}
              onChange={(e: any) =>
                getBankDetails(e.target.name, e.target.value)
              }
            />
          </div>
          <div className={`${style.textField}`}>
            <p>IFSC</p>
            <TextFields
              type={"text"}
              placeholder={"IFSC"}
              name={"ifsc"}
              value={bankDetails.ifsc}
              onChange={(e: any) =>
                getBankDetails(e.target.name, e.target.value)
              }
            />
          </div>
          <div className={`${style.textField}`}>
            <p>UPI Number</p>
            <TextFields
              type={"number"}
              placeholder={"UPI Number"}
              name={"upiNumber"}
              value={bankDetails.upiNumber}
              onChange={(e: any) =>
                getBankDetails(e.target.name, e.target.value)
              }
            />
          </div>
        </section>
      </Box>
    </>
  );
}

export default AddBank;
