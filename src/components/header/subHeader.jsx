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

const SubHeader = ({ title, backPath }) => {
  const router = useRouter();

  const handlePushToPreviousPage = () => {
    router.push(backPath);
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
        mb: 2,
      }}
      alignItems={"center"}
    >
      <IconButton onClick={handlePushToPreviousPage}>
        <ArrowBackIcon sx={{ color: "black!important" }} />
      </IconButton>
      <Typography
        sx={{
          fontFamily: "Saira",
          color: "black!important",
          fontSize: "18px",
          textAlign: "center",
          width: "calc( 100% - 80px )",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
    </Grid>
  );
};

export default SubHeader;
