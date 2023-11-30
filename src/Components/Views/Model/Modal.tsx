import React, { useState } from "react";
import { styled } from "@mui/system";
import Button from "../Button/Button";
import { Box, Typography, Modal as MuiModal } from "@mui/material";
import { IProps } from "./Model.types";
import { MdClose } from "react-icons/md";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#00000003",
  border: "2px solid #000",
  p: 4,
  boxShadow: "0px 0px 6px 0px #00098140",
};
const Modal = ({
  sx,
  open,
  onClose,
  body,
  headding,
  cancelIcon,
  cancelBtn,
  ...props
}: IProps) => {
  // CustomModal component styling
  const CustomModal = styled(MuiModal)(({ theme }) => ({}));
  return (
    <>
      <CustomModal open={open} onClose={onClose} {...props}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "400px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            ...sx,
          }}
        >
          {/* Modal header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2>{headding || ""}</h2>
            {/* Cancel icon */}
            <Box sx={{ cursor: "pointer", fontSize: "24px" }}>
              {" "}
              {cancelIcon && (
                <Box onClick={onClose}>
                  <MdClose />
                </Box>
              )}
            </Box>
          </Box>
          {/* Modal body */}
          {body}
          {/* Cancel button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: "20px",
            }}
          >
            {cancelBtn && (
              <Button
                onClick={onClose}
                text="Cancel"
                sx={{ backgroundColor: "#FFA8C5", color: "#000981" }}
              />
            )}
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};

export default Modal;
