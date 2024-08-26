import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { myAddressesSelector, updateMyAddress } from "store/slices/userSlices";
import { getMyAddressesAction } from "store/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import Apis from "services/apis";
import { startLoading, endLoading } from "store/slices/appSlices";
import { useSnackbar } from "notistack";
import ConfirmationModal from "components/modal/confirmationModal";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Drawer from "components/drawer/drawer";
import BlackTrashIcon from "assets/svgs/BlackTrash.svg";
import BlackEdit from "assets/svgs/BlackEdit.svg";
import CustomListItem from "app/app/profile/addresses/customListItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const AddressList = () => {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const addresses = useSelector(myAddressesSelector);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const handleListItemClick = async (item) => {
    dispatch(startLoading());

    const result = await Apis.address.updateAddress({
      is_main_address: true,
      id: item.id,
    });
    if (result) {
      dispatch(updateMyAddress(result.address));
      enqueueSnackbar("Default Address Changed", { variant: "success" });
    }
    dispatch(endLoading());
  };

  const handleConfirmationModalOpen = (id) => {
    setConfirmationModalOpen(id);
  };

  const handleConfirmationModalClose = () => {
    setConfirmationModalOpen(false);
  };

  const handleDelete = async () => {
    dispatch(startLoading());

    Apis.address
      .deleteAddress({
        id: confirmationModalOpen,
      })
      .then(() => {
        enqueueSnackbar("Address Deleted Successfuly", { variant: "info" });
        dispatch(getMyAddressesAction());
      })
      .finally(() => {
        handleConfirmationModalClose();
        dispatch(endLoading());
      });
  };

  const menuItems = [
    {
      text: "Set As Default Address",
      onClick: handleListItemClick,
      icon: <img src={BlackEdit.src} />,
    },
    {
      text: "Edit",
      onClick: handleConfirmationModalOpen,
      icon: <img src={BlackTrashIcon.src} />,
    },
    {
      text: "Delete Location",
      onClick: handleDelete,
      icon: <img src={BlackEdit.src} />,
    },
  ];

  const handleOpenMenu = (_, event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Grid container direction="column" sx={{ pl: 1, flex: 1 }}>
      {addresses.length > 0 ? (
        <List>
          {addresses.map((item, index) => (
            <CustomListItem
              data={item}
              key={index}
              setDrawerOpen={handleOpenMenu}
            />
          ))}
        </List>
      ) : (
        // <List component="nav" aria-label="main mailbox folders">
        //   {addresses.map((item, index) => (
        //     <Grid
        //       container
        //       alignItems={"center"}
        //       key={item.id}
        //       sx={{ flexWrap: "nowrap" }}
        //     >
        //       <ListItemButton
        //         selected={item.is_main_address}
        //         onClick={() => handleListItemClick(item)}
        //         sx={{
        //           border: "1px solid lightGray",
        //           borderRadius: "15px",
        //           mt: 1,
        //         }}
        //       >
        //         <Typography>{item.street}</Typography>
        //       </ListItemButton>
        //       <IconButton
        //         onClick={() => handleConfirmationModalOpen(item.id)}
        //         sx={{ ml: 1 }}
        //       >
        //         <DeleteOutlineIcon />
        //       </IconButton>
        //     </Grid>
        //   ))}
        // </List>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ flex: 1 }}
        >
          {/* No Address */}
        </Grid>
      )}
      <ConfirmationModal
        open={Boolean(confirmationModalOpen)}
        handleClose={handleConfirmationModalClose}
        handleSubmit={handleDelete}
        text={"Are You Sure?"}
        width="xs"
      />

      <Menu
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={() => setAnchorEl(null)}
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
      <Drawer open={drawerOpen} setOpen={setDrawerOpen}>
        <Grid sx={{ p: 6 }}>
          <List>
            <ListItem>
              <ListItemButton
                sx={{ px: 0 }}
                onClick={() => {
                  handleOpenModal(data);
                  setDrawerOpen(false);
                }}
              >
                <ListItemIcon>
                  <img src={BlackEdit.src} />
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
                  Set As Default Address
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider sx={{ m: 1 }} />
            <ListItem>
              <ListItemButton sx={{ px: 0 }}>
                <ListItemIcon>
                  <img src={BlackTrashIcon.src} />
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
                  Edit
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider sx={{ m: 1 }} />
            <ListItem>
              <ListItemButton sx={{ px: 0 }}>
                <ListItemIcon>
                  <img src={BlackEdit.src} />
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
                  Delete Location
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </Drawer>
    </Grid>
  );
};

export default AddressList;
