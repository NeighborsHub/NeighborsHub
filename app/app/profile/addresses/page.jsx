"use client";
import Grid from "@mui/material/Grid";
import SubHeader from "components/header/subHeader";
import TextField from "components/inputs/bootstrapInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

const Addresses = () => {
  return (
    <Grid container direction={"column"} item xs>
      <SubHeader title={"Your Addresses"} backPath={"/app/profile"}>
        <Button
          sx={{
            height: "33px",
            minHeight: 0,
            width: "90px",
            p: 0,
            color: "black!important",
            backgroundColor: "rgba(255, 216, 22, 1)",
          }}
        >
          Add New
        </Button>
      </SubHeader>
      <Grid
        container
        direction={"column"}
        justifyContent={"flex-start"}
        item
        xs
        alignItems={"center"}
        sx={{
          flex: 1,
          px: 2,
          backgroundColor: "white!important",
          boxSizing: "border-box",
          mb: 2,
        }}
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
            py: 4,
            px: 2,
            boxSizing: "border-box",
          }}
          item
          xs
        >
            <TextField/>

        </Grid>
      </Grid>
    </Grid>
  );
};

export default Addresses;
