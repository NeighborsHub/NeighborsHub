"use client";
import { useMemo, useState } from "react";
import GetEmailPhoneNumber from "components/signin/getEmailPhoneNumber";
import OtpChecking from "components/signin/otpChecking";
import PasswordChecking from "components/signin/passwordChecking";
import STATUS from "components/signin/status";
import { useInputHandler } from "hooks/useInputHandler";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LoginImage from "assets/images/loginImage.jpg";
import Hidden from "@mui/material/Hidden";
import SignInSignUpButtons from "components/signInSignUpButtons/signInSignUpButtons";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Signup = () => {
  const [currentState, setCurrentState] = useState(STATUS.GET_EMAIL_MOBILE);
  const router = useRouter();
  const emailPhoneNumber = useInputHandler("");
  const otp = useInputHandler("");
  const password = useInputHandler("");

  const state = {
    [STATUS.GET_EMAIL_MOBILE]: (
      <GetEmailPhoneNumber
        emailPhoneNumber={emailPhoneNumber}
        setCurrentState={setCurrentState}
      />
    ),
    [STATUS.OTP_CHECKING]: (
      <OtpChecking
        setCurrentState={setCurrentState}
        otp={otp}
        emailPhoneNumber={emailPhoneNumber}
      />
    ),
    [STATUS.PASSWORD_CHECKING]: (
      <PasswordChecking
        setCurrentState={setCurrentState}
        otp={otp}
        emailPhoneNumber={emailPhoneNumber}
        password={password}
      />
    ),
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <Grid
      container
      direction={"column"}
      sx={{
        backgroundColor: "#ebebeb",
        p: { sm: 1, xs: 0, boxSizing: "border-box" },
      }}
      justifyContent={"center"}
      item
      xs
    >
      <Container
        maxWidth="lg"
        sx={{
          p: { sm: 2, xs: 0 },
          flex: 1,
          alignItems: { sm: "center", xs: "flex-end" },
          display: "flex",
        }}
      >
        <Hidden smUp>
          <Grid
            item
            container
            justifyContent={"center"}
            sx={{
              overflow: "hidden",
              position: "fixed",
              top: 0,
              display: { xs: "flex", sm: "none" },
            }}
          >
            <img src={LoginImage.src} style={{ minWidth: "105%" }} />
          </Grid>
        </Hidden>
        <Card
          container
          alignItems="center"
          alignContent="center"
          sx={{
            borderRadius: { sm: "25px", xs: 0 },
            boxShadow: "none",
            display: "flex",
            flex: 1,
            flexDirection: "row",
            p: { lg: 3, md: 3, sm: 3, xs: 0 },
            backgroundColor: {
              xs: "transparent!important",
              sm: "white!important",
            },
            "&.MuiPaper-root": {
              backgroundColor: {
                xs: "transparent!important",
                sm: "white!important",
              },
            },
          }}
        >
          <Grid
            container
            item
            md
            xs={12}
            direction="column"
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              flexGrow: 0,
              position: "relative",
              backgroundColor: {
                xs: "transparent!important",
                sm: "white!important",
              },
            }}
          >
            <Hidden smDown>
              <Grid
                container
                justifyContent={"flex-start"}
                sx={{ position: "absolute", top: "0", left: "0" }}
              >
                <Button
                  sx={{ fontWeight: "light", color: "black!important" }}
                  onClick={handleBackToHome}
                >
                  {" "}
                  <KeyboardBackspaceIcon
                    sx={{ mr: 0.5, color: "black!important" }}
                  />
                  Home
                </Button>
              </Grid>
            </Hidden>

            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
              sx={{
                flex: 1,
                flexGrow: 0,
                backgroundColor: {
                  xs: "transparent!important",
                  sm: "white!important",
                },
              }}
            >
              <Grid
                conainer
                direction={"column"}
                smDown
                sx={{ display: { sm: "flex", xs: "none" } }}
              >
                <Typography
                  variant="h2"
                  textAlign={"center"}
                  sx={{ color: "#000000" }}
                >
                  {currentState === STATUS.GET_EMAIL_MOBILE
                    ? "Welcome Back"
                    : currentState === STATUS.OTP_CHECKING
                    ? "You Are Almost There"
                    : currentState === STATUS.PASSWORD_CHECKING
                    ? "You Are Almost There"
                    : null}
                </Typography>
                <Typography
                  variant="subtitle1"
                  textAlign={"center"}
                  sx={{
                    mt: 1,
                    mb: 3,
                    color: "#999999",
                    fontSize: "15px",
                    fontFamily: "Saira",
                  }}
                >
                  {currentState === STATUS.GET_EMAIL_MOBILE
                    ? "Hi My Friend. Please Enter Your User Name, Email Or Phone Number"
                    : currentState === STATUS.OTP_CHECKING
                    ? "Enter The Code Sent To You"
                    : currentState === STATUS.PASSWORD_CHECKING
                    ? "Enter Your Password"
                    : null}
                </Typography>
              </Grid>
              <Grid
                container
                direction={"column"}
                alignItems={"center"}
                sx={{
                  backgroundColor: "white!important",
                  py: { xs: 4, sm: 0 },
                  px: { sm: "auto", xs: 2 },
                  borderRadius: "24px",
                }}
              >
                <Hidden smUp>
                  <Grid container justifyContent={"flex-end"}>
                    <IconButton
                      sx={{
                        fontWeight: "light",
                        p: "0!important",
                      }}
                      onClick={handleBackToHome}
                    >
                      <CloseIcon sx={{ mr: 0.5, color: "lightGray" }} />
                    </IconButton>
                  </Grid>
                </Hidden>
                {currentState === STATUS.GET_EMAIL_MOBILE && (
                  <Grid sx={{ mb: 3 }}>
                    <SignInSignUpButtons />
                  </Grid>
                )}
                <Grid
                  container
                  direction={"column"}
                  sx={{ display: { sm: "none", xs: "flex" } }}
                >
                  <Typography
                    variant="h2"
                    sx={{ color: "#000000", fontWeight: "normal" }}
                  >
                    Login
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mt: 1,
                      mb: 3,
                      color: "black",
                      fontSize: "15px",
                      fontFamily: "Saira",
                    }}
                  >
                    Welcome To Neighbors Hub! You can sign in here.
                  </Typography>
                </Grid>
                {state[currentState]}{" "}
              </Grid>
            </Grid>
          </Grid>
          {/* <Hidden lgDown> */}
          <Grid
            item
            container
            lg={6}
            justifyContent={"flex-end"}
            sx={{
              // p: 2,
              // backgroundSize: "cover",
              // aspectRatio: 2,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              display: { lg: "flex", xs: "none" },
            }}
          >
            <img src={LoginImage.src} style={{ maxWidth: "100%" }} />
          </Grid>
          {/* </Hidden> */}
        </Card>
      </Container>
    </Grid>
  );
};

export default Signup;
