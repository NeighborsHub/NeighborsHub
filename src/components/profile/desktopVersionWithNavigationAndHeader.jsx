import ProfileNavigation from "components/profile/profileNavigation";
import Grid from "@mui/material/Grid";
import Header from "components/header";
import Container from "@mui/material/Container";

const DesktopVersionWithNavigationAndHeader = ({ children }) => {
  return (
    <Grid container direction={"column"} item xs>
      <Header />
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Grid container sx={{ mt: 2, flex: 1, mb: 2 }}>
          <Grid container item xs={3}>
            <Grid
              sx={{
                border: "1px solid #F2F2F2",
                p: 1,
                borderRadius: "15px",
                height: "fit-content",
              }}
              container
            >
              <ProfileNavigation withLable={false} />
            </Grid>
          </Grid>
          <Grid
            sx={{
              ml: 3,
              border: "1px solid #F2F2F2",
              borderRadius: "15px",
              backgroundColor: "white!important",
              py: 4,
              px: 4,
            }}
            xs
          >
            {children}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default DesktopVersionWithNavigationAndHeader;
