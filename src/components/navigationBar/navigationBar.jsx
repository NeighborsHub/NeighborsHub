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
import { useRouter, usePathname } from "next/navigation";

const NavigationBar = ({ onChange = () => {}, currentValue = null }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  // const [selectedItemIndex, setSelectedItemIndex] = useState(
  //   pathname === "/app/map/"
  //     ? 0
  //     : pathname === "/app/posts/"
  //     ? 1
  //     : pathname === "/app/chat/"
  //     ? 2
  //     : null
  // );

  useEffect(() => {
    currentValue && setSelectedItemIndex(currentValue);
  }, [currentValue]);

  const handleSelectItem = (index, path) => {
    setSelectedItemIndex(index);
    onChange({}, index);
    // router.push("/app/" + path);
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
        icon={selectedItemIndex === 0 ? MapColored : Map}
        text={"map"}
        onClick={handleSelectItem}
        selectedItemIndex={selectedItemIndex}
        index={0}
      />
      <Icon
        icon={selectedItemIndex === 1 ? PostsColored : Posts}
        text={"posts"}
        onClick={handleSelectItem}
        selectedItemIndex={selectedItemIndex}
        index={1}
      />
      <Icon
        icon={selectedItemIndex === 2 ? AddColored : Add}
        text={"Add Post"}
        onClick={handleSelectItem}
        selectedItemIndex={selectedItemIndex}
        index={2}
      />
      <Icon
        icon={selectedItemIndex === 3 ? ChatColored : Chat}
        text={"chat"}
        onClick={handleSelectItem}
        selectedItemIndex={selectedItemIndex}
        index={3}
      />
    </Grid>
  );
};

export default NavigationBar;

const Icon = ({ icon, text, onClick, selectedItemIndex, index }) => {
  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      item
      xs
      onClick={() => onClick(index, text)}
      sx={{ cursor: "pointer" }}
    >
      <img src={icon.src} style={{ fill: "red" }} />
      {selectedItemIndex === index && (
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
