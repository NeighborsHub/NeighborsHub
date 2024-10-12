"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import FilterIcon from "assets/svgs/Filter.svg";
import FilterColoredIcon from "assets/svgs/Filter-colored.svg";
import FiltersDialog from "components/filters/filtersDialog";
import TextField from "components/inputs/textfiled";
import { useInputHandler } from "hooks/useInputHandler";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "assets/svgs/Search.svg";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import FilterCloseIcon from "assets/svgs/Close.svg";
import LocationIcon from "assets/svgs/Location.svg";
import ShopIcon from "assets/svgs/Shop.svg";
import { useSelector } from "react-redux";
import { filtersSelector } from "store/slices/postsSlices";

const AppHeader = ({ handleSearch = () => {}, dialogFilters }) => {
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const search = useInputHandler("");
  const filters = useSelector(filtersSelector);

  const orderedFilters = [
    ...filters.categories,
    `${filters.distance[0]} - ${filters.distance[1]}`,
    `${
      filters.is_seen
        ? "Seen Posts"
        : filters.is_seen === false
        ? "Unseen Posts"
        : undefined
    }`,
  ];

  const handleOpenFilterDialog = () => {
    setOpenFilterDialog(true);
  };

  const handleFilterDialogClose = () => {
    setOpenFilterDialog(false);
  };

  const handleClearSearch = () => {
    handleSearch("");
    search.onChange({ target: { value: "" } });
  };

  return (
    <Grid
      sx={{ borderBottom: "1px solid rgba(217, 217, 217, 1)", zIndex: "101" }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems={"center"}
          sx={{
            py: 1,
            height: "50px",
          }}
        >
          {handleSearch && (
            <TextField
              autocomplete="off"
              name="search"
              placeholder="Search"
              {...search}
              sx={{
                "& .MuiInputBase-input": {
                  py: "0!important",
                  height: "36px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleSearch(search.value)}
                      edge="end"
                    >
                      <img src={SearchIcon.src} />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: search.value ? (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClearSearch}
                      edge="end"
                    >
                      <CloseIcon sx={{ fill: "gray" }} />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  <Grid sx={{ width: "36px" }} />
                ),
              }}
            />
          )}
          <IconButton
            sx={{
              border: "1px solid rgba(230, 230, 230, 1)",
              borderRadius: "8px",
              height: "36px",
              width: "36px",
              ml: 1,
            }}
            onClick={handleOpenFilterDialog}
          >
            <img
              src={
                Object.values(dialogFilters)
                  ? FilterColoredIcon.src
                  : FilterIcon.src
              }
            />
          </IconButton>
          {orderedFilters.filter(Boolean).map((item, index) => (
            <FilterChip text={item} key={index} />
          ))}
          <FiltersDialog
            open={openFilterDialog}
            handleClose={handleFilterDialogClose}
          />
        </Grid>
      </Container>
    </Grid>
  );
};

export default AppHeader;

const FilterChip = ({ text }) => {
  return (
    <Chip
      label={
        <Grid container alignItems={"center"} sx={{ ml: "16px" }}>
          {text}
          {/* <img src={ShopIcon.src} style={{ marginLeft: "6px" }} /> */}
        </Grid>
      }
      sx={{
        ml: 1,
        backgroundColor: "rgba(242, 242, 242, 1)",
        border: "1px solid rgba(217, 217, 217, 1)",
        color: "black!important",
        fontFamily: "Saira",
        borderRadius: "10px",
        height: "32px",
      }}
      icon={
        <IconButton>
          <img src={FilterCloseIcon.src} sx={{ fill: "gray" }} />
        </IconButton>
      }
      // onClick={(e) => handleSeenMessage(true)}
    />
  );
};
