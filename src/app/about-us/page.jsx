"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import "styles/styles.css";
import Image from "next/image";
import CanadaBoy from "assets/images/canadaBoy.jpg";
import Bear from "assets/images/bear.jpg";
// import Neighbors from "assets/images/neighbors.jpg";
import Neighbors from "assets/images/neighborsCelebrating.jpg";
import Coding from "assets/images/coding.jpg";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Woman from "assets/images/woman.jpg";
import Header from "components/header";
import Container from "@mui/material/Container";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useRouter } from "next/navigation";

const AboutUs = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const matchesLg = useMediaQuery(theme.breakpoints.down("lg"));
  var w = typeof window !== "undefined" && window.innerWidth;
  var h = typeof window !== "undefined" && window.innerHeight;
  const [navigationValue, setNavigationValue] = useState(2);
  const router = useRouter();

  return matches ? (
    <Grid container sx={{ overflowX: "hidden" }}>
      <Grid
        sx={{ height: "100vh", overflow: "hidden" }}
        container
        alignContent={"center"}
        xs={12}
        item
      >
        <Grid
          item
          xs={12}
          sx={{
            height: "100vh",
            position: "relative",
            overflow: "hidden",
          }}
          container
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid
            item
            container
            xs={12}
            justifyContent={"center"}
            alignItems={"center"}
            alignContent={"center"}
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              textShadow: "0 0 20px black",
              // height: "250px",
              backgroundImage:
                "radial-gradient( rgb(255,255,255 , 0.1) ,   transparent 70% )",
              margin: "auto",
              // border: "1px solid red",
            }}
            direction={"column"}
          >
            <h1
              style={{
                fontSize: "90px",
                margin: "10px 0",
                fontWeight: "bolder",
                color: "white",
                fontFamily: "Ephesis-Regular",
                textAlign: "center",
                fontWeight: "bold",
                // "-webkit-text-stroke": "1px white" /* width and color */,
              }}
            >
              Neighbors Hub
            </h1>
            <h1
              style={{
                fontSize: matchesLg ? "25px" : "30px",
                fontWeight: "200",
                color: "white",
                fontFamily: "Pacifico-Regular",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              A Tale of Connection Beyond Borders
            </h1>
          </Grid>
          <Grid
            style={{
              position: "absolute",
              top: 20,
              left: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            <Grid container justifyContent={"center"}>
              <BottomNavigation
                showLabels
                value={navigationValue}
                onChange={(event, newValue) => {
                  setNavigationValue(newValue);
                }}
                sx={{
                  width: "fit-content",
                  backgroundColor: "white",
                  borderRadius: "5px",
                }}
              >
                <BottomNavigationAction
                  sx={{
                    width: "100px",
                    // color: "white!important",
                    fontWeight: "bold",
                    mx: 2,
                    textShadow: "2px 2px 100px white",
                    "&.Mui-selected": {
                      color: "black!important",
                      borderBottom: "3px solid black",
                    },
                  }}
                  label="Home"
                  onClick={() => router.push("/")}
                />
                <BottomNavigationAction
                  label="App"
                  onClick={() => router.push("/app")}
                  sx={{
                    width: "100px",
                    // color: "white!important",
                    fontWeight: "bold",
                    mx: 2,
                    textShadow: "2px 2px 100px white",
                    "&.Mui-selected": {
                      color: "black!important",
                      borderBottom: "3px solid black",
                    },
                  }}
                />
                <BottomNavigationAction
                  label="About Us"
                  onClick={() => router.push("/about-us")}
                  sx={{
                    width: "100px",
                    // color: "white!important",
                    fontWeight: "bold",
                    mx: 2,
                    textShadow: "2px 2px 100px white",
                    "&.Mui-selected": {
                      color: "black!important",
                      borderBottom: "3px solid black",
                    },
                  }}
                />
              </BottomNavigation>
            </Grid>
          </Grid>
          <video
            style={{
              marginTop: h * 1.33 > w ? 0 : "-190px",
              width: w > h * 1.33 ? "100%" : "",
              height: h * 1.33 > w ? "100%" : "",
            }}
            autoPlay
            muted
            loop
          >
            <source
              src={`/neighborsCelebrating_animation (4).mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Grid>
      </Grid>
      {/* ///////////////////////////////// */}
      <Grid container>
        <Grid
          item
          md={6}
          xs={12}
          container
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
          sx={{
            height: "100vh",
            backgroundColor: "#f3f3f3",
            // color: "#cbccce",
            px: matchesLg ? 5 : 10,
          }}
        >
          <p
            style={{
              fontSize: matchesLg ? "25px" : "30px",
              fontWeight: "lighter",
              lineHeight: 1.5,
              fontFamily: "Cinzel",
              // fontStyle: "italic",
            }}
          >
            {`As a recent international student in Canada, I'm passionate about
            supporting fellow immigrants and embracing the rich cultural
            diversity of my new life. One chilly October evening, while video
            calling my family, the silent streets left me feeling isolated.`}
          </p>
        </Grid>
        <Grid
          md={6}
          xs={12}
          container
          justifyContent={"center"}
          alignItems={"center"}
          style={{
            height: "100vh",
            overflow: "hidden",
            position: "relative",
            // backgroundImage: `url(${CanadaBoy.src})`,
            // boxShadow: "#333333 0px 0px 40px 15px inset",
            // backgroundRepeat: "no-repeat",
          }}
        >
          <img
            src={CanadaBoy.src}
            style={{
              minHeight: "100%",
              minWidth: "100%",
              maxHeight: "auto",
              maxWidth: "auto",
              position: "absolute",
            }}
          />
        </Grid>
      </Grid>
      {/* ///////////////////////////////// */}
      <Grid container>
        <Grid
          container
          md={6}
          xs={12}
          item
          sx={{
            height: "100vh",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={Bear.src}
            style={{
              minHeight: "100%",
              minWidth: "100%",
              maxHeight: "auto",
              maxWidth: "auto",
              position: "absolute",
            }}
          />
        </Grid>
        <Grid
          container
          md={6}
          xs={12}
          item
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            height: "100vh",
            backgroundColor: "#061123",
            color: "white",
            px: matchesLg ? 5 : 10,
          }}
        >
          <p
            style={{
              fontSize: matchesLg ? "25px" : "30px",
              // fontWeight: "lighter",
              lineHeight: 1.5,
              fontFamily: "Cinzel",
              // fontStyle: "italic",
            }}
          >
            {`Abruptly interrupted, I learned of a bear sighting nearby. Panicked and unfamiliar with such situations, I sought guidance. The kindness of my neighbor from house number 1957 and her friend was immediate. Together, we navigated safely home, turning a potential danger into a lesson about the unexpected closeness of neighbors.`}
          </p>
        </Grid>
      </Grid>
      {/* ///////////////////////////////// */}
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          container
          item
          md={6}
          xs={12}
          sx={{
            py: 0,
            px: matchesLg ? 5 : 10,
            backgroundColor: "#f3f3f3",
          }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <p
            style={{
              fontSize: matchesLg ? "25px" : "30px",
              fontWeight: "lighter",
              lineHeight: 1.5,
              fontFamily: "Cinzel",
            }}
          >
            {`Gratefully encountering the lady in the following days, I realized that, in a world of freedom, supporting one another is crucial. The experience inspired me to revive a project I had set aside. Now, with a motto of "A Neighbor May be Closer Than Family," I am reminded each time I pass house number 1957 that the true essence of humanity lies in the bonds we build with those around us.`}
          </p>
        </Grid>
        <Grid
          md={6}
          xs={12}
          style={{
            height: "100vh",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={Woman.src}
            style={{
              minHeight: "100%",
              minWidth: "100%",
              maxHeight: "auto",
              maxWidth: "auto",
              position: "absolute",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  ) : (
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    <Grid container sx={{ overflowX: "hidden", height: "100vh" }}>
      <Grid
        sx={{ height: "100vh", overflow: "hidden" }}
        container
        alignContent={"center"}
      >
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            height: "100vh",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
          container
        >
          <Grid
            style={{
              position: "absolute",
              top: 20,
              left: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            <Grid container justifyContent={"center"}>
              <BottomNavigation
                showLabels
                value={navigationValue}
                onChange={(event, newValue) => {
                  setNavigationValue(newValue);
                }}
                sx={{
                  width: "fit-content",
                  backgroundColor: "transparent",
                  // borderRadius: "5px",
                  // borderLeft: "2px solid white",
                  // borderRight: "2px solid white",
                }}
              >
                <BottomNavigationAction
                  sx={{
                    width: "100px",
                    // color: "white!important",
                    fontWeight: "bold",
                    mx: 2,
                    textShadow: "2px 2px 100px white",
                    "&.Mui-selected": {
                      color: "white!important",
                      borderBottom: "2px solid white",
                      border: "2px solid white",
                    },
                  }}
                  label="Home"
                  onClick={() => router.push("/")}
                />
                <BottomNavigationAction
                  label="App"
                  onClick={() => router.push("/app")}
                  sx={{
                    width: "100px",
                    // color: "white!important",
                    fontWeight: "bold",
                    mx: 2,
                    textShadow: "2px 2px 100px white",
                    "&.Mui-selected": {
                      color: "white!important",
                      border: "2px solid white",
                      borderBottom: "2px solid white",
                    },
                  }}
                />
                <BottomNavigationAction
                  label="About Us"
                  onClick={() => router.push("/about-us")}
                  sx={{
                    width: "100px",
                    // color: "white!important",
                    fontWeight: "bold",
                    mx: 2,
                    textShadow: "2px 2px 100px white",
                    "&.Mui-selected": {
                      border: "2px solid white",
                      color: "white!important",
                      borderBottom: "2px solid white",
                    },
                  }}
                />
              </BottomNavigation>
            </Grid>
          </Grid>
          <Grid
            item
            container
            md={6}
            xs={12}
            justifyContent={"center"}
            alignItems={"center"}
            alignContent={"center"}
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              textShadow: "0 0 20px black",
              // height: "250px",
              backgroundImage:
                "radial-gradient( rgb(255,255,255 , 0.1) ,   transparent 70% )",
              margin: "auto",
              // border: "1px solid red",
            }}
            direction={"column"}
          >
            <h1
              style={{
                fontSize: "90px",
                margin: "10px 0",
                fontWeight: "bolder",
                color: "white",
                fontFamily: "Ephesis-Regular",
                textAlign: "center",
                fontWeight: "bold",
                // "-webkit-text-stroke": "1px white" /* width and color */,
              }}
            >
              Neighbors Hub
            </h1>
            <h1
              style={{
                fontSize: matchesLg ? "25px" : "30px",
                fontWeight: "200",
                color: "white",
                fontFamily: "Pacifico-Regular",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              A Tale of Connection Beyond Borders
            </h1>
          </Grid>
          <video
            // style={{
            //   // maxWidth: "100%",
            //   maxHeight: "100%",
            //   minHeight: "100%",
            //   height: "100%",
            //   // width: "300%",
            //   // position: "absolute",
            //   // top: "0",
            //   // right: "0",
            // }}
            style={{ height: "100%" }}
            autoPlay
            muted
            loop
          >
            <source
              src={`/neighborsCelebrating_animation (4).mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Grid>
      </Grid>
      {/* ///////////////////////////////// */}
      <Grid container>
        <Grid
          md={6}
          xs={12}
          style={{
            height: "100vh",
            backgroundImage: `url(${CanadaBoy.src})`,
            boxShadow: "#333333 0px 0px 40px 15px inset",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></Grid>
        <Grid
          item
          md={6}
          xs={12}
          container
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
          sx={{
            // height: "100vh",
            // background:
            //   "radial-gradient( rgba(99,42,14,1) 0%, rgba(99,42,14,1) 50%, rgba(57,23,7,1) 100%)",
            backgroundColor: "#f3f3f3",
            // color:
            //   "radial-gradient( rgba(99,42,14,1) 0%, rgba(99,42,14,1) 50%, rgba(57,23,7,1) 100%)",
            py: 2,
            px: 5,
          }}
        >
          <p
            style={{
              fontSize: matchesLg ? "25px" : "30px",
              lineHeight: 1.5,
              fontFamily: "Cinzel",
              textAlign: "center",
            }}
          >
            {`As a recent international student in Canada, I'm passionate about
            supporting fellow immigrants and embracing the rich cultural
            diversity of my new life. One chilly October evening, while video
            calling my family, the silent streets left me feeling isolated.`}
          </p>
        </Grid>
      </Grid>
      {/* ///////////////////////////////// */}
      <Grid container>
        <Grid
          container
          md={6}
          xs={12}
          item
          sx={{
            height: "100vh",
            backgroundImage: `url(${Bear.src})`,
            boxShadow: "#061123 0px 0px 40px 15px inset",
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <Grid
          container
          md={6}
          xs={12}
          item
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            // height: "100vh",
            backgroundColor: "#f3f3f3",

            // color: "white",
            py: 2,
            px: 5,
          }}
        >
          <p
            style={{
              fontSize: matchesLg ? "25px" : "30px",
              lineHeight: 1.5,
              fontFamily: "Cinzel",
              textAlign: "center",
            }}
          >
            {`Abruptly interrupted, I learned of a bear sighting nearby. Panicked and unfamiliar with such situations, I sought guidance. The kindness of my neighbor from house number 1957 and her friend was immediate. Together, we navigated safely home, turning a potential danger into a lesson about the unexpected closeness of neighbors.`}
          </p>
        </Grid>
      </Grid>
      {/* ///////////////////////////////// */}
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          md={6}
          xs={12}
          sx={{
            height: "100%",
            backgroundImage: `url(${Woman.src})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "52%",
            backgroundPosition: "center",
          }}
        ></Grid>
        <Grid
          container
          item
          md={6}
          xs={12}
          sx={{
            py: 2,
            px: 5,
            backgroundColor: "#f3f3f3",
            // color: "white",
          }}
        >
          <p
            style={{
              fontSize: matchesLg ? "25px" : "30px",
              // fontWeight: "lighter",
              lineHeight: 1.5,
              fontFamily: "Cinzel",
              textAlign: "center",
            }}
          >
            {`Gratefully encountering the lady in the following days, I realized that, in a world of freedom, supporting one another is crucial. The experience inspired me to revive a project I had set aside. Now, with a motto of "A Neighbor May be Closer Than Family," I am reminded each time I pass house number 1957 that the true essence of humanity lies in the bonds we build with those around us.`}
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
