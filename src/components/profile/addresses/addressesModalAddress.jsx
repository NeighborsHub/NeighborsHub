import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";

const AddressesModalAddress = ({
  handleBack,
  handleSubmit,
  initialAddress,
}) => {
  const [address, setAddress] = useState(initialAddress);
  const [addressDetails, setAddressDetails] = useState("");

  const handleAddressChanged = (e) => {
    setAddress(e.target.value);
  };

  const handleAddressDetailsChanged = (e) => {
    setAddressDetails(e.target.value);
  };

  return (
    <Grid
      sx={{ height: "100%", px: 4, py: 2 }}
      container
      direction={"column"}
      justifyContent={"flex-start"}
    >
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
          Submit Your Details Address
        </Typography>
      </Grid>
      <Grid>
        <Divider sx={{ height: "3px", my: 0.5 }} />
      </Grid>
      <Grid
        container
        direction={"column"}
        sx={{
          mt: 2,
          p: 2,
          py: 2,
          flex: 1,
          border: "1px solid #D9D9D9",
          borderRadius: "12px",
        }}
      >
        <InputLabel shrink htmlFor="bootstrap-input123">
          Address
        </InputLabel>
        <TextField
          fullWidth
          id="bootstrap-input123"
          value={address}
          onChange={handleAddressChanged}
          // onChange={(e) => handleAddressListChange(key, e.target.value)}
          multiline
        />
        <InputLabel shrink htmlFor="bootstrap-input122" sx={{ mt: 3 }}>
          Building NO. & etc.
        </InputLabel>
        <TextField
          fullWidth
          id="bootstrap-input122"
          // onChange={(e) => handleAddressListChange(key, e.target.value)}
          multiline
          value={addressDetails}
          label={"Details of address like building number and etc"}
          onChange={handleAddressDetailsChanged}
          // onChange={(e) => handleAddressListChange(key, e.target.value)}
        />
      </Grid>
      <Grid container sx={{ mt: 1 }} alignItems={"center"}>
        <Button
          sx={{
            borderRadius: "10px",
            height: "33px!important",
            minHeight: 0,
            color: "white!important",
            background:
              "conic-gradient(from 180deg at 50% 50%, #202328 0deg, #5A6579 164.35deg, #202328 357.31deg, #202328 360deg)!important",
            "&:hover": {
              background:
                "conic-gradient(from 180deg at 50% 50%, #202328 0deg, #5A6579 164.35deg, #202328 357.31deg, #202328 360deg)",
            },
            flex: 1,
            mr: 0.5,
          }}
          type="submit"
          color="secondary"
          name="otpLogin"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          onClick={() => handleSubmit(address, addressDetails)}
          sx={{
            height: "33px!important",
            minHeight: 0,
            color: "black!important",
            backgroundColor: "rgba(255, 216, 22, 1)",
            flex: 1,
            ml: 0.5,
          }}
        >
          Submit
        </Button>
      </Grid>
      {/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}
    </Grid>
  );
};

export default AddressesModalAddress;
