import Grid from "@mui/material/Grid";
import AddIcon from "assets/svgs/navigationBar/Add.svg";
import Chat from "assets/svgs/navigationBar/Chat.svg";
import Posts from "assets/svgs/navigationBar/Posts.svg";
import ChatColored from "assets/svgs/navigationBar/Chat-colored.svg";
import PostsColored from "assets/svgs/navigationBar/Posts-colored.svg";
import AddColoredIcon from "assets/svgs/navigationBar/Add-colored.svg";
import Typography from "@mui/material/Typography";
import NotificationIcon from "assets/svgs/navigationBar/Notification.svg";
import NotificationColoredIcon from "assets/svgs/navigationBar/Notification-colored.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DesktopListNavigations = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentState = new URLSearchParams(searchParams.toString()).get(
    "state"
  );

  const handleSelectItem = (index, status) => {
    router.push(`/app?state=${status}`, { shallow: true });
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
        icon={
          currentState === "notifications"
            ? NotificationColoredIcon
            : NotificationIcon
        }
        status={"notifications"}
        title={"Notifications"}
        onClick={handleSelectItem}
        index={2}
        isSelected={currentState === "notifications"}
      />

      <Icon
        icon={
          currentState === "chats" || currentState === "conversation"
            ? ChatColored
            : Chat
        }
        status={"chats"}
        title={"Chats"}
        onClick={handleSelectItem}
        index={2}
        isSelected={currentState === "chats" || currentState === "conversation"}
      />
      <Icon
        icon={currentState === "add-new-post" ? AddColoredIcon : AddIcon}
        status={"add-new-post"}
        title={"Add new Post"}
        onClick={handleSelectItem}
        index={1}
        isSelected={currentState === "add-new-post"}
      />
      <Icon
        icon={currentState === "posts" || !currentState ? PostsColored : Posts}
        status={"posts"}
        title={"Posts"}
        onClick={handleSelectItem}
        index={0}
        isSelected={currentState === "posts" || !currentState}
      />
    </Grid>
  );
};

export default DesktopListNavigations;

const Icon = ({ icon, status, title, onClick, isSelected, index }) => {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      item
      xs
      onClick={() => onClick(index, status)}
      sx={{ cursor: "pointer" }}
    >
      <img src={icon.src} style={{ height: "20px" }} />
      {isSelected && (
        <Typography
          sx={{
            fontSize: "12px",
            ml: 1,
            color: "#202328",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
      )}
    </Grid>
  );
};
