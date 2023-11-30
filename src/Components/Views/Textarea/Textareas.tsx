import React from "react";

//css
import style from "./Textareas.module.css";

//textarea
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
// @ts-ignore
import styled from 'styled-components';

//types
import TextAreasTypes from "./Textareas.types";

//custom textarea
const StyledTextarea = styled(TextareaAutosize)((props: any) => `
    width: ${props.width || '100%'};
    font-size: 1rem;
    padding: 8px 18px;
    border-width: 2px;
    background-color: ${props.backgroundColor || 'white'};
    color: ${props.textColor};
    border-color: ${props.borderColor || '#8a8a8a'};
    border-radius: 8px;
    transition: .3s;
    resize: ${props.resize};
    
    &:hover {
      border-color: ${props.borderColor || '#8a8a8a'};
    }
    
    &:focus {
      border-color: ${props.focusedBorderColor || '#4b4b4b'};
    }
    
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

function TextAreas({
  name,
    value,
    width,
    placeholder,
    disabled,
    minRows,
    maxRows,
    textColor,
    backgroundColor,
    borderColor,
    focusedBorderColor,
    resize,
    onChange
} :TextAreasTypes){
    return(
            <StyledTextarea
            name={name}
                value={value}
                width={width}
                placeholder={placeholder}
                minRows={minRows}
                maxRows={maxRows}
                textColor={textColor}
                backgroundColor={backgroundColor}
                borderColor={borderColor}
                focusedBorderColor={focusedBorderColor}
                resize={resize}
                disabled={disabled}

                onChange={(e:any) => {
                    onChange && onChange(e);
                }}
            />
    );
}

export default TextAreas;