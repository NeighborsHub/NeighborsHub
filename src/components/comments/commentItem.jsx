import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const CommentItem = ({ data, myInfo }) => {
  return (
    <Grid container direction={"column"} sx={{ px: 2 }}>
      <Grid
        container
        justifyContent={"flex-start"}
        alignItems={"center"}
        sx={{ py: 1 }}
      >
        <Avatar src={data.avatar?.avatar_thumbnail} />
        <Grid item xs container direction={"column"}>
          <Typography sx={{ mx: 1, mt: 1, fontSize: "14px", color: "gray" }}>
            {data.created_by?.first_name + " " + data.created_by?.last_name}
          </Typography>
          <Typography sx={{ mx: 1, fontSize: "14px", color: "gray" }}>
            {data.body}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommentItem;
