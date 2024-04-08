import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const ChatListItem = () => {
  return (
    <Grid
      container
      justifyContent="flex-start"
      sx={{
        borderBottom: "1px solid lightGray",
        borderLeft: "1px solid lightGray",
        borderRight: "1px solid lightGray",
        p: 1.5,
        bgcolor: "white",
      }}
      alignItems={"center"}
    >
      <Avatar />
      <Typography sx={{ fontWeight: "bold", ml: 1 }}>Sajad Seif</Typography>
    </Grid>
  );
};
export default ChatListItem;
