import Grid from "@mui/material/Grid";
import Avatar from "components/avatar/avatar";
import Typography from "@mui/material/Typography";

const AvatarNameAndUserName = ({
  avatarSrc,
  onClick,
  name = "",
  userName = "",
}) => {
  return (
    <Grid sx={{ display: "flex" }} onClick={onClick}>
      <Grid
        sx={{ display: "flex", width: "200px", overflow: "hidden" }}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Avatar
          avatarSrc={avatarSrc}
          onClick={onClick || (() => {})}
          withRing
        />
        <Grid
          container
          direction="column"
          sx={{ ml: 1 }}
          justifyContent={"center"}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontFamily: "Saira",
              fontSize: "14px",
              color: "black",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "160px",
              color: "black!important",
              textAlign: "start",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              color: "rgba(153, 153, 153, 1)",
              fontFamily: "Saira",
              fontSize: "10px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "160px",
            }}
          >
            @{userName}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AvatarNameAndUserName;
