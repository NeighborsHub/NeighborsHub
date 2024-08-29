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
import Button from "@mui/material/Button";
import SubHeader from "components/header/subHeader";

const ChatsList = ({ isFullWidth }) => {
  const search = useInputHandler("");
  const dispatch = useDispatch();
  const routeQuery = useRouteQuery();
  const chats = useSelector(chatsSelector);
  const handleGoToConversation = ({ conversationId }) =>
    routeQuery(
      {
        status: "conversation",
        conversationId,
      },
      "/app/chat"
    );
  const handleGoToPostsList = () =>
    routeQuery({
      status: "posts",
    });

  const handleSubmit = () => {};

  useEffect(() => {
    dispatch(getMyChatsAction());
  }, []);

  return (
    <Grid container direction={"column"} item xs>
      <Grid container sx={{ px: 2, mb: 2, mt: 2 }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={SearchIcon.src} />
              </InputAdornment>
            ),
          }}
          placeholder="Search"
          disabled
          fullWidth
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #E5E5E5!important",
              borderRadius: '12px'
            },
          }}
        />
      </Grid>

      <Grid
        container
        direction={"column"}
        justifyContent={"flex-start"}
        item
        xs
        alignItems={"center"}
        sx={{
          flex: 1,
          px: 2,
          backgroundColor: "white!important",
          boxSizing: "border-box",
          mb: 2,
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent={"flex-start"}
          sx={{
            backgroundColor: "white!important",
            borderRadius: "12px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgba(229, 229, 229, 1)",
            // px: 2,
            boxSizing: "border-box",
            position: "relative",
          }}
          item
          xs
        >
          <Grid
            container
            direction="column"
            sx={{ flex: 1, overflowY: "auto" }}
          >
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
              <Grid
                xs
                container
                alignItems={"center"}
                justifyContent={"center"}
              >
                You Have Not Any Conversation.
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ChatsList;
