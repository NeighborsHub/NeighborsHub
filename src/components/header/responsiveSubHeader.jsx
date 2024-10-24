"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { myInfoSelector } from "store/slices/userSlices";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { logoutAction } from "store/actions/authActions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ResponsiveSubHeader = ({
  title = "",
  backPath,
  children,
  handleBack,
}) => {
  const router = useRouter();

  const handlePushToPreviousPage = () => {
    handleBack?.() || router.push(backPath);
  };

  return (
    <Grid
      container
      justifyContent={"flex-start"}
      sx={{
        backgroundColor: "white!important",
        px: 2,
        height: "65px",
        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.1)",
        zIndex: "1000",
        // mb: 2,
      }}
      alignItems={"center"}
    >
      <Grid sx={{ width: "90px" }}>
        <IconButton onClick={handlePushToPreviousPage}>
          <ArrowBackIcon sx={{ color: "black!important" }} />
        </IconButton>
      </Grid>
      <Typography
        sx={{
          fontFamily: "Saira",
          color: "black!important",
          fontSize: "18px",
          textAlign: "center",
          // width: "calc( 100% - 159px )",
          fontWeight: "bold",
          flex: 1,
        }}
      >
        {title}
      </Typography>
      <Grid sx={{ display: "flex", justifyContent: "flex-end", width: "90px" }}>
        {children}
      </Grid>
    </Grid>
  );
};

export default ResponsiveSubHeader;
