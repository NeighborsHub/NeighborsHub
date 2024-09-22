import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import Avatar from "components/avatar/avatar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";

const PostHeader = ({ title, avatar }) => {
  return (
    <Grid
      sx={{
        backgroundColor: "white!important",
        px: 2,
        height: "55px",
        boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.1)",
        zIndex: "1000",
      }}
      container
      alignItems={"center"}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent={"flex-start"} alignItems={"center"}>
          <Link href={"/app"}>
            <IconButton>
              <KeyboardBackspaceIcon
                sx={{ color: "black", fontSize: "24px!important" }}
              />
            </IconButton>
          </Link>
          <Grid sx={{ px: 2 }}>
            <Avatar withRing avatarSrc={avatar} />
          </Grid>
          <Typography sx={{ fontSize: "14px" }}>{title}</Typography>
        </Grid>
      </Container>
    </Grid>
  );
};

export default PostHeader;
