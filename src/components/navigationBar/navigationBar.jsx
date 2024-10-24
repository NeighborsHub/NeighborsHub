import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Map from "assets/svgs/navigationBar/Map.svg";
import Chat from "assets/svgs/navigationBar/Chat.svg";
import Add from "assets/svgs/navigationBar/Add.svg";
import Posts from "assets/svgs/navigationBar/Posts.svg";
import MapColored from "assets/svgs/navigationBar/Map-colored.svg";
import ChatColored from "assets/svgs/navigationBar/Chat-colored.svg";
import AddColored from "assets/svgs/navigationBar/Add-colored.svg";
import PostsColored from "assets/svgs/navigationBar/Posts-colored.svg";
import Typography from "@mui/material/Typography";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { authSelector } from "store/slices/authSlices";

const NavigationBar = ({ onChange = () => {}, currentValue = null }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuth = useSelector(authSelector);
  const searchParams = useSearchParams();
  const currentState = new URLSearchParams(searchParams.toString()).get(
    "state"
  );

  const handleSelectItem = (index, path) => {
    router.push(`/app?state=${path}`);
  };

  return (
    <Grid
      container
      sx={{
        borderTopRightRadius: "30px",
        borderTopLeftRadius: "30px",
        backgroundColor: "white!important",
        py: "10px",
        height: "76px",
        marginTop: "-35px",
        zIndex: "100",
        border: "1px solid rgba(229, 229, 229, 1)",
        boxShadow: "0px -1px 10px 0px rgba(0, 0, 0, 0.1)",
      }}
      justifyContent={"space-evenly"}
      flexDirection={"row-reverse"}
    >
      <Icon
        icon={
          currentState === "map" || pathname + "?" + searchParams === "/app/"
            ? MapColored
            : Map
        }
        text={"map"}
        onClick={handleSelectItem}
        index={0}
        path={"map"}
        isSelected={currentState === "map" || pathname + "?" + searchParams === "/app/"}
      />
      {isAuth && (
        <Icon
          icon={
            currentState === "posts" || pathname.includes("/app/post/")
              ? PostsColored
              : Posts
          }
          text={"posts"}
          onClick={handleSelectItem}
          index={1}
          path={"posts"}
          isSelected={
            currentState === "posts" || pathname.includes("/app/post/")
          }
        />
      )}
      <Icon
        icon={currentState === "add-new-post" ? AddColored : Add}
        text={"Add Post"}
        onClick={handleSelectItem}
        index={2}
        path={"add-new-post"}
        isSelected={currentState === "add-new-post"}
      />
      {isAuth && (
        <Icon
          icon={
            currentState === "chats" || currentState === "conversation"
              ? ChatColored
              : Chat
          }
          text={"chats"}
          onClick={handleSelectItem}
          index={3}
          path={"chats"}
          isSelected={
            currentState === "chats" || currentState === "conversation"
          }
        />
      )}
    </Grid>
  );
};

export default NavigationBar;

const Icon = ({ icon, text, onClick, isSelected, index, path }) => {
  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      item
      xs
      onClick={() => onClick(index, path)}
      sx={{ cursor: "pointer" }}
    >
      <img src={icon.src} style={{ fill: "red" }} />
      {isSelected && (
        <Typography
          sx={{
            fontSize: "12px",
            mt: 0.5,
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
