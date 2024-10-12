import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import ConfirmationModal from "components/modal/confirmationModal";
import { deletePostAction } from "store/actions/postsActions";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import DotsIcon from "assets/svgs/Post/Dots.svg";
import Drawer from "components/drawer/drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divier from "@mui/material/Divider";
import Message from "assets/svgs/Post/Message.svg";
import Report from "assets/svgs/Post/Report.svg";
import Block from "assets/svgs/Post/Block.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const Dots = ({
  showLocationOnMap,
  isMyPost,
  handleOpenModal,
  data,
  handleClosePostsList,
}) => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenConfirmationModal = () => {
    setOpen(true);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePost = () => {
    dispatch(deletePostAction({ id: data.id })).then(() => {
      handleClose();
      handleClosePostsList();
    });
  };

  return (
    <Grid sx={{ mx: 0.5 }}>
      <Chip
        onClick={(e) => (matchesMd ? handleOpenDrawer() : handleOpenMenu(e))}
        label={
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <img src={DotsIcon.src} />
            {/* <Typography
              sx={{
                fontFamily: "Saira",
                fontSize: "14px",
                fontWeight: "700",
                ml: 1,
              }}
            >
              See More
            </Typography> */}
          </Grid>
        }
        sx={{
          px: 0,
          borderRadius: "10px",
          height: "35px",
          width: "35px",
        }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {showLocationOnMap && (
          <MenuItem
            onClick={() => {
              handleOpenModal(data);
              setAnchorEl(null);
            }}
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
            classes={{
              "MuiMenuItem-root": {
                color: "red",
                backgroundColor: "red",
              },
            }}
            divider
          >
            <LocationOnOutlinedIcon
              sx={{
                mr: 0.5,
                fontSize: "28px!important",
                color: "black!important",
              }}
            />
            <Typography
              sx={{
                fontFamily: "Saira",
                fontSize: "14px",
                color: "black!important",
              }}
            >
              Show On Map
            </Typography>
          </MenuItem>
        )}
        {!isMyPost && (
          <MenuItem sx={{ display: "flex", alignItems: "flex-end" }} divider>
            <img src={Block.src} style={{ width: "28px", height: "25px" }} />
            <Typography
              sx={{
                fontFamily: "Saira",
                fontSize: "14px",
                color: "black!important",
                ml: 1,
              }}
            >
              Block
            </Typography>
          </MenuItem>
        )}
        {!isMyPost && (
          <MenuItem sx={{ display: "flex", alignItems: "flex-end" }}>
            <img src={Report.src} style={{ width: "28px", height: "25px" }} />
            <Typography
              sx={{
                fontFamily: "Saira",
                fontSize: "14px",
                color: "black!important",
                ml: 1,
              }}
            >
              Report
            </Typography>
          </MenuItem>
        )}
        {isMyPost && (
          <MenuItem
            onClick={() => {
              handleOpenConfirmationModal();
              setAnchorEl(null);
            }}
            sx={{ color: "red" }}
          >
            <DeleteIcon /> Delete
          </MenuItem>
        )}
      </Menu>
      <ConfirmationModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleDeletePost}
        text="Are You Sure about Deleting This Post?"
        width={"sm"}
      />
      <Drawer open={drawerOpen} setOpen={setDrawerOpen}>
        <Grid sx={{ p: 6 }}>
          <List>
            <ListItem>
              <ListItemButton
                sx={{ px: 0 }}
                onClick={() => {
                  handleOpenModal(data);
                  setAnchorEl(null);
                  setDrawerOpen(false);
                }}
              >
                <ListItemIcon>
                  <LocationOnOutlinedIcon
                    sx={{
                      mr: 0.5,
                      fontSize: "30px!important",
                      color: "black!important",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    ".MuiTypography-root": {
                      fontFamily: "Saira",
                      fontSize: "16px",
                      fontWeight: "bold",
                    },
                  }}
                >
                  Show On Map
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <Divier sx={{ m: 1 }} />
            <ListItem>
              <ListItemButton sx={{ px: 0 }}>
                <ListItemIcon>
                  <img
                    src={Report.src}
                    style={{ width: "30px", height: "30px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    ".MuiTypography-root": {
                      fontFamily: "Saira",
                      fontSize: "16px",
                      fontWeight: "bold",
                    },
                  }}
                >
                  Report
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <Divier sx={{ m: 1 }} />
            <ListItemButton sx={{ px: 0 }}>
              <ListItemIcon>
                <img
                  src={Block.src}
                  style={{ width: "30px", height: "30px" }}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  ".MuiTypography-root": {
                    fontFamily: "Saira",
                    fontSize: "16px",
                    fontWeight: "bold",
                  },
                }}
              >
                Block
              </ListItemText>
            </ListItemButton>
          </List>
        </Grid>
      </Drawer>
    </Grid>
  );
};

export default Dots;
