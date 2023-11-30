import  { useState, useEffect } from 'react';
import style from './branch.module.css';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Overall} from "./Overall";
import {paths, routes} from "../../../Utiles/constant";

interface MenuItem {
    p: string;
    path: string;
}

function Branch() {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        const param = location.pathname.split(`/`)[2];

        param ? setActiveTab(param) : setActiveTab(routes.menuBranch[0].path);
    },  [location]);

    return (
        <>
            <div className={style.branch_main}>
                <div className={style.menu_div}>
                    {
                        routes.menuBranch.map(x => (
                            <p key={x.p}
                               onClick={() => navigate(`${paths.branch}/${x.path}`)}
                               className={activeTab === x.path ? style.menu_over : style.menu_sub}
                            >
                                {x.p}
                            </p>
                        ))
                    }
                </div>
                {activeTab==='overall' ? <Overall/> : <Outlet />}
            </div>
        </>
    )
}
export default Branch;
