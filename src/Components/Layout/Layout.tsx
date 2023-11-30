import {TopNav} from '../Pages/Navbar'
import {Sidebar} from '../Pages/Sidebar'
import {Outlet} from 'react-router-dom'
import style from './layout.module.css'
import {useSelector} from "react-redux";

function Layout() {

    const userRole = useSelector((state: any) => state?.auth?.userDetails?.userType);

    return (
        <>
            {
                userRole &&
                <div className={style.layout_main}>
                    <div className={style.side_div}>
                        <Sidebar/>
                    </div>
                    <div className={style.head}>
                        <TopNav/>
                        <Outlet/>
                    </div>
                </div>
            }
        </>
    )
}

export default Layout