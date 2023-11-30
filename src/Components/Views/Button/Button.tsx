import React from "react";
import { IProps } from "./Button.types";
import { styled } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button as propsButton } from "@mui/material";
const Button = ({
  className,
  sx,
  endIcon,
  startIcon,
  variant,
  loading,
  text,
  disabled,
  selected,
  onClick,
  ...props
}: IProps & React.ComponentProps<typeof propsButton>) => {
  // Styled component for the custom button
  const CustomButton = styled(LoadingButton)(({ theme }) => ({
    width: sx?.width,
    fontSize: sx?.fontSize || "16px",
    borderRadius: sx?.borderRadius || "6px",
    fontWeight: sx?.fontWeight || "500",
    fontStyle: sx?.fontStyle || "normal",
    textTransform: sx?.textTransform || "capitalize",
    color: disabled ? "gray" : sx?.color || (selected ? "#FFFFFF" : "#808297"),
    boxShadow: sx?.shadow || "none",
    padding: sx?.padding || "13px 27px",
    lineHeight: sx?.lineHeight || "14px",
    letterSpacing: sx?.letterSpacing || "-0.01em",
    textAlign: sx?.textAlign || "center",
    backgroundColor: sx?.backgroundColor || (selected ? "#8189FF" : "#FFFFFF"),
    "& .MuiCircularProgress-root": {
      color: sx?.lodingcolor || "white",
      width: sx?.lodingwidth || "25px !important",
      height: sx?.lodingheight || "25px !important",
    },
    "&:hover": {
      color: disabled
        ? "gray"
        : sx?.color || (selected ? "#FFFFFF" : "#808297"),
      boxShadow: sx?.shadow || "none",
      backgroundColor:
        sx?.backgroundColor || (selected ? "#8189FF" : "#FFFFFF"),
      outline: sx?.outline || "none",
    },
    "&:focus": {
      // Add your focus styles here
      color: disabled
        ? "gray"
        : sx?.color || (selected ? "#FFFFFF" : "#808297"),
      boxShadow: sx?.shadow || "none",
      backgroundColor:
        sx?.backgroundColor || (selected ? "#8189FF" : "#FFFFFF"),
      outline: sx?.outline || "none",
      // You can add more styling as needed
    },
    "&:active": {
      transform: "none", // Add your desired animation effect
      transition: "none", // Add a smooth transition
    },
  }));
  return (
    <>
      {/* Custom styled button */}
      <CustomButton
        className={className}
        sx={sx}
        variant={variant || "contained"}
        startIcon={startIcon}
        endIcon={endIcon}
        loading={loading}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {text || "Sign in"}
      </CustomButton>
    </>
  );
};

export default Button;
