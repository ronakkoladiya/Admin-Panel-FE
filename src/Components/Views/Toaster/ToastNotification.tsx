import { Portal } from "@mui/base";
import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import style from "./ToastNotification.module.css";



const CircularProgressWithLabel = (props:any) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        className={style.bottom}
        size={30}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        size={30}
        variant="determinate"
        className={style.circularProgress}
        {...props}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        // backgroundColor="#fff"
      >
        <Typography
          className={style.circularText}
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(
          props.gap - ((100 - props.value) * props.gap) / 100
        )}`}</Typography>
      </Box>
    </Box>
  );
}

const ToastNotification = ({
  classes,
  title,
  variant,
  open,
  close,
  verticalPosition = "top",
  horizontalPosition = "center",
  actionText = "Ok",
  duration = 5000,
  gap = 5,
}: any) => {
 
 

  const [progress, setProgress] = React.useState(100);
  const handleClose = () => {
    close(false);
  };

  React.useEffect(() => {
    if (open) {
      const timer = setInterval(() => {
        if (progress - 100 / gap > 0) {
          setProgress((prevProgress) => prevProgress - 100 / gap);
        } else {
          clearInterval(timer);
          handleClose(); // Close the toast when the progress reaches 0
        }
      }, Math.round(duration / gap));
  
      return () => {
        clearInterval(timer);
      };
    }
  }, [progress, open]);
  

  return (
    <Portal>
      {open && (
        <Snackbar
          open={open}
          anchorOrigin={{
            vertical: verticalPosition,
            horizontal: horizontalPosition,
          }}
          autoHideDuration={duration}
          className={style.snackbarStyle}
        >
          <SnackbarContent
            aria-describedby="message-id2"
            className={style.snackbarStyle}
            sx={{
              "& .MuiSnackbarContent-message": {
                width: "100%",
              },
            }}
            message={
              <div className={style.snackbar}>
                <div className={style.snackbarTitle}>
                  {variant === "error" && (
                    <ErrorOutlineIcon className={style.snackbarIcon} />
                  )}
                  {variant !== "error" && (
                    <DoneIcon className={style.doneIcon} />
                  )}
                  {title}
                </div>
                <div className={style.snackbarCancel} onClick={handleClose}>
                  {actionText}
                </div>
                <CircularProgressWithLabel
                  value={progress}
                  gap={gap}
                  classes={classes}
                />
              </div>
            }
          />
        </Snackbar>
      )}
    </Portal>
  );
};

export default ToastNotification;
