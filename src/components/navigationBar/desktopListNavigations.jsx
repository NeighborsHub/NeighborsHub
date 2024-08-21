import { useState } from "react";
import Grid from "@mui/material/Grid";
import Chat from "assets/svgs/navigationBar/Chat.svg";
import Posts from "assets/svgs/navigationBar/Posts.svg";
import ChatColored from "assets/svgs/navigationBar/Chat-colored.svg";
import PostsColored from "assets/svgs/navigationBar/Posts-colored.svg";
import Typography from "@mui/material/Typography";
import NotificationIcon from "assets/svgs/navigationBar/Notification.svg";

const DesktopListNavigations = ({
  setSelectedNavigationItemIndex,
  selectedNavigationItemIndex,
}) => {
  const handleSelectItem = (index, path) => {
    setSelectedNavigationItemIndex(index);
    // router.push("/app/" + path);
  };

  return (
    <Grid
      container
      sx={{
        borderRadius: "12px",
        backgroundColor: "rgba(247, 247, 247, 1)!important",
        p: 2,
        height: "54px",
      }}
      justifyContent={"space-evenly"}
      flexDirection={"row-reverse"}
    >
      <Icon
        icon={selectedNavigationItemIndex === 2 ? NotificationIcon : NotificationIcon}
        text={"notification"}
        onClick={handleSelectItem}
        selectedItemIndex={selectedNavigationItemIndex}
        index={2}
      />
      <Icon
        icon={selectedNavigationItemIndex === 1 ? ChatColored : Chat}
        text={"chat"}
        onClick={handleSelectItem}
        selectedItemIndex={selectedNavigationItemIndex}
        index={1}
      />
      <Icon
        icon={selectedNavigationItemIndex === 0 ? PostsColored : Posts}
        text={"posts"}
        onClick={handleSelectItem}
        selectedItemIndex={selectedNavigationItemIndex}
        index={0}
      />
    </Grid>
  );
};

export default DesktopListNavigations;

const Icon = ({ icon, text, onClick, selectedItemIndex, index }) => {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      item
      xs
      onClick={() => onClick(index, text)}
      sx={{ cursor: "pointer" }}
    >
      <img src={icon.src} />
      {selectedItemIndex === index && (
        <Typography
          sx={{
            fontSize: "12px",
            ml: 1,
            color: "#202328",
            fontWeight: "bold",
          }}
        >
          {text}
        </Typography>
      )}
    </Grid>
  );
};
