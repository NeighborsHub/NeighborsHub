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
import { useEffect, useState } from "react";
import { chatsSelector } from "store/slices/chatSlices";
import { getMyChatsAction } from "store/actions/chatActions";
import { useDispatch, useSelector } from "react-redux";

const ChatsList = ({ isFullWidth }) => {
  const search = useInputHandler("");
  const dispatch = useDispatch();
  const routeQuery = useRouteQuery();
  const chats = useSelector(chatsSelector);
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

  useEffect(() => {
    dispatch(getMyChatsAction());
  }, []);

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
        position: "relative",
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
        {chats.length > 0 ? (
          <Grid>
            {chats.map((item, index) => (
              <ChatsListItem
                key={index}
                data={item}
                onClick={() =>
                  handleGoToConversation({ conversationId: item.room_id })
                }
              />
            ))}
          </Grid>
        ) : (
          <Grid xs container alignItems={"center"} justifyContent={"center"}>
            You Have Not Any Conversation.
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
export default ChatsList;
