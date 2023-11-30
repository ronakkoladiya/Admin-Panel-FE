import React from "react";

import  { useState, useEffect } from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';

import style from "./Project.module.css";
import {ShowProject} from "./Showproject";
import {paths, routes} from "../../../Utiles/constant";

function Project() {

    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const param = location.pathname.split(`${paths.project}/`)[1];

        param ? setActiveTab(param) : setActiveTab(routes.menuProject[0].path);
    },  [location]);

    return (
        <>
            <div className={style.project_main}>
                <div className={style.menu_div}>
                    {
                        routes.menuProject.map(x => (
                            <p key={x.p}
                               onClick={() => navigate(`${paths.project}/${x.path}`)}
                               className={activeTab === x.path ? style.menu_over : style.menu_sub}
                            >
                                {x.p}
                            </p>
                        ))
                    }
                </div>
                {activeTab==='showproject' ? <ShowProject/> : <Outlet />}
            </div>
        </>
    );
}

export default Project;