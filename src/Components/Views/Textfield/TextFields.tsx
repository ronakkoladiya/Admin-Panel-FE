import React, {useEffect, useState} from "react";

//css
import style from "./TextFields.module.css";

//MUI
import { TextField } from '@mui/material';
// @ts-ignore
import styled from 'styled-components';

//icons
import { BsEye, BsEyeSlash } from "react-icons/bs";

//types
import TextFieldsProps from "./Textfields.types";

//edited TextField
const CustomTextField = styled(TextField)((props: any) => ({
    outline: 'none',

    '& label':{
        transform: 'translate(14px, 8px) scale(1)',
    },
    '& label.Mui-focused':{
        color: props.labelColor || '#1976d2',
        transform: 'translate(15px, -8px) scale(0.75)',
    },
    '& .MuiInputBase-root':{
        '& .MuiInputBase-input':{
            
            padding: props.sx?.padding || '8px 18px',
            outline: 'none',
            borderRadius: '8px',
            color: props.textColor,
            backgroundColor: props.backgroundColor || 'white',
        },
        '&::before':{
            borderWidth: '2px',
            borderColor: props.borderColor || '#8a8a8a',
        },
        '&::after':{
            borderColor: props.borderColor || '#4b4b4b',
        },
        '& fieldset':{
            borderColor: props.borderColor || '#8a8a8a',
            borderWidth: '2px',
            borderRadius: '8px',
            outline: 'none',
            transition: '.3s',
        },
        '&:hover fieldset':{
            borderColor: props.borderColor ||'#8a8a8a',
        },
        '&.Mui-focused fieldset':{
            borderColor: props.focusedBorderColor || '#4b4b4b',
        },
    },
    '& .MuiFormHelperText-root':{
        position: 'absolute',
        top: '100%',
        color: props.helperTextColor || 'red',
        marginLeft: '5px',
    },
}));

function TextFields({
    type,
    label,
    variant,
    placeholder,
    width,
    autocomplete,
    value,
    name,
    required,
    disabled,
    helperText,
    textColor,
    borderColor,
    focusedBorderColor,
    labelColor,
    helperTextColor,
    backgroundColor,
    readOnly,
    sx,
    onChange,
    onBlur
} :TextFieldsProps){

    const [showPassword, setShowPassword] = useState(false); //to set button and type

    //toggle's the eye button
    const handleTogglePassword = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    return(
        <div className={`${style.textbox}`} style={{width: width ? width : '100%'}}>
            <CustomTextField id="outlined-basic"
                             type={type === 'password' ? (showPassword ? "text" : "password") : type}
                             label={label}
                             variant={variant || 'outlined'}
                             placeholder={placeholder}
                             fullWidth={true}
                             value={value}
                             name={name}
                             helperText={helperText}
                             autoComplete={autocomplete}
                             required={required}
                             disabled={disabled}
                             textColor={textColor}
                             borderColor={borderColor}
                             focusedBorderColor={focusedBorderColor}
                             labelColor={labelColor}
                             helperTextColor={helperTextColor}
                             backgroundColor={backgroundColor}
                             sx={sx}
                             InputProps={{
                                 readOnly: readOnly,
                             }}

                             onBlur={(e:any) => {
                                 onBlur && onBlur(e);
                             }}

                onChange={(e:any) => {
                    onChange && onChange(e);
                }}
            />
            {
                type === 'password' &&
                (showPassword ? (
                    <BsEye className={`${style.eyebtn}`} onClick={handleTogglePassword} />
                ) : (
                    <BsEyeSlash className={`${style.eyebtn}`} onClick={handleTogglePassword} />
                ))
            }
        </div>
    );
}

export default TextFields;