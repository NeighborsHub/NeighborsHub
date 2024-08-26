import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Map from "components/map/map";
import Divider from "@mui/material/Divider";

const AddressModalMap = ({ handleSubmit }) => {
  const [selectedCordinate, setSelectedCordinate] = useState([null, null]);
  const handleSetSelectedLocation = (location) => {
    setSelectedCordinate(location);
  };

  return (
    <Grid sx={{ height: "400px" }} container direction={"column"}>
      <Grid>
        <Typography
          textAlign={"left"}
          sx={{
            fontFamily: "Saira",
            fontSize: "13px",
            color: "black!important",
            fontWeight: "bold",
          }}
        >
          Select your location on map and submit
        </Typography>
      </Grid>
      <Grid>
        <Divider sx={{ height: "3px", my: 0.5 }} />
      </Grid>
      <Grid sx={{ flex: 1, mt: 1 }}>
        <Map zoom={0} onClick={handleSetSelectedLocation} />
      </Grid>
      <Grid>
        <Button
          fullWidth
          sx={{
            height: "33px",
            minHeight: 0,
            p: 0,
            color: "black!important",
            backgroundColor: "rgba(255, 216, 22, 1)",
            mt: 2,
          }}
          onClick={() => handleSubmit(selectedCordinate)}
          disabled={!selectedCordinate[0] && !selectedCordinate[1]}
        >
          {!selectedCordinate[0] && !selectedCordinate[1]
            ? "Click your position on map"
            : "Submit"}
        </Button>
      </Grid>
      {/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}
    </Grid>
  );
};

export default AddressModalMap;
