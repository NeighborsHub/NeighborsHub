import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

const ChatInput = ({ handleSendMessage, message }) => {
  return (
    <Grid container item sx={{ p: 1 }}>
      <form style={{ width: "100%" }} onSubmit={handleSendMessage}>
        <TextField
          autocomplete="off"
          name="search"
          placeholder="Write a message..."
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
          {...message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  type="submit"
                  edge="end"
                >
                  <SendIcon sx={{ fill: "gray" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Grid>
  );
};

export default ChatInput;
