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

const AppHeader = ({ handleSearch, dialogFilters, handleSubmitFilters }) => {
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const search = useInputHandler("");
  const theme = useTheme();
  const matcheMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenFilterDialog = () => {
    setOpenFilterDialog(true);
  };

  const handleFilterDialogClose = () => {
    setOpenFilterDialog(false);
  };

  const handleCreatePostModalOpen = () => {
    setCreatePostModalOpen(true);
  };
  const handleCreatePostModalClose = () => {
    setCreatePostModalOpen(false);
  };

  return (
    <Grid
      container
      justifyContent={"space-between"}
      sx={{
        py: 1,
        px: { sm: 4, xs: 1 },
        bgcolor: "#e8e8e8",
        borderTop: "1px solid #d4d4d4",
        borderBottom: "1px solid #d4d4d4",
      }}
    >
      <Grid container item xs={6}>
        <TextField
          autocomplete="off"
          name="search"
          placeholder="Search"
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            "& .MuiOutlinedInput-notchedOutline": {
              fontSize: "12px",
              display: "none",
            },
            "& .MuiInputBase-input": {
              padding: "12px 20px",
            },
          }}
          InputLabelProps={{
            sx: {
              color: "darkenGray",
              fontSize: "12px",
              fontWeight: "bold",
            },
          }}
          {...search}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleSearch}
                  edge="end"
                >
                  <SearchIcon sx={{ fill: "gray" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid container xs={6} justifyContent={"flex-end"}>
        <Button
          sx={{
            mr: { xs: 1, md: 2 },
            px: { md: 4, sm: 1, xs: 0 },
            borderRadius: "10px",
            fontSize: "13px",
            backgroundColor: "#e85a02",
            "&:hover": {
              backgroundColor: "#f27527",
            },
            minWidth: { xs: "40px", sm: "64px" },
          }}
          variant="contained"
          onClick={handleOpenFilterDialog}
        >
          {!matcheMdDown && "Filters"}
          <Badge
            badgeContent={
              dialogFilters.filters
                ? Object.values(dialogFilters.filters).filter(Boolean).length
                : 0
            }
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "red",
                border: "1px solid white",
                top: "6px",
                right: "-1px",
              },
            }}
          >
            <FilterAltIcon
              color="action"
              sx={{ color: "white", ml: { sm: 0, md: 1 } }}
            />
          </Badge>
        </Button>
        <Button
          variant="contained"
          onClick={handleCreatePostModalOpen}
          sx={{
            borderRadius: "10px",
            // height: "47px",
            fontSize: "13px",
            backgroundColor: "#0298e8",
            px: { md: 4, sm: 1, xs: 0 },
            minWidth: { xs: "40px", sm: "64px" },
          }}
        >
          {!matcheMdDown && "Add New Post"}

          <AddIcon
            color="action"
            sx={{ color: "white", ml: { sm: 0, md: 1 } }}
          />
        </Button>
      </Grid>
      <FiltersDialog
        open={openFilterDialog}
        handleClose={handleFilterDialogClose}
        handleSubmitFilters={(state) => {
          handleSubmitFilters(state);
          handleFilterDialogClose();
        }}
      />
      <CreatePostModal
        open={createPostModalOpen}
        handleClose={handleCreatePostModalClose}
      />
    </Grid>
  );
};

export default AppHeader;
