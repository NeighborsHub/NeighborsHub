"use client";
import Grid from "@mui/material/Grid";
import FirstSection from "components/landingPage/firstSection";
import SecondSection from "components/landingPage/secondSection";
import ThirdSection from "components/landingPage/thirdSection";
import Layout from "layout/HeaderFooter";
import "../app/globals.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Footer from "components/landingPage/footer";
import Divider from "@mui/material/Divider";
const LandingPage = () => {
  return (
    <Grid
      container
      direction={"column"}
      sx={{
        pt: { lg: 2, sm: 3 },
      }}
    >
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <Divider />
      <Footer />
    </Grid>
  );
};

const Test = () => {
  const theme = useTheme();
  const lgMatch = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Grid
      sx={{
        p: { lg: 6, sx: 0 },
      }}
      className={lgMatch ? "css-selector" : ""}
    >
      <Grid sx={{ borderRadius: { lg: 10, sx: 0 }, overflow: "hidden" }}>
        <Layout>
          <LandingPage />
        </Layout>
      </Grid>
    </Grid>
  );
};

export default Test;
