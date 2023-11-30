import {Alert, Collapse, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, {useEffect, useState} from "react";
import LoginToasterTypes from "./LoginToaster.types";

function LoginToaster({message, severity, margin}: LoginToasterTypes){

    const [open, setOpen] = useState(true);

    return(
        <>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ margin: margin }}
                    severity={severity}
                >
                    {message}
                </Alert>
            </Collapse>
        </>
    );
}

export default LoginToaster;