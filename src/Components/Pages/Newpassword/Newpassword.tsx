import { useState, useEffect } from 'react';
import { BsKey } from "react-icons/bs";
import style from "./Newpassword1.module.css";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FaArrowLeft } from "react-icons/fa";
import { MdVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useNavigate } from 'react-router';
import { NewPasswordRedux } from '../../../Redux/Actions';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';

function Newpassword1() {
  const [showPassword, setShowPassword] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState(false);
  const [PasswordError, setPasswordError] = useState('');
  const [ConfirmError, setConfirmError] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);
  const [object, setObject] = useState({
    id: Date.now(),
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setConfirmPassword(!ConfirmPassword);
  };

  const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setObject((prevObj) => ({
      ...prevObj,
      password: password,
    }));
  };

  const handlePasswordBlur = () => {
    const password = object.password.trim();
    if (password === '') {
      setPasswordError('Password is required.');
    } else if (!isPasswordValid(password)) {
      if (!/(?=.*[@$!%*?&])/.test(password)) {
        setPasswordError('Password must contain at least one special character');
      }
      else if (!/(?=.*[A-Z])/.test(password)) {
        setPasswordError('Password must contain at least one capital letter');
      }
      else if (!/(?=.*[a-z])/.test(password)) {
        setPasswordError('Password must contain at least one small letter');
      }
      else if (!/(?=.*[0-9])/.test(password)) {
        setPasswordError('Password must contain at least one number');
      }
      else {
        setPasswordError('Password must min 6 and max 15 letter');
      }

    } else {
      setPasswordError('');
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value;
    setObject((prevObj) => ({
      ...prevObj,
      confirmPassword: confirmPassword
    }));
  }
  const handleConfirmBlur = () => {
    if (object.password !== object.confirmPassword) {
      setConfirmError('ConfirmPassword not match');
    } else {
      setConfirmError('');
    }
  }

  const handleClick = () => {
    navigate('/login')
  }

  const handleResetPassword = () => {
    if (object.password === '' && object.confirmPassword === '') {
      setPasswordError('Password is required.');
      setConfirmError('Confirm password is required.');
    } else if (!isPasswordValid(object.password)) {
      setPasswordError('Password must have  6 and 15 characters.');
      setConfirmError('');
    } else if (object.password !== object.confirmPassword) {
      setPasswordError('');
      setConfirmError('Confirm password does not match');
    } else if (object.password === object.confirmPassword) {
      setPasswordError('');
      setConfirmError('');
      dispatch(NewPasswordRedux({ password: object.password, confirmPassword: object.confirmPassword }))
      console.log('Password and confirm password are valid.');
    }
  };

  useEffect(() => {
    setIsInputValid(object.password !== '' && object.confirmPassword !== '' && !PasswordError && !ConfirmError);
  }, [object.password, object.confirmPassword, PasswordError, ConfirmError]);
  return (
    <>
        <div className={style.main}>
          <div className={style.sub}>
            <div className={style.key}>
              <i><BsKey /></i>
            </div>

            <div className={style.text}>
              <p className={style.pera}>Set new password</p>
              <p className={style.p1}>Your new password must be different to</p>
              <p className={style.p1}> previously used passwords.</p>
            </div>

            <div className={style.form_pass}>
              <div>
                <InputLabel htmlFor="bootstrap-input" className={style.inp_text}>Password</InputLabel>
                <Typography component="div" variant="subtitle1" className={style.required}>*</Typography>
                <FormControl>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    placeholder={"Password"}
                    name='password'
                    value={object.password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    InputProps={{
                      className: style.textField,
                      autoComplete: "password",
                    }}
                  />
                  <FormHelperText id="component-error-text" className={style.MuiFormHelperText}>{PasswordError}</FormHelperText>
                  <IconButton onClick={handleTogglePassword} edge="end" className={style.icon_pass}>
                    {showPassword ? <MdVisibility /> : <MdOutlineVisibilityOff />}
                  </IconButton>
                </FormControl>
              </div>

              <div className={style.form_pass}>
                <InputLabel htmlFor="bootstrap-input" className={style.inp_text} style={{ marginTop: '5%' }}>Confirm Password</InputLabel>
                <Typography component="div" variant="subtitle1" className={style.required1}>*</Typography>
                <FormControl>
                  <TextField
                    type={ConfirmPassword ? "text" : "password"}
                    placeholder={"Confirm Password"}
                    name='confirmPassword'
                    value={object.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={handleConfirmBlur}
                    InputProps={{
                      className: style.textField,
                      autoComplete: "current-confirm-password",
                    }}
                  />
                  <FormHelperText id="component-error-text" className={style.MuiFormHelperText}>{ConfirmError}</FormHelperText>
                  <IconButton onClick={handleToggleConfirmPassword} edge="end" className={style.icon_pass}>
                    {ConfirmPassword ? <MdVisibility /> : <MdOutlineVisibilityOff />}
                  </IconButton>
                </FormControl>
              </div>

              <div className={style.button}>
                <Button
                  onClick={handleResetPassword}
                  fullWidth={true}
                  type='button'
                  sx={{
                    background: isInputValid
                      ? 'linear-gradient(90deg, #39415C 0%, #040822 102.08%)'
                      : 'rgba(217, 217, 217, 1)',
                    padding: '10px',
                    color: 'rgba(255, 255, 255, 1)',
                    fontSize: '16px',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}
                  disabled={!isInputValid}>Reset Password</Button>
              </div>
              <div className={style.back_btn}>
                <p className={style.link} onClick={handleClick}>
                  <i><FaArrowLeft /></i><span>Back to log in</span>
                </p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Newpassword1