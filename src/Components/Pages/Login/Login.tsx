import React, { useState, useEffect } from 'react';
import style from './Login.module.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import logo from '../../../Assest/logo.png';
import FormHelperText from '@mui/material/FormHelperText';
import { IconButton } from '@mui/material';
import { MdVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { LoginApi } from '../../../Redux/Actions';
import { Grid } from "@mui/material";
import LoginToaster from "../../Views/LoginToaster/LoginToaster";
import TextFields from "../../Views/Textfield/TextFields";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [obj, setObj] = useState({
        id: Date.now(),
        email: '',
        password: ''
    });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isInputValid, setIsInputValid] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {successMessage, errorMessage} = useSelector((state:any) => ({
        successMessage: state?.auth?.successMessage || '',
        errorMessage: state?.auth?.errorMessage || ''
    }))

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClick = () => {
        navigate('/forget');
    }

    const isValidEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };
    const isValidPassword = (password: string) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
        return passwordPattern.test(password);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setObj((prevObj) => ({
            ...prevObj,
            email: email
        }));
    };
    const handleEmailBlur = () => {
        if (obj.email === '') {
            setEmailError('Email is required.');
        } else if (!isValidEmail(obj.email)) {
            setEmailError('Enter a valid email.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setObj((prevObj) => ({
            ...prevObj,
            password: password,
        }));
    };
    const handlePasswordBlur = () => {
        const password = obj.password.trim();
        if (password === '') {
            setPasswordError('Password is required.');
        } else if (!isValidPassword(password)) {
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
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (obj.email === '' && obj.password === '') {
            setEmailError('Email is required.');
            setPasswordError('Password is required.');
        } else if (!isValidEmail(obj.email)) {
            setEmailError('Invalid email format.');
        }
        else {
            setEmailError('');
            setPasswordError('');
            dispatch(LoginApi({ email: obj.email, password: obj.password }))
        }
    }
    useEffect(() => {
        setIsInputValid(obj.email !== '' && obj.password !== '');
    }, [obj]);

    return (
        <>
            <section className={`${style.loginsection}`}>
                <Grid container sx={{minHeight: '100vh'}}>
                    <Grid item md={6} xl={8} className={`${style.banner}`}>
                        {/* background image banner */}
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <div className={`${style.loginwrapper}`}>
                            <Grid container xs={6} sm={4}>
                                <Grid item>
                                    <img className={`${style.logo}`} src={logo} />
                                </Grid>
                            </Grid>
                            <Grid container sx={{mt: 5}}>
                                <Grid item xs={12}>
                                    <h1 className={`${style.heading}`}>Welcome Back</h1>
                                    <p className={`${style.headingdescription}`}>Please enter your details.</p>
                                </Grid>
                            </Grid>
                            <form onSubmit={handleSubmit} noValidate>
                                <Grid container sx={{mt: 6}}>
                                    <Grid item xs={12}>
                                    <span
                                        className={`${style.fieldtitle}`}
                                    >
                                        Email
                                    </span>
                                        <TextFields
                                            type={'text'}
                                            placeholder={'Enter your email'}
                                            name={'email'}
                                            helperText={emailError}
                                            onBlur={handleEmailBlur}
                                            value={obj.email}
                                            onChange={handleEmailChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container sx={{mt: 4}}>
                                    <Grid item xs={12}>
                                        <span className={`${style.fieldtitle}`}>Password</span>
                                        <TextFields
                                            type={'password'}
                                            placeholder={'Password'}
                                            name={'password'}
                                            helperText={passwordError}
                                            onBlur={handlePasswordBlur}
                                            value={obj.password}
                                            onChange={handlePasswordChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container sx={{mt: 5, justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                                        <input
                                            type={'checkbox'}
                                            id={'remember'}
                                            value={'remember'}
                                            className={`${style.remcheckbox}`}
                                        />
                                        <label htmlFor={'remember'} className={`${style.remlabel}`} >Remember</label>
                                    </Grid>
                                    <Grid item>
                                    <span className={`${style.forgotpass}`}
                                          onClick={handleClick}
                                    >
                                        Forgot password?
                                    </span>
                                    </Grid>
                                </Grid>
                                <Grid container sx={{mt: 4}}>
                                    <Grid item xs={12}>
                                        <Button
                                            type='submit'
                                            fullWidth={true}
                                            sx={{
                                                background: isInputValid
                                                    ? 'linear-gradient(90deg, #39415C 0%, #040822 102.08%)'
                                                    : 'rgba(217, 217, 217, 1)',
                                                padding: '10px',
                                                color: 'rgba(255, 255, 255, 1)',
                                                fontSize: '16px',
                                                fontWeight: '500',
                                                textTransform: 'capitalize',
                                            }}
                                            disabled={!isInputValid}
                                        >Sing In</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </section>
        </>
    )
}
export default Login;