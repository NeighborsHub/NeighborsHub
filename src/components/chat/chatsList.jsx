import Grid from "@mui/material/Grid";
import ChatsListItem from "components/chat/ChatsListItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useInputHandler } from "hooks/useInputHandler";
import { useSearchParams } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouteQuery } from "utils/route";

const chatListData = [{ id: 1 }, { id: 2 }];

const ChatsList = ({ isFullWidth }) => {
  const search = useInputHandler("");

  const routeQuery = useRouteQuery();
  const handleGoToConversation = ({ conversationId }) =>
    routeQuery({
      status: "conversation",
      conversationId,
    });
  const handleGoToPostsList = () =>
    routeQuery({
      status: "posts",
    });

  const handleSubmit = () => {};

  return (
    <Grid
      item
      xs
      container
      sx={{
        p: 1,
        flex: 1,
        overflow: "hidden",
        borderBottom: "1px solid lightGray",
      }}
      direction={"column"}
    >
      <Grid container sx={{ pb: 1 }} alignItems={"center"}>
        <Grid>
          {isFullWidth && (
            <IconButton>
              <ArrowBackIcon
                sx={{ fill: "gray" }}
                onClick={handleGoToPostsList}
              />
            </IconButton>
          )}
        </Grid>
        <Grid item xs sx={{ pl: 1 }}>
          <TextField
            autocomplete="off"
            name="search"
            placeholder="Search"
            fullWidth
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",

              "& .MuiOutlinedInput-notchedOutline": {
                fontSize: "12px",
                display: "none",
              },
              "& .MuiInputBase-input": {
                padding: "12px 20px",
              },
            }}
            InputLabelProps={{
              sx: {
                color: "darkenGray",
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            {...search}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSubmit}
                    edge="end"
                  >
                    <SearchIcon sx={{ fill: "gray" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container direction="column" sx={{ flex: 1, overflowY: "auto" }}>
        <Grid>
          {chatListData.map((item, index) => (
            <ChatsListItem
              key={index}
              data={item}
              onClick={() =>
                handleGoToConversation({ conversationId: item.id })
              }
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ChatsList;
