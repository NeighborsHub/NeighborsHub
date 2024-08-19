import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <Grid sx={{ display: "flex" }}>
      <Typography
        sx={{
          fontFamily: "Saira",
          color: "#000000",
          fontWeight: "700",
          fontSize: "1.5rem",
        }}
      >
        NEIGHBORS
      </Typography>
      <Typography
        sx={{
          fontFamily: "Saira",
          color: "#FFD816",
          fontWeight: "bold",
          ml: "3px",
          fontSize: "1.5rem",
        }}
      >
        HUB
      </Typography>
    </Grid>
  );
};

export default Logo;
