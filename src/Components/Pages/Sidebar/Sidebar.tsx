import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './sidebar.module.css';
import logo from '../../../Assest/logo.png';
import {useSelector, useDispatch} from "react-redux";
import {paths, routes, userRoleConst} from "../../../Utiles/constant";
import { FaBars } from "react-icons/fa";

import {Drawer, ListItemIcon, ListItemText} from '@mui/material';
import LogOut from "../../Views/DummyComponents/LogOut";

interface SidebarItem {
  label: string;
  path: string;
}

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const userRole = useSelector((state: any) => state.auth?.userDetails?.userType);
  const userId = useSelector((state: any) => state.auth?.userDetails?._id);

  const sidebarEmployeeRoutes= [
    {
        label: 'Profile',
        path:`${paths.employee}/${userId}?tab=personalinfo`
    },
    {
        label: 'Calender',
        path: '/holiday'
    },
    {
        label: 'Report',
        path: '/report'
    },{
      label: 'Leave',
      path: '/leave'
  }
  ]
  const sidebar = (userRole===userRoleConst.employee ? sidebarEmployeeRoutes : routes.sidebarAdminRoutes);

  const [selectedLabel, setSelectedLabel] = useState(() => {
    const storedLabel = localStorage.getItem('selectedLabel');
    return storedLabel || '';
  });

  useEffect(() => {
    localStorage.setItem('selectedLabel', selectedLabel);
  }, [selectedLabel]);

  useEffect(() => {
    const currentLabel = sidebar.find(item => item.path === `${location.pathname}${location?.search}`)?.label;
    if (currentLabel) {
      setSelectedLabel(currentLabel);
    }
  }, [location.pathname, sidebar]);

  const handleNavClick = (path: string, label: string) => {
    setOpen(false)

    setSelectedLabel(label);
    navigate(path);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <>
      <div className={style.side_main}>
        <div className={style.side_img}>
          <img src={logo} alt="" style={{ height: '41.86px', width: '60px' }} />
        </div>
        <div className={style.side_frame}>
          <h6 className={style.side_tool}>Tool</h6>
          {sidebar.map(x => (
            <p
              key={x.label}
              className={`${style.side_p} ${selectedLabel === x.label ? style.selected : ''}`}
              onClick={() => handleNavClick(x.path, x.label)}
            >
              {x.label}
            </p>
          ))}
          {LogOut({navigate, dispatch})}
        </div>
      </div>

      <div className={`${style.mobile_sidebar}`}>
        <FaBars className={`${style.toggleBar}`} onClick={toggleDrawer(true)}></FaBars>
        <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
        >
          <div className={style.side_main_mobile}>
            <div className={style.side_img}>
              <img src={logo} alt="" style={{ height: '41.86px', width: '60px' }} />
            </div>
            <div className={style.side_frame}>
              <h6 className={style.side_tool}>Tool</h6>
              {sidebar.map(x => (
                  <p
                      key={x.label}
                      className={`${style.side_p} ${selectedLabel === x.label ? style.selected : ''}`}
                      onClick={() => handleNavClick(x.path, x.label)}
                  >
                    {x.label}
                  </p>
              ))}
              {LogOut({navigate,dispatch})}
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}

export default Sidebar;