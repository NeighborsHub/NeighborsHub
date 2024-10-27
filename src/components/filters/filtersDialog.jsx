import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Modal from "components/modal/modal";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
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

const checkboxesDefaultValue = {
  distance: false,
  categories: false,
  is_seen: false,
};

const FiltersDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);
  const filters = useSelector(filtersSelector);
  const [state, setState] = useState(filters);
  const [checkboxes, setCheckboxes] = useState(checkboxesDefaultValue);

  useEffect(() => {
    setState(filters);
    setCheckboxes(() => ({
      distance: Boolean(filters.distance.length),
      categories: filters.categories.length,
      is_seen: Boolean(filters.is_seen),
    }));
  }, [open]);

  const handleClear = () => {
    setState((prevState) => ({
      ...prevState,
      filters: defaultFilters,
    }));
    handleClose();

    dispatch(updateFilters(defaultFilters));
    setCheckboxes(checkboxesDefaultValue);
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
        categories: prevState.categories.filter((item) => item !== name),
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
    const finalFilters = {
      distance: [],
      categories: [],
      is_seen: undefined,
    };
    if (checkboxes.distance) finalFilters["distance"] = state.distance;
    if (checkboxes.categories) finalFilters["categories"] = state.categories;
    if (checkboxes.is_seen) finalFilters["is_seen"] = state.is_seen;

    dispatch(updateFilters(finalFilters));
    handleClose();
  };

  const handleEnablingDistanceFilters = () =>
    setCheckboxes((prev) => ({ ...prev, distance: true }));
  const handleEnablingCategoriesFilters = () =>
    setCheckboxes((prev) => ({ ...prev, categories: true }));
  const handleEnablingSeenPostsFilters = () =>
    setCheckboxes((prev) => ({ ...prev, is_seen: true }));

  const distanceOnChange = (e) => {
    if (!e.target.checked) {
      setState((prev) => ({ ...prev, distance: [0, 1000] }));
    }
    setCheckboxes((prev) => ({ ...prev, distance: e.target.checked }));
  };
  const categoriesOnChange = (e) => {
    if (!e.target.checked) {
      setState((prev) => ({ ...prev, categories: [] }));
    }
    setCheckboxes((prev) => ({ ...prev, categories: e.target.checked }));
  };
  const is_seenOnChange = (e) => {
    if (!e.target.checked) {
      setState((prev) => ({ ...prev, is_seen: undefined }));
    }
    setCheckboxes((prev) => ({ ...prev, is_seen: e.target.checked }));
  };

  return (
    <Modal open={open} onClose={handleClose} width="sm">
      <Grid container direction={"column"}>
        <Typography variant="h6">FILTERS</Typography>
        <FilterSection
          title={"Distance"}
          checkboxValue={checkboxes.distance}
          checkboxOnChange={distanceOnChange}
        >
          <Grid sx={{ px: 4 }} container direction={"column"}>
            <Grid>
              <Chip
                label={state.distance[0] || 0 + " M"}
                sx={{
                  mr: 1,
                  mb: 1,
                  backgroundColor: "rgba(255, 216, 22, 1)",
                  color: "black",
                  width: "auto",
                  fontFamily: "Saira",
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(0, 0, 0, 0.12)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 216, 22, 1)",
                  },
                }}
                disabled={!checkboxes.distance}
              />

              <Chip
                label={state.distance[1] || 1000 + " M"}
                sx={{
                  mr: 1,
                  mb: 1,
                  backgroundColor: "rgba(255, 216, 22, 1)",
                  color: "black",
                  width: "auto",
                  fontFamily: "Saira",
                  "&.Mui-disabled": {
                    backgroundColor: "rgba(0, 0, 0, 0.12)",
                  },
                }}
                disabled={!checkboxes.distance}
              />
            </Grid>

            <Slider
              onTouchStart={handleEnablingDistanceFilters}
              onMouseDown={handleEnablingDistanceFilters}
              value={state.distance.length ? state.distance : [0, 1000]}
              onChange={handleSetDistance}
              getAriaValueText={valuetext}
              min={marks[0].value}
              max={marks[1].value}
              marks={marks}
              sx={{
                "& .MuiSlider-track": {
                  backgroundColor: checkboxes.distance
                    ? "rgba(255, 216, 22, 1)"
                    : "rgba(242, 242, 242, 1)",
                  height: "0.250rem",
                },
                "& .MuiSlider-thumb": {
                  borderColor: "lightGray",
                },
              }}
            />
          </Grid>
        </FilterSection>
        <FilterSection
          title={"Categories"}
          checkboxValue={checkboxes.categories}
          checkboxOnChange={categoriesOnChange}
        >
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
                  onMouseUp={handleEnablingCategoriesFilters}
                />
              );
            })}
          </Grid>
        </FilterSection>

        <FilterSection
          title={"Seen Posts"}
          checkboxValue={checkboxes.is_seen}
          checkboxOnChange={is_seenOnChange}
        >
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
              onMouseUp={handleEnablingSeenPostsFilters}
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
              onMouseUp={handleEnablingSeenPostsFilters}
            />
          </Grid>
        </FilterSection>
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

const FilterSection = ({
  children,
  title,
  checkboxValue,
  checkboxOnChange,
}) => {
  return (
    <Grid container direction={"column"} sx={{ px: 1, mt: 2 }}>
      <Grid container justifyContent={"flex-start"} alignItems={"center"}>
        <Checkbox
          disableRipple
          sx={{
            color: "red!important",
            "&.Mui-checked": {
              color: "red!important",
            },
          }}
          checked={checkboxValue}
          onChange={checkboxOnChange}
        />
        <Typography
          sx={{
            fontSize: "11px",
            fontFamily: "Saira",
            color: "rgba(153, 153, 153, 1)",
          }}
        >
          {title}
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
      {children}
    </Grid>
  );
};
