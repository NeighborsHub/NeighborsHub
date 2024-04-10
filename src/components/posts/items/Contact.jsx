import Grid from "@mui/material/Grid";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { snackActions } from "utils/SnackbarUtils";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { useRouteQuery } from "utils/route";

const Contact = ({ data }) => {
  const [contactOpen, setContactOpen] = useState(false);

  const handleCloseContactMenu = () => {
    setContactOpen(false);
  };

  const routeQuery = useRouteQuery();
  const handleGoToConversation = ({ conversationId }) =>
    routeQuery({
      status: "conversation",
      conversationId,
    });

  const handleCopyToClipboard = (value) => {
    if (isAuth) {
      navigator.clipboard.writeText(value);
      snackActions.info("Copied To Clipboard");
    } else {
      snackActions.warning("You Need To Login To Use This Information");
    }
  };

  return (
    <Grid>
      <Chip
        onClick={() => handleGoToConversation({ conversationId: data.id })}
        // onClick={(e) => setContactOpen(e.currentTarget)}
        label="Contact"
        sx={{
          bgcolor: "#0298E8",
          color: "white",
          ml: 1,
          "&:hover": {
            backgroundColor: "#0284c9",
          },
        }}
      />

      <Menu
        id="basic-menu"
        anchorEl={contactOpen}
        open={contactOpen}
        onClose={handleCloseContactMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ minWidth: "300px" }}
      >
        {data.created_by?.email && (
          <MenuItem
            sx={{ minWidth: "300px" }}
            onClick={() => handleCopyToClipboard(data.created_by?.email)}
          >
            <AlternateEmailIcon sx={{ mr: 1 }} />
            {data.created_by?.email}
          </MenuItem>
        )}
        {data.created_by?.mobile && (
          <MenuItem
            sx={{ minWidth: "300px" }}
            onClick={() => handleCopyToClipboard(data.created_by?.mobile)}
          >
            <PhoneIphoneIcon sx={{ mr: 1 }} />
            {data.created_by?.mobile}
          </MenuItem>
        )}
      </Menu>
    </Grid>
  );
};

export default Contact;
