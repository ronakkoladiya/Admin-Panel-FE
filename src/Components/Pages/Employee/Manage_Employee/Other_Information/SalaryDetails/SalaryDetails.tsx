import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { Box, Typography } from '@mui/material';
import logo from '../../../../../../Assest/logo.png';
import Grid from '@mui/material/Grid';
import "./Printslip.css";
import styled from './SalaryDetails.module.css';

const SalaryDetails = () => {

  const contentRef = useRef();
  const printSlip = useReactToPrint({
    // @ts-ignore
    content: () => contentRef.current,
  });

  return (
    <Box ref={contentRef} id={'printableContent'} sx={{ mt: 4, mb: 4, p: 4, background: "white", borderRadius: "10px" }}>
      <Grid container sx={{ justifyContent: "space-between", alignItems: "center", pb: 2 }} className={`${styled.topbar}`}>
        <Grid item className={styled.companydetail} sx={{ display: 'flex', alignItems: "center" }} >
          <div style={{marginRight: '30px'}}>
            <img src={logo} alt="" className={styled.imgresize} />
          </div>
          <div>
            <Typography variant="h6" className={styled.textTypographyBvm} >
              BVM Infotech
            </Typography>
            <Typography variant="h6" className={styled.textTypographyBvmText} >
              1049-1051,silver Business Point, Nr Uttran Surat -394105 india
            </Typography>
          </div>
        </Grid>
        <Grid item className={styled.paymonth}>
          <Typography variant="h6" className={styled.textTypographyBvmText} >
            Payslip For the Month
          </Typography>
          <Typography variant="h6" className={styled.textTypographyBvmTextSide} >
            November - 2022
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2, justifyContent: "space-between", alignItems: "center" }}>
        <Grid item sx={{marginRight: '20px'}}>
          <Typography variant="h6" sx={{mb: 1}} className={styled.textTypographyBvm} >
            Employee Summery
          </Typography>
          <table>
            <tr>
              <th>Employee Name</th>
              <td>: John Smith</td>
            </tr>
            <tr>
              <th>Employee ID</th>
              <td>: 007</td>
            </tr>
            <tr>
              <th>Pay Period</th>
              <td>: November 2022</td>
            </tr>
            <tr>
              <th>Pay Date</th>
              <td>: 05 - Dec - 2022</td>
            </tr>
          </table>
        </Grid>
        <Grid item className={styled.netpaybox}>
          <Box sx={{ border: "2px solid  rgba(0, 0, 0, 0.3)", width: "220px", height: "150px", borderRadius: "10px", overflow: 'hidden' }}>
            <Box style={{backgroundColor: "rgba(0, 9, 129, 0.1)"}} sx={{borderRadius: "8px,8px,0px,0px", p: 2 }}>
              <Typography variant="h6" className={styled.textTypographyBvm} >
                ₹26,000.00
              </Typography>
              <Typography variant="h6" className={styled.textTypographyBvmTextSide} >
                Employee Net Pay
              </Typography>
            </Box>
            <Box sx={{ p: 2, pt: 1 }}>
              <Typography variant="h6" sx={{mb:1}} className={styled.textTypographyBvmText} >
                Paid Days : 31
              </Typography>
              <Typography variant="h6" className={styled.textTypographyBvmText} >
                LOPDays: 0
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box className={`${styled.sec3box}`} sx={{ border: "2px solid  rgba(0, 0, 0, 0.3)", mt: 3, borderRadius: "10px", p: 3 }}>
        <Grid container sx={{alignItems: "top"}}>
          <Grid item className={`${styled.box1} sec3box1`} sx={{paddingRight: '30px'}}>
            <Grid container className={`${styled.headpart}`} sx={{justifyContent: "space-between", alignItems: "center", pb: 1, mb: 1, borderBottom: '2px dashed rgba(0, 0, 0, 0.20)' }}>
              <Grid item>Earnings</Grid>
              <Grid item>Amount</Grid>
            </Grid>
            <Grid container className={`${styled.details}`} sx={{justifyContent: "space-between", alignItems: "center"}}>
              <Grid item>Basic</Grid>
              <Grid item>Amount</Grid>
            </Grid>
            <Grid container className={`${styled.details}`} sx={{justifyContent: "space-between", alignItems: "center"}}>
              <Grid item>House Rent Allowance</Grid>
              <Grid item>₹0.00</Grid>
            </Grid>
          </Grid>
          <Grid item className={styled.box2} sx={{paddingLeft: '30px'}}>
            <Grid container className={`${styled.headpart}`} sx={{justifyContent: "space-between", alignItems: "center", pb: 1, mb: 1, borderBottom: '2px dashed rgba(0, 0, 0, 0.20)' }}>
              <Grid item>Deduction</Grid>
              <Grid item>Amount</Grid>
            </Grid>
            <Grid container className={`${styled.details}`} sx={{justifyContent: "space-between", alignItems: "center"}}>
              <Grid item>Income Tax</Grid>
              <Grid item>₹0.00</Grid>
            </Grid>
            <Grid container className={`${styled.details}`} sx={{justifyContent: "space-between", alignItems: "center"}}>
              <Grid item>Provident Fund</Grid>
              <Grid item>₹0.00</Grid>
            </Grid>
            <Grid container className={`${styled.details}`} sx={{justifyContent: "space-between", alignItems: "center"}}>
              <Grid item>Professional Tax</Grid>
              <Grid item>₹0.00</Grid>
            </Grid>
            <Grid container className={`${styled.details}`} sx={{justifyContent: "space-between", alignItems: "center"}}>
              <Grid item sx={{fontWeight: '600'}}>Total Deducations</Grid>
              <Grid item>₹0.00</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ border: "2px solid  rgba(0, 0, 0, 0.3)", mt: 3, borderRadius: "10px", overflow: 'hidden'}}>
        <Grid container sx={{justifyContent: "space-between", alignItems: "center"}}>
          <Grid item className={styled.finalcontent} sx={{pl: 4, pr: 4, fontSize: '14px'}}>
            <p style={{marginBottom: '10px', fontWeight: '600'}}>Total net Payble</p>
            <p>Gross Earnings - Total Deducations</p>
          </Grid>
          <Grid item className={styled.finalamount} style={{backgroundColor: 'rgba(0, 9, 129, 0.1)'}} sx={{p: 4, fontWeight: '600'}}>₹26,000.00</Grid>
        </Grid>
      </Box>
      <Box sx={{mt: 3, textAlign: 'center'}}>
        <button id={'printbtn'} className={styled.printbtn}
                onClick={()=>{
                  // @ts-ignore
                  document.getElementById('printbtn').style.opacity = '0';
                  printSlip();
                  // @ts-ignore
                  document.getElementById('printbtn').style.opacity = '1';
                }}
        >
          Print
        </button>
      </Box>
    </Box>
  )
}

export default SalaryDetails