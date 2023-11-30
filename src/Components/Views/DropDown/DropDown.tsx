import React, { useState,useEffect } from "react";
import { IProps } from "./DropDown.types";
import { styled } from "@mui/system";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { MdExpandMore } from "react-icons/md";

const DropDown = ({
  sx,
  labelName,
  variant,
  label,
  options,
  withoutlined,
  selectsx,
  onChange,
  defaultValue,
  onBlur,
  onFocus,
  optionsx,
  optionColor,
  error,
  value,
  multiple,
  IconComponent,
  enabled,
  ...props
}: IProps& React.ComponentProps<typeof Select> ) => {
  // State for selected values
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [multipleselectedValue, setMultipleSelectedValue] = useState([]);


  useEffect(()=>(
    setSelectedValue(value)

  ),[value])
  // Function to handle value change multiple and single
  const handleChange = (event: any) => {
    if (multiple) {
      // Handle multiple select
      setMultipleSelectedValue(event.target.value.filter((e: any) => e !== ""));
    } else {
      // Handle single select
      setSelectedValue( event.target.value);
    }
  };
  // Styled component for custom MenuItem
  const CustomMenuItemField = styled(MenuItem)(({ theme }) => ({
    width: optionsx?.width || selectsx?.width,
    color: optionsx?.color || "",
    outline: "none",
    margin: optionsx?.margin,
    padding: optionsx?.padding,
    fontSize: optionsx?.fontSize || "14px",
    fontWeight: optionsx?.fontWeight || "normal",
    background: optionsx?.background || "",
    backgroundColor: optionsx?.backgroundColor || "",
    border: optionsx?.border || "0px solid #ccc",
    borderRadius: optionsx?.borderRadius || "4px",
    letterSpacing: "0.5px",
    // Additional custom styles
    lineHeight: optionsx?.lineHeight || "",
    boxShadow: optionsx?.boxShadow || "none",
    transition: optionsx?.transition || "background-color 0.3s, color 0.3s",
    cursor: optionsx?.cursor || "pointer",
    "&:hover": {
      backgroundColor: optionsx?.backgroundColor || "",
      color: optionsx?.color || "",
    },
    "&:focus": {
      backgroundColor: optionsx?.backgroundColor || "",
      color: optionsx?.color || "",
      borderColor: optionsx?.borderColor || "",
    },
  }));
  // Styled component for custom Select
  const CustomSelectField = styled(Select)(({ theme }) => ({
    "&..Mui-disabled": {
      display: "none",
    },
    "& .MuiSelect-select": {
      // If value is empty, hide the selected value in the box
      color: labelName
          ? selectedValue || (multiple ? "inherit" : "transparent")
          : "inherit",
      backgroundColor: selectedValue ? "" : "transparent",
      outline: "none",
      padding:selectsx?.padding  || "8px 18px",
      fontSize:selectsx?.fontSize  || "1rem",
      width:"100%",
    },
    "& .MuiSelect-icon": {
      fontSize: selectsx?.fontSize || "20px",
      color: selectsx?.dropdowniconcolor || "#00032E",
    },
    "& .MuiSelect-outlined": {
      borderColor: selectsx?.borderColor || "#000",
    },
    width: selectsx?.width || "100%",
    color: selectsx?.color || "#333",
    margin: selectsx?.margin || "0px auto",
    padding: selectsx?.padding || "0px",
    fontSize: selectsx?.fontSize || "15px",
    fontWeight: selectsx?.fontWeight || 500,
    backgroundColor: selectsx?.backgroundColor || "#00000",
    border: selectsx?.border || "#4D4F6C",
    borderRadius: selectsx?.borderRadius || "10px",
    LineHeight: "16px",
    letterSpacing: "0.5px",
    // Additional custom styles
    lineHeight: selectsx?.lineHeight || "",
    boxShadow: selectsx?.boxShadow || "",
    transition: selectsx?.transition || "background-color 0.3s, color 0.3s",
    cursor: selectsx?.cursor || "pointer",
    "&:hover": {
      backgroundColor: selectsx?.backgroundColor || "#e00e0",
      color: selectsx?.color || "#333",
      borderColor: selectsx?.borderColor || "#4D4F6C",
      borderSize: "1.5px",
    },
    "&:focus": {
      backgroundColor: selectsx?.backgroundColor || "#fff",
      color: selectsx?.color || "#000",
      borderColor: selectsx?.borderColor || "#4D4F6C",
      borderWidth: "1.5px",
    },
    "&:disabled": {
      opacity: selectsx?.opacity || 0.6,
      cursor: selectsx?.cursor || "not-allowed",
      pointerEvents: selectsx?.pointerEvents || "none",
    },
    "&.Mui-error": {
      borderColor: selectsx?.borderColor || "red",
    },
    ".MuiOutlinedInput-notchedOutline": {
      border: error
          ? "2px solid red !important"
          : selectsx?.border || "2px solid #8A8A8A !important",
    },
  }));
  return (
      <>
        {/* Form control for dropdown */}
        <FormControl variant={variant || "outlined"} sx={{ width: "100%" }}>
          {!withoutlined && (
              <InputLabel
                  id={labelName}
                  sx={{
                    fontSize: selectsx?.fontSize || "16px",
                    fontWeight: selectsx?.fontWeight || 500,
                    outline: "none", // Change label border color when focused
                    color: error ? "red" : "#4D4F6C",
                    "&.Mui-focused": {
                      color: error ? "red" : "#4D4F6C", // Change label color when focused
                    },
                  }}
              >
                {labelName}
              </InputLabel>
          )}
          {/* Custom styled Select */}
          <CustomSelectField
              IconComponent={IconComponent || MdExpandMore}
              labelId={labelName}
              id="demo-simple-select"
              label={labelName} // Set the default label to "none"
              inputProps={{
                "aria-label": withoutlined ? "Without label" : "With label",
              }}
              displayEmpty
              onChange={(e:any)=>{onChange(e) || handleChange(e)}} // Function to handle value change
              value= {(multiple ? multipleselectedValue : selectedValue )}// Control the selected value using state (if using as a controlled component)
              onBlur={onBlur} // Function to handle blur event
              onFocus={onFocus} // Function to handle focus event
              multiple={multiple} // Set to true for multiple select
              sx={selectsx}
              {...props}
              defaultValue={selectedValue}
          >
            {/* Custom styled MenuItems */}
            {options.map((option: any, i: any) => (
                <CustomMenuItemField
                    key={i}
                    value={option.value}
                    selected = {!option.value}
                    disabled = {enabled? false : !option.value}
                    sx={{ ...optionsx} }
                >
                  { option.Text }
                </CustomMenuItemField>
            ))}
          </CustomSelectField>
        </FormControl>
      </>
  );
};
export default DropDown;