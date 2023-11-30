import React from 'react';
import style from './email.module.css';
import { HiOutlineMail } from "react-icons/hi";
import { Link } from '@mui/material';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';

function Emailcheck() {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login')
  }
  return (
    <>
      <div className={style.email_main}>
        <div className={style.email_sub}>
          <div className={style.email_icon}>
            <i><HiOutlineMail /></i>
          </div>

          <div className={style.email_heading}>
            <p>Check Your email</p>
          </div>

          <div className={style.email_pera}>
            <p>We’ve sent a password reset link to your</p>
            <h4>Registered email.</h4>
          </div>

          <div className={style.email_resend}>
            <span>Didn’t receive the email? </span><Link className={style.email_link}>Click to resend</Link>
          </div>

          <div className={style.email_back}>
            <p className={style.email_link} onClick={handleClick}>
              <i><FaArrowLeft /></i><span>Back to log in</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Emailcheck