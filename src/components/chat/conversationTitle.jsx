import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useRouteQuery } from "utils/route";

const ConversationTitle = () => {
  const routeQuery = useRouteQuery();

  const queryHandeling = () =>
    routeQuery({ status: "chats", conversationId: null });

  return (
    <Paper container sx={{ m: 1, p: 1, display: "flex", alignItems: "center" }}>
      <IconButton onClick={queryHandeling}>
        <ArrowBackIcon sx={{ fill: "gray" }} />
      </IconButton>
      <Divider orientation="vertical" sx={{ mx: 1 }} />
      <Avatar />
      <Typography sx={{ ml: 1, fontWeight: "bold" }}>Sajad Seif</Typography>
    </Paper>
  );
};
export default ConversationTitle;
