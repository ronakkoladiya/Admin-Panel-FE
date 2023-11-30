import React from 'react'
import { Grid } from '@mui/material'
import { PiBuildingsBold } from 'react-icons/pi'
import { RiUser2Fill } from 'react-icons/ri'
import { FaUserFriends, FaUserLock, FaUserTie, FaUsers } from 'react-icons/fa'
import style from './Over.module.css'

function Overall() {
    const branch = [
        {
            icon: <PiBuildingsBold />,
            p: 'Branches',
            div: 25
        },
        {
            icon: <FaUsers />,
            p: 'Employees',
            div: 25
        },
        {
            icon: <FaUserTie />,
            p: 'Manager',
            div: 25
        },
        {
            icon: <FaUserLock />,
            p: 'CTO',
            div: 25
        },
        {
            icon: <RiUser2Fill />,
            p: 'CEO',
            div: 25
        },
        {
            icon: <FaUserFriends />,
            p: 'HR',
            div: 25
        }
    ]

    return (
        <>
            <Grid className={style.overallmain_div} container spacing={{ xs: 2, md: 3, sm: 3 }}>
                {
                    branch.map(x => (
                        <Grid md={4} sm={6} xs={12} lg={4}>
                            <>
                                <div className={style.over_in}>
                                    <i className={style.over_icon}>{x.icon}</i>
                                    <p className={style.over_p}>{x.p}</p>
                                    <div className={style.over_div}>{x.div}</div>
                                </div>
                            </>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}

export default Overall