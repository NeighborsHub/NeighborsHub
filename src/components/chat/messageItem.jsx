import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import moment from "moment";

const MessageItem = ({ data, isMine }) => {
  return (
    <Grid
      container
      direction={isMine ? "row" : "row-reverse"}
      alignItems={"flex-end"}
      sx={{ p: 1 }}
    >
      <Grid
        container
        direction={"column"}
        sx={{
          bgcolor: isMine ? "#edf9ff" : "white",
          borderRadius: "10px",
          border: "1px solid #ebebeb",
          width: "auto",
          p: 1,
          boxShadow: "0 0 2px lightGray",
          minWidth: "70px",
          maxWidth: "270px",
        }}
      >
        <Typography sx={{ fontSize: "14px" }}>{data.message}</Typography>
        <Typography sx={{ fontSize: "11px", color: "gray" }} textAlign={"end"}>
          {moment(data.created_at).fromNow(true)} ago
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MessageItem;
