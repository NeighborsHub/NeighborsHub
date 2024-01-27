import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import { BASE_URL } from "services/constants";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import ConfirmationModal from "components/modal/confirmationModal";
import { deletePost } from "store/actions/postsActions";
import { useDispatch } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Post = ({
  handleOpenModal,
  showLocationOnMap,
  data,
  handleClosePostsList,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenConfirmationModal = () => {
    setOpen(true);
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
    <Grid container direction={"column"} sx={{ pb: 3 }}>
      <Grid container sx={{ backgroundColor: "black" }}>
        <img
          src={BASE_URL + data.media?.[0]?.file}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "contain",
          }}
        />
      </Grid>
      <Grid container justifyContent={"space-between"}>
        <Typography sx={{ mt: 2, fontWeight: "bold", px: 2 }} variant="h5">
          {data.title}
        </Typography>

        <IconButton onClick={handleOpenMenu}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleOpenConfirmationModal}>
            <DeleteIcon /> Delete
          </MenuItem>
        </Menu>
      </Grid>
      <Grid
        container
        justifyContent={"space-between"}
        direction={"row-reverse"}
        sx={{ px: 2 }}
      >
        {showLocationOnMap && (
          <Button
            variant="text"
            color="primary"
            sx={{ pl: 1, display: "flex", alignItems: "flex-start" }}
            onClick={() => handleOpenModal(data)}
          >
            <LocationOnIcon sx={{ mr: 0.5 }} />
            <Typography sx={{ pt: 0.4 }} variant="subtitle2">
              {" "}
              Show On Map
            </Typography>
          </Button>
        )}
        {/* <Typography color="primary" sx={{ mt: 1, pl: 1 }} variant="subtitle1">
            10$ - 20$
          </Typography> */}
      </Grid>
      <Typography sx={{ mt: 1, px: 3, color: "gray" }} variant="subtitle1">
        {data.body}
      </Typography>
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

export default Post;
