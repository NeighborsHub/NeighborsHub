import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import moment from "moment";

const ChatsListItem = ({ onClick, data }) => {
  console.log(data, "teeeeeeeeeeeeeeeees");
  return (
    <ListItemButton
      container
      justifyContent="flex-start"
      sx={{
        p: 1.5,
        bgcolor: "white",
        alignItems: "stretch",
        borderBottom: "1px solid lightGray",
      }}
      alignItems={"stretch"}
      onClick={onClick}
    >
      <Grid item alignItems={"center"} container width={"45px"}>
        <Avatar />
      </Grid>
      <Grid item xs direction="column" sx={{ ml: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}>Seyf</Typography>
        <Typography>Hi. I can help you</Typography>
      </Grid>
      <Grid item width={"70px"} container alignItems={"flex-end"}>
        <Typography sx={{ fontSize: "12px", color: "gray" }}>
          {moment(data.updated_at).fromNow(true)} {' ago'}
        </Typography>
      </Grid>
    </ListItemButton>
  );
};
export default ChatsListItem;
