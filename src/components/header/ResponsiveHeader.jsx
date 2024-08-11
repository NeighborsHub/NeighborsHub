"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CreatePostModal from "components/posts/createPostModal";
import { useTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FiltersDialog from "components/filters/filtersDialog";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { useInputHandler } from "hooks/useInputHandler";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const ResponsiveHeader = ({
  handleSearch,
  dialogFilters,
  handleSubmitFilters,
}) => {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      sx={{ backgroundColor: "white!important", px: 2, height: "65px" }}
      alignItems={"center"}
    >
      <Grid
        sx={{
          p: "2px",
          border: "1px solid #F2F2F2",
          borderRadius: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar />
      </Grid>
      <Grid sx={{ display: "flex" }}>
        <Typography
          sx={{ fontFamily: "Saira", color: "#000000", fontWeight: "700" }}
        >
          NEIGHBORS
        </Typography>
        <Typography
          sx={{
            fontFamily: "Saira",
            color: "#FFD816",
            fontWeight: "bold",
            ml: "3px",
          }}
        >
          HUB
        </Typography>
      </Grid>
      <IconButton
        sx={{ borderRadius: "15px", boxShadow: "0 0 12px #0000001A" }}
      >
        <SearchIcon sx={{ color: "#999999" }} />
      </IconButton>
    </Grid>
  );
};

export default ResponsiveHeader;
