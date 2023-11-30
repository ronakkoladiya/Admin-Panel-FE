import style from './bank.module.css'
import pass_img from '../../../../../Assest/Bounding box.jpg'
import {useLocation} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetUserBankDetails} from "../../../../../Redux/Actions/Bank";

function Bank() {

  const dispatch = useDispatch();
  const location = useLocation();
 
  const { employeeId,bankDetail } =
    useSelector((state: any) => ({
      employeeId: location.pathname.split('/')[2] || state?.auth?.userDetails?._id,
      bankDetail:  state?.bank?.bankDetails,
    }));

  useEffect(() => {
    dispatch(GetUserBankDetails(employeeId))
  },[])

  return (
    <>
      <div className={style.card_div2}>
        <h6>Bank Information</h6>
        <div className={style.main_type_div}>
          <div className={style.mng_type_div}>
            <p className={style.type_p1}>Bank Name
              <p className={style.type_p2}>{bankDetail?.bankName}</p>
            </p>
          </div>
          <div className={style.mng_type_div}>
            <p className={style.type_p1}>Account Number
              <p className={style.type_p2}>{bankDetail?.accountNumber}</p>
            </p>
          </div>
          <div className={style.mng_type_div}>
            <p className={style.type_p1}>IFC Code
              <p className={style.type_p2}>{bankDetail?.ifsc}</p>
            </p>
          </div>
          <div className={style.mng_type_div}>
            <p className={style.type_p1}>UPI Number
              <p className={style.type_p2}>{bankDetail?.upiNumber}</p>
            </p>
          </div>
        </div>
      </div>

      <div className={style.card_div2}>
        <h6>Document</h6>
        <div className={style.main_type_div}>
          <div className={style.mng_type_div}>
            <p className={style.type_p1}>Passbook
              <p className={style.type_p2_1}>
                <img src={pass_img} alt="" />
                <p>Photo1515125.pdf</p>
                <span>Open</span>
              </p>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Bank