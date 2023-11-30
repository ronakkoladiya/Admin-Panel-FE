import React from 'react'
import style from './other.module.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router'

function Other() {

  const location = useLocation();
  const navigate = useNavigate();

  const getLoc = `${location.pathname}?tab=otherinfo&&subtab=`;

  return (
    <>
      <div className={style.card_div2}>
        <h6>Employee Work Details</h6>
        <div className={style.main_type_div}>
          <div className={style.mng_type_div}>
            <p className={style.type_p1}>Department
              <p className={style.type_p2}>Android</p>
            </p>
          </div>
          <div className={style.mng_type_div}>
            <p className={style.type_p1}>Designation
              <p className={style.type_p2}>Developer</p>
            </p>
          </div>
        </div>
      </div>
      <div className={style.card_div2}>
        <h6>Other Information</h6>
        <div className={style.main_type_div}>
          <div className={style.mng_type_div}>
            <p className={style.type_p1_1}>Branch
              <div className={style.other_box}>
                <p className={style.other_box_div}>Surat</p>
                <span className={style.other_box_span}>Want to change</span>
              </div>
            </p>
          </div>
          <div className={style.mng_type_div}>
            <p className={style.type_p1_1}>Salary
              <div className={style.other_box}>
                <p className={style.other_box_div1}>10,000/-</p>
              </div>
            </p>
          </div>
          <div className={style.mng_type_div}>
            <p className={style.type_p1_1}>Last Paid
              <div className={style.other_box}>
                <p className={style.other_box_div1}>10,000/-</p>
                <span className={style.other_box_span1}>05-10-2023</span>
              </div>
            </p>
          </div>
          <div className={style.mng_type_div}>
            <div className={style.doc_icon_div}>
              <i className={style.doc_icon}><AiOutlinePlus /></i>
            </div>
          </div>
        </div>
        <div className={style.other_btn}>
          <button className={style.btn_1} onClick={() => navigate(`${getLoc}attendancedetails`)}>View Attendance Details</button>
          <button className={style.btn_1} onClick={() => navigate(`${getLoc}salarydetails`)}>View Salary Details</button>
        </div>
      </div>
    </>
  )
}

export default Other