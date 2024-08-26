import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import PlaceIcon from "@mui/icons-material/Place";
import AddressList from "components/profile/addresses/addressList";
import AddressesModal from "components/profile/addresses/addressesModal";
import { useState } from "react";
import TextField from "components/inputs/textfiled";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "assets/svgs/Search.svg";
import Typography from "@mui/material/Typography";

const Addresses = () => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container direction="column" sx={{ flex: 1 }}>
      <Grid container justifyContent={"flex-end"}>
        <Button
          sx={{
            height: "33px",
            minHeight: 0,
            width: "90px",
            p: 0,
            color: "black!important",
            backgroundColor: "rgba(255, 216, 22, 1)",
          }}
          onClick={handleOpenModal}
        >
          Add New
        </Button>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={SearchIcon.src} />
              </InputAdornment>
            ),
          }}
          placeholder="Search"
          disabled
          fullWidth
        />
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <Typography
          sx={{
            fontFamily: "Saira",
            color: "rgba(153, 153, 153, 1)",
            fontSize: "13px",
            ml: 2,
            mb: 0.5,
          }}
        >
          Your Addresses
        </Typography>
      </Grid>
      <Grid
        container
        direction={"column"}
        sx={{ maxHeight: "calc( 100vh - 330px )", overflow: "auto", mt: 1 }}
      >
        <AddressList />
      </Grid>
      <AddressesModal open={open} handleClose={handleClose} />
    </Grid>
  );
};

export default Addresses;
