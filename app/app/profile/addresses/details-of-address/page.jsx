"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "@mui/material/IconButton";
import SubHeader from "components/header/subHeader";
import InputLabel from "@mui/material/InputLabel";
import { useRouter } from "next/navigation";

const AddressesModalAddress = ({
  handleBack,
  handleSubmit,
  initialAddress,
}) => {
  const [address, setAddress] = useState(initialAddress);
  const [addressDetails, setAddressDetails] = useState("");
  const router = useRouter();

  const handleAddressChanged = (e) => {
    setAddress(e.target.value);
  };

  const handleAddressDetailsChanged = (e) => {
    setAddressDetails(e.target.value);
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
        title={"Details of Your Address"}
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
            sx={{ height: "100%" }}
            container
            direction={"column"}
            justifyContent={"flex-start"}
          >
            <Grid container justifyContent={"center"}>
              <Typography
                textAlign={"center"}
                sx={{
                  color: "rgba(153, 153, 153, 1)",
                  fontSize: "13px",
                  fontFamily: "Saira",
                  mt: 2,
                }}
              >
                Is this Address yours? You can edit it if there is error on it.
              </Typography>
            </Grid>
            <Grid container direction={"column"} sx={{ mt: 3, px: 1, flex: 1 }}>
              <InputLabel shrink htmlFor="bootstrap-input1" sx={{ mt: 1 }}>
                Address
              </InputLabel>
              <TextField
                value={address}
                fullWidth
                onChange={handleAddressChanged}
                // onChange={(e) => handleAddressListChange(key, e.target.value)}
                sx={{
                  mb: 2,
                }}
                multiline
                id="bootstrap-input1"
                value={
                  "حبیبی, مجتمع مسکونی فرهنگیان جنوبی, Dastgheyb, District 9, Tehran, بخش مرکزی شهرستان تهران, Tehran County, Tehran Province, 13497-15355, Iran"
                }
                disabled
              />
              <InputLabel shrink htmlFor="bootstrap-input2" sx={{ mt: 1 }}>
                Building NO. & etc.
              </InputLabel>
              <TextField
                value={addressDetails}
                placeholder={"Details"}
                fullWidth
                onChange={handleAddressDetailsChanged}
                // onChange={(e) => handleAddressListChange(key, e.target.value)}
                sx={{ mb: 2 }}
                id="bootstrap-input2"
              />
              {/* {Object.keys(addressList).map((key) => (
              <TextField
                key={key}
                value={addressList[key]}
                label={key}
                fullWidth
                onChange={(e) =>
                  handleAddressListChange(key, e.target.value)
                }
                sx={{ mb: 2 }}
              />
            ))} */}
            </Grid>
            <Grid container sx={{ px: 1 }}>
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
                onClick={() => router.push("/app/profile/addresses")}
                //   disabled={!selectedCordinate[0] && !selectedCordinate[1]}
              >
                Submit
              </Button>
            </Grid>
            {/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddressesModalAddress;
