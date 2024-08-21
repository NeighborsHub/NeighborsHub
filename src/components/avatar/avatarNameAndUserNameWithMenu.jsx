import { useState } from "react";
import AvatarNameAndUserName from "components/avatar/avatarNameAndUserName";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { myInfoSelector } from "store/slices/userSlices";
import { useRouter } from "next/navigation";
import ArrowDownIcon from "assets/svgs/ArrowDown.svg";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const AvatarNameAndUserNameWithMenu = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const myInfo = useSelector(myInfoSelector);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePushToARoute = (path) => router.push(path);

  const handleLogout = () => {
    dispatch(logoutAction())
      .then(() => {
        router.push("/");
      })
      .finally(() => {
        setAnchorEl(null);
      });
  };

  const menuItems = [
    { text: "Profile", onClick: () => handlePushToARoute("/app/profile/") },
    { text: "My Posts", onClick: () => handlePushToARoute("/app/my-posts") },
    { text: "Log Out", onClick: () => handleLogout() },
  ];

  return (
    <Button sx={{ p: 0 }}>
      <Grid
        container
        sx={{ width: "250px" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        onClick={handleOpenMenu}
      >
        <AvatarNameAndUserName
          onClick={handleOpenMenu}
          avatarSrc={myInfo.avatar?.avatar_thumbnail}
          name={myInfo.first_name + " " + myInfo.last_name}
          userName={myInfo.username}
        />
        <Grid sx={{ px: 2 }}>
          <img src={ArrowDownIcon.src} />
        </Grid>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </Button>
  );
};

export default AvatarNameAndUserNameWithMenu;
