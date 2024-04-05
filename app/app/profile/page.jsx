"use client";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonalData from "components/profile/personalData/personalData";
import Addresses from "components/profile/addresses/addresses";
import { useState, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Hidden from "@mui/material/Hidden";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Typography from "@mui/material/Typography";
import CallIcon from "@mui/icons-material/Call";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ContactData from "components/profile/contactData/contactData";
const Profile = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, value) => {
    setValue(value);
  };

  const status = {
    0: <PersonalData />,
    1: <ContactData />,
    2: <Addresses />,
  };

  return (
    <Container
      maxWidth={"lg"}
      sx={{
        overflowY: "auto",
        height: "calc( 100vh - 90px )",
        pb: 1,
        px: 0,
        display: "flex",
        direction: "column",
      }}
    >
      <Card sx={{ display: "flex", py: 1, flex: 1 }}>
        {/* ////////////////////////////////////// Responsive //////////////////////////////////////// */}
        <Hidden smUp>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            sx={{ flexWrap: "nowrap" }}
          >
            <Grid sx={{ width: "100%" }}>
              <Tabs
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  borderBottom: "1px solid lightGray",
                  "& .MuiTabs-scroller": {
                    display: "flex",
                    justifyContent: "center",
                  },
                }}
                value={value}
                onChange={handleChange}
              >
                <Tab label="Personal Data" />
                <Tab label="Contact Data" />
                <Tab label="Address" />
              </Tabs>
            </Grid>
            <Grid
              item
              justifyContent={"center"}
              sx={{ mt: 3, overflowY: "auto" }}
              container
            >
              {status[value]}
            </Grid>
          </Grid>
        </Hidden>
        {/* //////////////////////////////////////  //////////////////////////////////////// */}
        <Hidden smDown>
          <Grid
            item
            container
            direction={"column"}
            sx={{ width: "200px", mt: 3, pl: 1 }}
          >
            <Button
              onClick={() => setValue(0)}
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
              }}
            >
              {value === 0 ? <PersonIcon /> : <PersonOutlinedIcon />}
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: value === 0 && "bold",
                  ml: 1,
                }}
              >
                Personal Data
              </Typography>
            </Button>
            <Button
              onClick={() => setValue(1)}
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
              }}
            >
              {value === 1 ? <CallIcon /> : <CallOutlinedIcon />}
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: value === 1 && "bold",
                  ml: 1,
                }}
              >
                Contact Data
              </Typography>
            </Button>
            <Button
              onClick={() => setValue(2)}
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
              }}
            >
              {value === 2 ? <HomeIcon /> : <HomeOutlinedIcon />}
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: value === 2 && "bold",
                  ml: 1,
                }}
              >
                Address
              </Typography>
            </Button>
          </Grid>
          <Divider orientation="vertical" />
          <Grid
            item
            xs
            container
            justifyContent={"center"}
            sx={{ mt: 3, overflowY: "auto", px: 1 }}
          >
            {status[value]}
          </Grid>
        </Hidden>
      </Card>
    </Container>
  );
};
export default Profile;
