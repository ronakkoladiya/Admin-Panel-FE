import React, { useEffect, useMemo } from 'react';
import style from './manage.module.css'
import img1 from '../../../../Assest/mg_img1.png'
import { BiSolidPencil } from 'react-icons/bi'
import {useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeeApiById, IEmployeeDetails } from '../../../../Redux/Actions';
import {EmployeeRouting} from './Manage_Employee_Routing';
import {Simulate} from "react-dom/test-utils";
import {Skeleton, Stack} from '@mui/material';
import { MdLocationOn } from "react-icons/md";
import Classes from "../employee.module.css";

function Manage_Employee() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    const subTabParam = `${
        tabParam==='personalinfo' ? 'editpersonalinfo'
            : tabParam==='bankinfo' ? 'editbankinfo'
            : tabParam==='docinfo' && 'editdocinfo'
    }`

    const employeeId = useMemo(() => location.pathname.split('/')[2], [location.pathname]);
    const employeeLoginId = useSelector((state:any) => state?.auth?.userDetails?._id );
    const employee = useSelector((state: any) => state?.employee?.detail?.[employeeId || employeeLoginId] || {});

    useEffect(() => {
        dispatch(EmployeeApiById({ id:( employeeId || employeeLoginId) } as IEmployeeDetails))
    }, []);

    return (
        <>
            {
                employee?.firstName
                    ?
                    <div className={style.manage_main}>
                        <div className={style.main_card}>
                            <div className={style.imgDiv}>
                                <img src={img1} alt="" className={style.mg_img} />
                                <div className={style.mng_text_div}>
                                    <p className={style.mng_p1}>{`${employee?.firstName} ${employee?.lastName}`}
                                        <span className={style.mng_span}>Active</span>
                                    </p>
                                    {employee?.branch && <p className={style.mng_p2}><MdLocationOn className={Classes.locationIco}/>{employee?.branch?.branchName}</p>}
                                    {employee?.designation && <p className={style.mng_p3}>{employee?.designation?.name}</p>}
                                </div>
                            </div>
                            <div className={style.mng_btn_div}>
                                <button className={style.mng_btn}
                                        onClick={() => navigate(`${location.pathname}?tab=${tabParam}&&subtab=${subTabParam}`)}
                                >
                                    <i className={style.mng_icon}><BiSolidPencil /></i>Edit
                                </button>
                            </div>
                        </div>

                        <EmployeeRouting />
                    </div>
                    :
                    <Stack spacing={1}>
                        <Skeleton variant="rounded" sx={{width: '100%', height: '252px'}} />
                    </Stack>
            }
        </>
    )
}

export default Manage_Employee