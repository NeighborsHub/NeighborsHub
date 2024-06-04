import Modal from "components/modal/modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useInputHandler } from "hooks/useInputHandler";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FileUploaderList from "components/fileUploaderList/fileUploaderList";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { myAddressesSelector } from "store/slices/userSlices";
import { useState, useEffect } from "react";
import MenuList from "@mui/material/MenuList";
import AddressList from "components/profile/addresses/addressList";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import { createPostAction } from "store/actions/postsActions";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import Link from "next/link";
import Address from "components/profile/addresses/addresses";
import { authSelector } from "store/slices/authSlices";

const CreatePostModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const title = useInputHandler("");
  const description = useInputHandler("");
  const addresses = useSelector(myAddressesSelector);
  const [selectedAddress, setSelectedAddress] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState([]);
  const isCompletedProfile = Boolean(addresses.length);
  const isAuth = useSelector(authSelector);
  useEffect(() => {
    setSelectedAddress(addresses.find((item) => item.is_main_address));
  }, [addresses]);

  const [addressListModalOpen, setAddressListModalOpen] = useState(false);

  const handleListItemClick = (item) => {
    setSelectedAddress(item);
    setAddressListModalOpen(false);
  };

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append(`title`, title.value);
    formData.append(`body`, description.value);
    formData.append(`address_id`, selectedAddress.id);
    files.forEach((item, index) => {
      formData.append(`medias[${index}]`, item);
    });

    dispatch(createPostAction(formData))
      .then(() => {
        enqueueSnackbar("Post Created Successfuly", { variant: "success" });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err, { variant: "error" });
      });
  };

  const handleAddFileToList = (e) => {
    setFiles((prevState) => [...prevState, ...e.target.files]);
  };

  const handleRemoveFromList = (selectedItemIndex) => {
    setFiles((prevState) =>
      prevState.filter((item, index) => index !== selectedItemIndex)
    );
  };

  const handleCloseAddressModal = () => {
    setAddressListModalOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid container direction={"column"} sx={{ position: "relative" }}>
        {!isAuth && (
          <Grid
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "column",
              zIndex: 1000,
            }}
          >
            {/* {!isAuth ? (
              <>
                <Typography>
                  You need to sign in to your account to create a post
                </Typography>
                <Grid sx={{ mt: 2 }}>
                  <Link href="/signin">
                    <Button variant="contained">Sign in</Button>
                  </Link>
                </Grid>
              </>
            ) : (
              <>
                <Typography>
                  `You have To complete your personal information and add an
                  address before adding new post`
                </Typography>
                <Grid sx={{ mt: 2 }}>
                  <Link href="/profile">
                    <Button variant="contained">Go To Profile</Button>
                  </Link>
                </Grid>
              </>
            )} */}
            {!isAuth && (
              <>
                <Typography>
                  You need to sign in to your account to create a post
                </Typography>
                <Grid sx={{ mt: 2 }}>
                  <Link href="/signin">
                    <Button variant="contained">Sign in</Button>
                  </Link>
                </Grid>
              </>
            )}
          </Grid>
        )}
        <Grid
          container
          direction={"column"}
          sx={{ filter: isAuth ? "" : "blur(4px)" }}
        >
          <Typography variant="h6" textAlign={"center"}>
            Create Post
          </Typography>
          <TextField {...title} sx={{ mt: 2 }} label="Title" />
          <TextField
            {...description}
            multiline
            minRows={3}
            sx={{ mt: 2 }}
            label="Description"
          />
          <TextField
            multiline
            sx={{ mt: 2, cursor: "pointer" }}
            label="Address"
            onClick={() => setAddressListModalOpen(true)}
            value={selectedAddress?.street}
          />
          <Grid sx={{ mt: 2 }}>
            <FileUploaderList
              files={files}
              handleAddFileToList={handleAddFileToList}
              handleRemoveFromList={handleRemoveFromList}
            />
          </Grid>
          <Button
            sx={{
              borderRadius: "10px",
              height: "47px",
              fontSize: "13px",
              backgroundColor: "#0298e8",
              mt: 2,
            }}
            fullWidth
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      <Modal open={addressListModalOpen} onClose={handleCloseAddressModal}>
        {/* <Typography textAlign={"center"}>Choose Your Address</Typography>
        <List component="nav" aria-label="main mailbox folders">
          {addresses.map((item, index) => (
            <Grid
              container
              key={item.id}
              sx={{ flexWrap: "nowrap", cursor: "pointer" }}
            >
              <ListItemButton
                selected={item.id === selectedAddress?.id}
                onClick={() => handleListItemClick(item)}
                sx={{
                  border: "1px solid lightGray",
                  borderRadius: "15px",
                  mt: 1,
                }}
              >
                <Typography>{item.street}</Typography>
              </ListItemButton>
            </Grid>
          ))}
        </List> */}
        <Grid
          container
          direction={"column"}
          justifyContent={"space-between"}
          sx={{ minHeight: "300px" }}
        >
          <Address />
          <Grid container justifyContent={"flex-end"} sx={{ mt: 2 }}>
            <Button
              fullWidth
              onClick={handleCloseAddressModal}
              variant="contained"
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </Modal>
  );
};

export default CreatePostModal;
