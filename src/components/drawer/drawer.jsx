import MuiDrawer from "@mui/material/Drawer";
import Grid from '@mui/material/Grid';

const Drawer = ({ children, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    paper: {
      backgroundColor: "red",
    },
  };

  return (
    <MuiDrawer
      anchor={"bottom"}
      open={open}
      onClose={handleClose}
      sx={{
        ".MuiDrawer-root": {
          maxHeight: "250px",
        },
        ".MuiDrawer-paper": {
          maxHeight: "250px",
          width: "100%",
        },
        ".MuiPaper-root": {
          margin: 0,
          borderRadius: "24px",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      }}
    >
      <Grid container direction="column" item xs>
        {children}
      </Grid>
    </MuiDrawer>
  );
};

export default Drawer;
