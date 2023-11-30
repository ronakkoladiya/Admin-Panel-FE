import style from './document.module.css'
import pass_img from '../../../../../Assest/Bounding box.jpg'
import { RiFolderUploadFill } from 'react-icons/ri'
import { AiOutlinePlus } from 'react-icons/ai'

function Document() {
  return (
    <>
      <div className={style.card_div2}>
        <h6>Document</h6>
        <div className={style.main_type_div}>
          <div className={style.mng_type_div}>
            <p className={style.type_p1}>Photo
              <p className={style.type_p2_1}>
                <img src={pass_img} alt="" />
                <p>Photo1515125.pdf</p>
                <span>Open</span>
              </p>
            </p>
          </div>
          <div className={style.mng_type_div}>
            <p className={style.type_p1}>Pan Card
              <p className={style.type_p2_1}>
                <img src={pass_img} alt="" />
                <p>Photo1515125.pdf</p>
                <span>Open</span>
              </p>
            </p>
          </div>
          <div className={style.mng_type_div}>
            <p className={style.type_p1}>Adhar Card
              <p className={style.type_p2_2}>
                <i><RiFolderUploadFill /></i>
                <p>Upload Here</p>
              </p>
            </p>
          </div>
          <div className={style.mng_type_div}>
            <p className={style.type_p1}>Passbook
              <p className={style.type_p2_2}>
                <i><RiFolderUploadFill /></i>
                <p>Upload Here</p>
              </p>
            </p>
          </div>
          <div className={style.mng_type_div}>
            <div className={style.doc_icon_div}>
            <i className={style.doc_icon}><AiOutlinePlus /></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Document