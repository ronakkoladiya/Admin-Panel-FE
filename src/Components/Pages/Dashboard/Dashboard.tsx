import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import style from '../Dashboard/dash.module.css';
import {Overalldeshbord} from "./Overall";
import {paths, routes} from "../../../Utiles/constant";

const Dashboard = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const param = location.pathname.split(`/`)[1];

    param ? setActiveTab(param) : setActiveTab(routes.menuDashboard[0].path);
  },  [location]);

  return (
    <>
      <div className={style.branch_main}>
        <div className={style.menu_div}>
          {routes?.menuDashboard.map((x) => (
            <button
              key={x.p}
              className={activeTab === x.path ? style.menu_over : style.menu_sub}
              onClick={() => navigate(`/${x.path}`)}
            >
              {x.p}
            </button>
          ))}
        </div>
        {activeTab==='overall' ? <Overalldeshbord/> : <Outlet />}
      </div>
    </>
  );
};

export default Dashboard;
