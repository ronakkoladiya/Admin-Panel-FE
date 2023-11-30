import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "../Button/Button";

const ConfirmModel = ({
  open,
  onClose,
  onConfirm,
  message,
  cancletext,
  confirmtext,
  canclesx,
  confirmsx,
  actionButton,
}: any) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message || "Are you sure you want to perform this action?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {actionButton && (
            <Button
              sx={{
                backgroundColor: "#FFA8C5",
                color: "#000981",
                fontSize: "12px",
                padding: "10px 15px",
              }}
              onClick={actionButton.onClick}
              color="primary"
              text={actionButton.label}
            />
          )}

          <Button
            onClick={() => onClose()}
            sx={{
              backgroundColor: "#808297",
              color: "#FFFFFF",
              fontSize: "12px",
              padding: "10px 15px",
              ...canclesx,
            }}
            text={cancletext || "Cancel"}
          />
          <Button
            onClick={() => handleConfirm()}
            sx={{
              backgroundColor: "#8189FF",
              color: "#FFFFFF",
              fontSize: "12px",
              padding: "10px 15px",
              ...confirmsx,
            }}
            text={confirmtext || "Confirm"}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmModel;
