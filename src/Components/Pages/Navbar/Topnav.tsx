import style from './topnav.module.css'
import { AiOutlineSearch } from 'react-icons/ai'

function TopNav() {
  return (
    <>
      <div className={style.main_nav}>
        <p className={style.nav_dash}>Dashbord</p>
        <form action="" style={{ position: 'relative' }}>
          <i className={style.nav_icon}><AiOutlineSearch /></i>
          <input type="text" placeholder='Search now' className={style.nav_inpt} />
        </form>
      </div>
    </>
  )
}

export default TopNav