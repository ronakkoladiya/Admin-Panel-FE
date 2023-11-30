import React, { useEffect, useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import style from './List.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {BranchAddApi, BranchApi, IBranchList} from '../../../../Redux/Actions/Branch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdLibraryAdd } from 'react-icons/md';

const modalcss = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

interface BranchInfo {
  branchname: string;
  email: string;
  contect: string;
  location: string;
}

function List() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const [tabledata, settabledata] = useState<IBranchList[]>([]);
  console.log(tabledata,'first')
  useEffect(() => {
    // @ts-ignore
    dispatch(BranchApi({} as IBranchList)).then((res) => {
      const data = res.response.data;
      settabledata(data);
    });
  }, []);

  const bckobj: BranchInfo = { branchname: '', email: '', contect: '', location: '' };
  const [obj, setobj] = useState<BranchInfo>({ ...bckobj });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setobj((prevObj) => ({
      ...prevObj,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // @ts-ignore
    dispatch(BranchAddApi({ branchName: obj.branchname, email: obj.email, contact: obj.contect, location: obj.location }))
    setOpen(false);
    setobj({ ...bckobj })
  }

  const [openModals, setOpenModals] = useState<boolean[]>(new Array(tabledata?.length).fill(false));

  const mdlOpen = (index: number) => {
    const newOpenModals = [...openModals];
    newOpenModals[index] = true;
    setOpenModals(newOpenModals);
  };
  const mdlClose = (index: number) => {
    const newOpenModals = [...openModals];
    newOpenModals[index] = false;
    setOpenModals(newOpenModals);
  };

  return (
    <>
      <div className={style.list_main}>
        <div className={style.lst_btn_div}>
          <button onClick={handleOpen} className={style.list_btn}><i className={style.list_icon}><BsPlus /></i>Add</button>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalcss} className={style.model_1_main}>
                <Typography className={style.md_type} id="modal-modal-title" variant="h6" component="h2">
                  Branch Details
                </Typography>
                <Typography id="modal-modal-description">
                  <div className={style.type_div}>
                    <div className={style.type_main}>
                      <p className={style.type_div_p}>Branch Name
                        <input type="text" name='branchname' value={obj.branchname} onChange={handleChange} className={style.type_div} />
                      </p>
                    </div>
                    <div className={style.type_main}>
                      <p className={style.type_div_p}>Email
                        <input type="email" name='email' value={obj.email} onChange={handleChange} className={style.type_div} />
                      </p>
                    </div>
                    <div className={style.type_main}>
                      <p className={style.type_div_p}>Contact
                        <input type="number" name='contect' value={obj.contect} onChange={handleChange} className={style.type_div} />
                      </p>
                    </div>
                    <div className={style.type_main}>
                      <p className={style.type_div_p}>Location
                        <input type="text" name='location' value={obj.location} onChange={handleChange} className={style.type_div} />
                      </p>
                    </div>
                  </div>
                  <div className={style.list_add}>
                    <i onClick={handleSubmit} className={style.add_i}><MdLibraryAdd /></i>
                  </div>
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
        <div style={{overflowX: 'auto'}}>
          <Table className={style.list_tbl} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={style.list_hed_row}>Branch Name</TableCell>
                <TableCell align="left" className={style.list_hed_row}>Email</TableCell>
                <TableCell align="left" className={style.list_hed_row}>Location</TableCell>
                <TableCell align="left" className={style.list_hed_row}>Contact</TableCell>
                <TableCell align="left" className={style.list_hed_row}>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tabledata?.map((branch, index) => (
                <TableRow key={index} className={index % 2 === 0 ? style.list_tbl_row : style.list_tbl_row1}>
                  <TableCell className={style.List_row} component="th" scope="row">
                    {branch.branchName}
                  </TableCell>
                  <TableCell align="left" className={style.List_row}>{branch.email}</TableCell>
                  <TableCell align="left" className={style.List_row}>{branch.location}</TableCell>
                  <TableCell align="left" className={style.List_row}>{branch.contact}</TableCell>
                  <TableCell align="left">
                    <Link onClick={() => mdlOpen(index)} className={style.list_view} to=''>View</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {
        tabledata?.map((branch, index) => (
          <Modal
            open={openModals[index]}
            onClose={() => mdlClose(index)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalcss} className={style.model_1_main}>
              <Typography className={style.md_type} id="modal-modal-title" variant="h6" component="h2">
                Branch Details
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className={style.type_div}>
                  <div className={style.type_main}>
                    <p className={style.type_div_p}>Branch Name
                      <p className={style.type_div_p1}>{branch.branchName}</p>
                    </p>
                  </div>
                  <div className={style.type_main}>
                    <p className={style.type_div_p}>Email
                      <p className={style.type_div_p1}>{branch.email}</p>
                    </p>
                  </div>
                  <div className={style.type_main}>
                    <p className={style.type_div_p}>Location
                      <p className={style.type_div_p1}>{branch.location}</p>
                    </p>
                  </div>
                  <div className={style.type_main}>
                    <p className={style.type_div_p}>Contact
                      <p className={style.type_div_p1}>{branch.contact}</p>
                    </p>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        ))
      }
    </>
  )
}

export default List