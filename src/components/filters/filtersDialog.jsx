import Grid from "@mui/material/Grid";
import Modal from "components/modal/modal";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getPostsAction } from "store/actions/postsActions";
import { categoriesSelector } from "store/slices/postsSlices";
import { useSelector, useDispatch } from "react-redux";
import {
  filtersSelector,
  defaultFilters,
  updateFilters,
} from "store/slices/postsSlices";

function valuetext(value) {
  return value;
}

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10000,
    label: "10KM",
  },
];

const FiltersDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);
  const filters = useSelector(filtersSelector);
  const [state, setState] = useState(filters);

  const handleClear = () => {
    setState((prevState) => ({
      ...prevState,
      filters: defaultFilters,
    }));
    handleClose();

    dispatch(updateFilters(defaultFilters));
  };

  const handleSetDistance = (e, distance) => {
    setState((prevState) => ({
      ...prevState,
      distance,
    }));
  };

  const handleSelectCategories = (name) => {
    const prevStatus = state.categories.find((item) => item === name);
    if (prevStatus) {
      setState((prevState) => ({
        ...prevState,
        categories: prevState.categories.filter(
          (item) => item !== name
        ),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        categories: [...prevState.categories, name],
      }));
    }
  };

  const handleSeenMessage = (bool) => {
    setState((prevState) => ({
      ...prevState,
      is_seen: prevState.is_seen === bool ? undefined : bool,
    }));
  };

  const handleSubmitFilters = () => {
    dispatch(updateFilters(state));
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} width="sm">
      <Grid container direction={"column"}>
        <Typography variant="h6">FILTERS</Typography>
        <Grid container direction={"column"} sx={{ px: 1, mt: 2 }}>
          <Grid container justifyContent={"flex-start"} alignItems={"center"}>
            <Typography
              sx={{
                fontSize: "11px",
                fontFamily: "Saira",
                color: "rgba(153, 153, 153, 1)",
              }}
            >
              Distance
            </Typography>
            <Divider
              sx={{
                flex: 1,
                ml: 2,
                height: "1.5px",
                backgroundColor: "rgba(217, 217, 217, 1)",
              }}
            />
          </Grid>
          <Grid sx={{ px: 4 }} container direction={"column"}>
            <Grid>
              <Chip
                label={state.distance[0] + " M"}
                sx={{
                  mr: 1,
                  mb: 1,
                  backgroundColor: "rgba(255, 216, 22, 1)",
                  color: "black",
                  width: "auto",
                  fontFamily: "Saira",
                }}
              />
              <Chip
                label={state.distance[1] + " M"}
                sx={{
                  mr: 1,
                  mb: 1,
                  backgroundColor: "rgba(255, 216, 22, 1)",
                  color: "black",
                  width: "auto",
                  fontFamily: "Saira",
                }}
              />
            </Grid>
            <Slider
              value={state.distance}
              onChange={handleSetDistance}
              getAriaValueText={valuetext}
              min={0}
              max={10000}
              marks={marks}
              sx={{
                "& .MuiSlider-track": {
                  backgroundColor: "rgba(255, 216, 22, 1)",
                  height: "0.250rem",
                },
                "& .MuiSlider-thumb": {
                  borderColor: "lightGray",
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid container direction={"column"} sx={{ mt: 2, px: 1 }}>
          <Grid container justifyContent={"flex-start"} alignItems={"center"}>
            <Typography
              sx={{
                fontSize: "11px",
                fontFamily: "Saira",
                color: "rgba(153, 153, 153, 1)",
              }}
            >
              Categories
            </Typography>
            <Divider
              sx={{
                flex: 1,
                ml: 2,
                height: "1.5px",
                backgroundColor: "rgba(217, 217, 217, 1)",
              }}
            />
          </Grid>
          <Grid container sx={{ px: 4 }}>
            {categories.map((item) => {
              const isSelected = state.categories.find(
                (item2) => item2 === item.internal_code
              );
              return (
                <Chip
                  label={item.title}
                  sx={{
                    mr: 1,
                    mb: 1,
                    backgroundColor: isSelected
                      ? "rgba(255, 216, 22, 1)!important"
                      : "",
                    color: isSelected ? "white" : "",
                    fontFamily: "Saira",
                  }}
                  onClick={() => handleSelectCategories(item.internal_code)}
                  key={item.title}
                />
              );
            })}
          </Grid>
          {/* <Grid container>
            <Grid
              container
              alignItems={"center"}
              sx={{
                border: "1px solid #DEDEDE",
                
                width: "auto",
                borderRadius: "30px",
                p: 0.5,
              }}
            >
              <Chip
                avatar={<Avatar alt="Natacha" />}
                label="Avatar"
                sx={{ mr: 1, backgroundColor: "" }}
              />
              <Chip
                avatar={<Avatar alt="Natacha" />}
                label="Avatar"
                sx={{ mr: 1 }}
              />
              <IconButton disabled={!state.filters.location}>
                <CloseIcon sx={{ color: "#7a7a7a" }} />
              </IconButton>
            </Grid>
          </Grid> */}
        </Grid>
        <Grid container direction={"column"} sx={{ px: 1 }}>
          <Grid container justifyContent={"flex-start"}>
            <Grid container justifyContent={"flex-start"} alignItems={"center"}>
              <Typography
                sx={{
                  fontSize: "11px",
                  fontFamily: "Saira",
                  color: "rgba(153, 153, 153, 1)",
                }}
              >
                Seen/Unseen Posts
              </Typography>
              <Divider
                sx={{
                  flex: 1,
                  ml: 2,
                  height: "1.5px",
                  backgroundColor: "rgba(217, 217, 217, 1)",
                }}
              />
            </Grid>
          </Grid>
          <Grid sx={{ px: 4 }}>
            <Chip
              label={"Seen Posts"}
              sx={{
                mr: 1,
                mb: 1,
                backgroundColor: state.is_seen
                  ? "rgba(255, 216, 22, 1)!important"
                  : "",
                color: state.is_seen ? "white" : "",
                fontFamily: "Saira",
              }}
              onClick={(e) => handleSeenMessage(true)}
            />
            <Chip
              label={"Unseen Posts"}
              sx={{
                mr: 1,
                mb: 1,
                backgroundColor:
                  state.is_seen === false
                    ? "rgba(255, 216, 22, 1)!important"
                    : "",
                color: state.is_seen === false ? "white" : "",
                "&:hover": {
                  backgroundColor: state.is_seen === false ? "#6652eb" : "",
                },
              }}
              onClick={() => handleSeenMessage(false)}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 3 }}>
          <Grid container xs={6} sx={{ px: 0.5 }}>
            <Button
              sx={{
                borderRadius: "10px",
                height: "40px",
                fontSize: "13px",
                color: "white!important",
                background:
                  "conic-gradient(from 180deg at 50% 50%, #202328 0deg, #5A6579 164.35deg, #202328 357.31deg, #202328 360deg)!important",
                "&:hover": {
                  background:
                    "conic-gradient(from 180deg at 50% 50%, #202328 0deg, #5A6579 164.35deg, #202328 357.31deg, #202328 360deg)",
                },
              }}
              fullWidth
              type="submit"
              color="secondary"
              name="otpLogin"
              onClick={handleClear}
            >
              Clear All Filters
            </Button>
          </Grid>
          <Grid container xs={6} sx={{ px: 0.5 }}>
            <Button
              sx={{
                borderRadius: "10px",
                height: "40px",
                fontSize: "13px",
                color: "black!important",
                backgroundColor: "rgba(255, 216, 22, 1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 216, 22, 1)",
                },
              }}
              fullWidth
              type="submit"
              // disabled={loading || !emailPhoneNumber.value}
              name="passwordLogin"
              onClick={handleSubmitFilters}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default FiltersDialog;
