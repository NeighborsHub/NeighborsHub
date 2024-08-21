"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import FilterIcon from "assets/svgs/Filter.svg";
import FiltersDialog from "components/filters/filtersDialog";
import TextField from "components/inputs/textfiled";
import { useInputHandler } from "hooks/useInputHandler";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "assets/svgs/Search.svg";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";

const AppHeader = ({
  handleSearch = () => {},
  handleSubmitFilters = () => {},
}) => {
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const search = useInputHandler("");

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
    <Grid sx={{ borderBottom: "2px solid rgba(217, 217, 217, 1)" }}>
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent={"flex-start"}
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
            <img src={FilterIcon.src} />
          </IconButton>
          <FiltersDialog
            open={openFilterDialog}
            handleClose={handleFilterDialogClose}
            handleSubmitFilters={(state) => {
              handleSubmitFilters(state);
              handleFilterDialogClose();
            }}
          />
        </Grid>
      </Container>
    </Grid>
  );
};

export default AppHeader;
