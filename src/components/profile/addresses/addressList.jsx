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
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import ConfirmationModal from "components/modal/confirmationModal";

const AddressList = () => {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const addresses = useSelector(myAddressesSelector);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

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

  return (
    <Grid container direction="column" sx={{ pl: 1, flex: 1 }}>
      {addresses.length > 0 ? (
        <List component="nav" aria-label="main mailbox folders">
          {addresses.map((item, index) => (
            <Grid
              container
              alignItems={"center"}
              key={item.id}
              sx={{ flexWrap: "nowrap" }}
            >
              <ListItemButton
                selected={item.is_main_address}
                onClick={() => handleListItemClick(item)}
                sx={{
                  border: "1px solid lightGray",
                  borderRadius: "15px",
                  mt: 1,
                }}
              >
                <Typography>{item.street}</Typography>
              </ListItemButton>
              <IconButton
                onClick={() => handleConfirmationModalOpen(item.id)}
                sx={{ ml: 1 }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          ))}
        </List>
      ) : (
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
    </Grid>
  );
};

export default AddressList;
