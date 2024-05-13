import Grid from "@mui/material/Grid";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { snackActions } from "utils/SnackbarUtils";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { useRouteQuery } from "utils/route";

const Contact = ({
  data,
  handleClosePostListOnModal = () => {},
  handleChangeTab,
}) => {
  const [contactOpen, setContactOpen] = useState(false);
  console.log(handleChangeTab , 'ggggggggggg')
  const handleCloseContactMenu = () => {
    setContactOpen(false);
  };

  const routeQuery = useRouteQuery();

  const handleGoToConversation = () => {
    handleChangeTab(2);
    routeQuery(
      {
        status: "conversation",
        conversationId: data.common_chat,
        userId: data.created_by.id,
        postId: data.id,
      },
      "/app/"
    );
  };

  const handleCopyToClipboard = (value) => {
    if (isAuth) {
      navigator.clipboard.writeText(value);
      snackActions.info("Copied To Clipboard");
    } else {
      snackActions.warning("You Need To Login To Use This Information");
    }
  };

  return (
    <Grid onClick={handleClosePostListOnModal}>
      <Chip
        onClick={() => handleGoToConversation()}
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
