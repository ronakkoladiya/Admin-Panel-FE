import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import style from "./ShowProject.module.css";
import {ProjectApi} from "../../../../Redux/Actions/Project";
import { BsRecordCircle } from "react-icons/bs";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Table from "../../../Views/Table/Table";

function ShowProject() {

    const dispatch = useDispatch();
    const projects = useSelector((state: any) => state.project?.list);

    useEffect(() => {
        dispatch(ProjectApi());
    },[])

    return(
        <>
            <section>
                <Table
                    withindex
                    columns={[
                        { header: "Project Title", field: "projectName" },
                        { header: "Client Name", field: "client" },
                        { header: "Start Date", field: "startDate" },
                        { header: "End Date", field: "endDate" },
                        {
                            header: "Status",
                            field: "actions",
                            renderInput: ({rowData}: any) => (
                                <div>
                                    <BsRecordCircle
                                        className={`
                                                    ${style.statusICO} 
                                                    ${rowData?.status==='active' ? style.statusActive : style.statusDeactive}
                                                `}
                                    />
                                    {rowData.status}
                                </div>
                            ),
                        },
                        {
                            header: "Team",
                            field: "actions",
                            renderInput: ({rowData}: any) => (
                                <AvatarGroup max={4} className={`${style.imgBox}`}>
                                    {
                                        rowData?.teamMembers.map(() => (
                                            <Avatar
                                                className={`${style.teamIMG}`}
                                                alt="team"
                                                src={require('../../../../Assest/Ellipse 30 (5).jpg')}
                                            />
                                        ))
                                    }
                                </AvatarGroup>
                            ),
                        },
                        {
                            header: "View",
                            field: "actions",
                            renderInput: () => (
                                <button className={`${style.tabView}`}>View</button>
                            ),
                        },
                    ]}
                    data={projects}
                    pagination
                />
            </section>
        </>
    )
}

export default ShowProject;