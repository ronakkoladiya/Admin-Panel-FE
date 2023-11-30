import React from "react";

import Calender from "../../Views/Calender/Calender";
import Box from '@mui/material/Box';
//events
import {Events} from "./Events";

function Holiday() {
    return(
        <>
            <Box sx={{ margin: "25px 0"}}>
                <Calender events={Events}/>
            </Box>
        </>
    );
}

export default Holiday;