"use client";
import { useMemo, useState } from "react";
import GetEmailPhoneNumber from "components/signup/getEmailPhoneNumber";
import OtpChecking from "components/signup/otpChecking";
import SetUserName from "components/signup/setUserName";
import PasswordSetting from "components/signup/passwordSetting";
import STATUS from "components/signup/status";
import { useInputHandler } from "hooks/useInputHandler";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import LoginImage from "assets/images/landingPage.jpg";

const Signup = () => {
  const [currentState, setCurrentState] = useState(STATUS.GET_EMAIL_MOBILE);
  const [isGoogle, setIsGoogle] = useState(false);
  const emailPhoneNumber = useInputHandler("");
  const otp = useInputHandler("");
  const password = useInputHandler("");
  const [userName, setUserName] = useState("");

  const state = {
    [STATUS.GET_EMAIL_MOBILE]: (
      <GetEmailPhoneNumber
        emailPhoneNumber={emailPhoneNumber}
        setCurrentState={setCurrentState}
        setIsGoogle={setIsGoogle}
      />
    ),
    [STATUS.OTP_CHECKING]: (
      <OtpChecking
        setCurrentState={setCurrentState}
        otp={otp}
        emailPhoneNumber={emailPhoneNumber}
      />
    ),
    [STATUS.SET_USER_NAME]: (
      <SetUserName
        setCurrentState={setCurrentState}
        userName={userName}
        setUserName={setUserName}
        isGoogle={isGoogle}
        otp={otp}
      />
    ),
    [STATUS.PASSWORD_SETTING]: (
      <PasswordSetting
        setCurrentState={setCurrentState}
        otp={otp}
        emailPhoneNumber={emailPhoneNumber}
        password={password}
        isGoogle={isGoogle}
        userName={userName}
      />
    ),
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ flex: 1, display: "flex", flexDirection: "column" }}
    >
      <Card
        sx={{
          // p: 2,
          boxShadow: "0 3px 10px 2px #f2f2f2",
          borderRadius: "20px",
          height: "100%",
          display: "flex",
        }}
      >
        <Grid
          container
          item
          lg={6}
          md={6}
          xs={12}
          sx={{ p: { lg: 6, md: 4, sm: 10, xs: 2 } }}
          direction="column"
        >
          <Grid
            container
            justifyContent={"center"}
            direction={"column"}
            sx={{ flex: 1 }}
          >
            <Typography
              variant="h2"
              textAlign={"center"}
              sx={{ color: "black" }}
            >
              Sign Up
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign={"center"}
              sx={{ mt: 1, mb: 3, color: "darkengray" }}
            >
              Welcome to Neighbors Hub! You can submit here.
            </Typography>
            {state[currentState]}{" "}
          </Grid>
        </Grid>
        <Hidden mdDown>
          <Grid
            item
            lg={6}
            md={6}
            sx={{
              p: 2,
              backgroundImage: `url(${LoginImage.src})`,
              backgroundSize: "cover",
            }}
          ></Grid>
        </Hidden>
      </Card>
    </Container>
  );
};

export default Signup;
