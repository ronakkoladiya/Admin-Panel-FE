import React, {useEffect} from "react";
import AutocompleteProps from "./Autocomplets.types";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// @ts-ignore
import styled from 'styled-components';

//edited TextField
const CustomTextField = styled(TextField)(() => ({
    outline: 'none',

    '& .MuiOutlinedInput-root':{
        paddingTop: '0',
        paddingBottom: '0',
        paddingLeft: '0'
    },
    '& label':{
        transform: 'translate(14px, 8px) scale(1)',
    },
    '& label.Mui-focused':{
        color: '#1976d2',
        transform: 'translate(15px, -8px) scale(0.75)',
    },
    '& .MuiInputBase-root':{
        '& .MuiInputBase-input':{
            padding: '8px 18px',
            outline: 'none',
            borderRadius: '8px',
            backgroundColor: 'white',
        },
        '&::before':{
            borderWidth: '2px',
            borderColor: '#8a8a8a',
        },
        '&::after':{
            borderColor: '#4b4b4b',
        },
        '& fieldset':{
            borderColor:'#8a8a8a',
            borderWidth: '2px',
            borderRadius: '8px',
            outline: 'none',
            transition: '.3s',
        },
        '&:hover fieldset':{
            borderColor: '#8a8a8a',
        },
        '&.Mui-focused fieldset':{
            borderColor: '#4b4b4b',
        },
    },
    '& .MuiFormHelperText-root':{
        position: 'absolute',
        top: '100%',
        color: 'red',
        marginLeft: '5px',
    },
}))

function Autocompletes({options, value, onChange, width, limitTags, placeholder, disabled, customValue}: AutocompleteProps) {

    const handleAutocompleteChange = (event: any, newValue: any) => {
        const uniqueValues = newValue.filter((valueOfNew:any, index:number, self:any) => {
            return index === self.findIndex((v:any) => v.id === valueOfNew.id);
        });

        onChange && onChange(uniqueValues);
    }


    const updatedValue = customValue
        ? value?.reduce((acc: any, val: any) => {
            const matchingOption = options.find((option: any) => option.id === val);
            if (matchingOption) {
                acc.push({ ...matchingOption, title: matchingOption?.title || val });
            }
            return acc;
        }, [])
        : value;

    return(
        <>

                <Autocomplete
                    filterSelectedOptions={true}
                    multiple
                    limitTags={limitTags || 1}
                    id="multiple-limit-tags"
                    options={value ? options.filter((option:any)=> !value?.includes(option?.id)) : options}
                    getOptionLabel={(options:any) => options.title || options}
                    sx={{ width: width || '100%' }}
                    onChange={handleAutocompleteChange}
                    disabled={disabled}
                    value={customValue ? updatedValue : value}
                    renderInput={(params) => <CustomTextField {...params} placeholder={placeholder} />}
                />
        </>
    );
}

export default Autocompletes;