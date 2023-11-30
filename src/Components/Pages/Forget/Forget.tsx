import React, { useState, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { Box, Grid, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { ForgetPassword } from "../../../Redux/Actions";
import forgot_password from "../../../Assest/forgot_password.png";
import TextFields from "../../Views/Textfield/TextFields";
import Forgotkeyicon from "../../../Assest/svgicons/Forgotkeyicon";
import Button from "../../Views/Button/Button";

function Forget() {
  const [obj, setObj] = useState({
    id: Date.now(),
    email: "",
  });
  const [emailError, setEmailError] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const handleClick = () => {
    naviagte("/login");
  };
  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setObj((prevObj) => ({
      ...prevObj,
      email: email,
    }));
  };
  const handleEmailBlur = () => {
    if (obj.email === "") {
      setEmailError("Email is required.");
    } else if (!isValidEmail(obj.email)) {
      setEmailError("Enter a valid email.");
    } else {
      setEmailError("");
    }
  };
  const handlePasswordChange = (e: any) => {
    e.preventDefault();
    if (obj.email === "") {
      setEmailError("Email is required.");
    } else if (!isValidEmail(obj.email)) {
      setEmailError("Enter a valid email.");
    } else {
      dispatch(ForgetPassword({ email: obj.email }));
      setEmailError("");
    }
  };
  useEffect(() => {
    setIsInputValid(obj.email !== "");
  }, [obj.email]);

  return (
    <>
      <Container sx={{ height: "100vh" }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <img
              src={forgot_password}
              alt="Forgot Password ?"
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, minHeight: "500px" }}>
              <Box
                sx={{
                  fontFamily: "Roboto",
                  textAlign: "center",
                  fontWeight: "800",
                  marginBottom: "30px",
                }}
              >
                <Forgotkeyicon width="70px" height="100%" />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: "26px", md: "32px" },
                    fontFamily: "Roboto",
                    textAlign: "center",
                    fontWeight: "900",
                  }}
                >
                  Forgotten password?
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  sx={{ textAlign: "center", color: "gray" }}
                >
                  No worries, we'll send you reset instructions.
                </Typography>
              </Box>
              <br />
              <form onSubmit={handlePasswordChange}>
                <Box sx={{ margin: "30px 0px" }}>
                  <Typography variant="body1" sx={{ fontWeight: "600" }}>
                    Email <span>*</span>
                  </Typography>

                  <TextFields
                    placeholder="Enter your email"
                    variant="outlined"
                    // fullWidth
                    name="email"
                    value={obj.email}
                    helperText={emailError}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                  />
                </Box>
                <Box sx={{ margin: "30px 0px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    text=" Reset Password"
                    sx={{
                      width: "100%",
                      color: "primary",
                      backgroundColor: "primary",
                    }}
                    disabled={!isInputValid}
                  ></Button>
                </Box>
              </form>
              <Box sx={{ margin: "30px 0px", textAlign: "center" }}>
                <Button
                  variant="contained"
                  fullWidth
                  text="Back to Login"
                  style={{ backgroundColor: "none" }}
                  sx={{
                    width: "max-content",
                    hoverBgColor: "none",
                    color: "blue",
                    hoverColor: "black",
                    shadow: "none",
                    hoverShadow: "none",
                  }}
                  onClick={handleClick}
                  startIcon={<MdArrowBack />}
                ></Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
export default Forget;
