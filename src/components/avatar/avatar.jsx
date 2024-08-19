import Grid from "@mui/material/Grid";
import MuiAvatar from "@mui/material/Avatar";

const Avatar = ({ withRing, avatarSrc, onClick }) => {
   return (
    <Grid
      sx={{
        p: "2px",
        border: withRing && "1px solid #F2F2F2",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MuiAvatar
        src={avatarSrc}
        sx={{
          cursor: onClick && "pointer",
        }}
        onClick={onClick || (() => {})}
      />
    </Grid>
  );
};

export default Avatar;
