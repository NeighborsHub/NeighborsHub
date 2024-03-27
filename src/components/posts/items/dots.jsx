import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import ConfirmationModal from "components/modal/confirmationModal";
import { deletePost } from "store/actions/postsActions";
import { useDispatch } from "react-redux";

const Dots = ({
  showLocationOnMap,
  isMyPost,
  handleOpenModal,
  data,
  handleClosePostsList,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleOpenConfirmationModal = () => {
    setOpen(true);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePost = () => {
    dispatch(deletePost({ id: data.id })).then(() => {
      handleClose();
      handleClosePostsList();
    });
  };

  return (
    <Grid>
      <Chip
        onClick={handleOpenMenu}
        label={<MoreVertIcon sx={{ fill: "darkGray" }} />}
        sx={{ px: 0, ml: 1 }}
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
          >
            <LocationOnIcon sx={{ mr: 0.5 }} /> Show On Map
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
    </Grid>
  );
};

export default Dots;
