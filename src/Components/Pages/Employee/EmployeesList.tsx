import {useState, useEffect} from 'react';
import Classes from './employee.module.css'
// import { BsPlus } from 'react-icons/bs'
// import { LuCalendarDays } from 'react-icons/lu'
import {FormControl,Paper} from '@mui/material';
import {AiOutlineSearch} from 'react-icons/ai';
import img5 from '../../../Assest/Ellipse 30 (4).jpg';
import {useDispatch, useSelector} from 'react-redux';
import {EmployeeApi, IEmployeeList} from '../../../Redux/Actions';
import {useNavigate, useLocation} from 'react-router-dom';
import {paths} from "../../../Utiles/constant";
import {Grid} from "@mui/material"
import { FiAlertOctagon } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import {GetUserByDesignationID} from "../../../Redux/Actions/Emplyoee";

const EmployeeList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const tabParam = params?.get("designation");

    const employeeList = useSelector((store: any) => store?.employee?.list) || [];
    const handleCardClick = (id: string) => navigate(`${paths.employee}/${id}?tab=personalinfo`);

    const [searchInput, setSearchInput] = useState('');
    const filteredEmployeeList = employeeList.filter(({ firstName, lastName }: any) =>
        (`${firstName} ${lastName}`.toLowerCase().includes(searchInput.toLowerCase()) ||
            `${firstName}${lastName}`.toLowerCase().includes(searchInput.toLowerCase()))
    );

    useEffect(() => {
        if(tabParam){
            dispatch(GetUserByDesignationID(tabParam))
        }
        else{
            dispatch(EmployeeApi())
        }
    }, [location,location.search]);

    return (
        <>
            <div className={Classes.emp_main}>

                <div className={Classes.emp_card}>
                    <div className={Classes.emp_ser}>
                        <FormControl sx={{width: '300px'}}>
                            <input type="search"
                                   placeholder='Search'
                                   className={Classes.emp_search}
                                   value={searchInput}
                                   onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <i className={Classes.emp_icon}><AiOutlineSearch/></i>
                        </FormControl>

                        <FormControl>
                            <select className={Classes.emp_select}>
                                <option className={Classes.emp_option} value="0">Last Week</option>
                                <option value="1">1 Day</option>
                                <option value="2">2 Day</option>
                            </select>
                        </FormControl>
                    </div>


                    <Grid container className={Classes.employeeCardBoxContainer} spacing={3}>
                        {
                            filteredEmployeeList?.map(({_id, firstName, lastName, branch, designation, technology}: any) => (
                                <Grid item
                                        xs={12} sm={6} lg={4}
                                        key={_id}
                                >
                                    <Paper className={Classes.employeeCardBox} onClick={() => handleCardClick(_id)}>
                                        <div>
                                            <img src={img5} alt="" className={Classes.profileImage}/>
                                        </div>
                                        <div className={Classes.employeeDetailBox}>
                                            <p className={Classes.employeeName}>{`${firstName} ${lastName}`}</p>
                                            {branch ? <p className={Classes.employeeBranch}><MdLocationOn className={Classes.locationIco}/>{branch?.branchName}</p> : <></>}
                                            {designation ? <p className={Classes.employeeDesignation}>{designation?.name }</p> : <></>}
                                        </div>
                                        {
                                            (!branch || !designation || !technology)
                                            &&
                                            <FiAlertOctagon className={`${Classes.alertIco}`}/>
                                        }
                                    </Paper>
                                </Grid>
                            ))
                        }

                    </Grid>
                </div>

            </div>
        </>
    )
}
export default EmployeeList;