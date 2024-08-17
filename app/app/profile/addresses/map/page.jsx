"use client";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Map from "components/map/map";
import SubHeader from "components/header/subHeader";
import { useRouter } from "next/navigation";

const AddressModalMap = ({ handleSubmit }) => {
  const [selectedCordinate, setSelectedCordinate] = useState([null, null]);
  const router = useRouter();
  const handleSetSelectedLocation = (location) => {
    setSelectedCordinate(location);
  };

  return (
    <Grid
      container
      direction={"column"}
      item
      xs
      sx={{ overflow: "hidden", backgroundColor: "white!important" }}
    >
      <SubHeader
        title={"Your Address On Map"}
        backPath={"/app/profile/addresses"}
      />
      <Grid
        container
        direction="column"
        justifyContent={"flex-start"}
        sx={{ flex: 1, px: 2, boxSizing: "border-box", overflow: "auto" }}
      >
        <Grid
          container
          direction="column"
          justifyContent={"flex-start"}
          sx={{
            backgroundColor: "white!important",
            borderRadius: "12px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgba(229, 229, 229, 1)",
            pb: 4,
            px: 1,
            mb: 2,
          }}
          item
          xs
        >
          <Grid
            sx={{ flex: 1, mt: 1, borderRadius: "10px", overflow: "hidden" }}
          >
            <Map zoom={0} onClick={handleSetSelectedLocation} />
          </Grid>
          <Grid>
            <Button
              fullWidth
              sx={{
                mt: 1,
                backgroundColor: "rgba(255, 216, 22, 1)",
                color: "black!important",
                "&:hover": {
                  backgroundColor: "rgba(255, 216, 22, 1)",
                },
              }}
              onClick={() => router.push('/app/profile/addresses/details-of-address')}
              //   disabled={!selectedCordinate[0] && !selectedCordinate[1]}
            >
              Submit
            </Button>
          </Grid>
          {/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddressModalMap;
