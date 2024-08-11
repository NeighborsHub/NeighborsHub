import { useState } from "react";
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

const NavigationBar = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const handleSelectItem = (index) => setSelectedItemIndex(index);
  return (
    <Grid
      container
      sx={{
        borderTopRightRadius: "30px",
        borderTopLeftRadius: "30px",
        backgroundColor: "white!important",
        py: "20px",
        height: "90px",
      }}
      justifyContent={"space-evenly"}
    >
      <Icon
        icon={selectedItemIndex === 3 ? ChatColored : Chat}
        text={"chat"}
        onClick={() => handleSelectItem(3)}
        selectedItemIndex={selectedItemIndex}
        index={3}
      />
      <Icon
        icon={selectedItemIndex === 2 ? AddColored : Add}
        text={"add"}
        onClick={() => handleSelectItem(2)}
        selectedItemIndex={selectedItemIndex}
        index={2}
      />
      <Icon
        icon={selectedItemIndex === 1 ? PostsColored : Posts}
        text={"posts"}
        onClick={() => handleSelectItem(1)}
        selectedItemIndex={selectedItemIndex}
        index={1}
      />
      <Icon
        icon={selectedItemIndex === 0 ? MapColored : Map}
        text={"map"}
        onClick={() => handleSelectItem(0)}
        selectedItemIndex={selectedItemIndex}
        index={0}
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
      onClick={onClick}
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
