"use client";
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
import NavigationBar from "components/navigationBar/navigationBar";
import Hidden from "@mui/material/Hidden";
import SubHeader from "components/header/subHeader";

const AddNewPost = ({ open, handleClose }) => {
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

  return (
    <Grid container direction={"column"} sx={{ position: "relative" }} item xs>
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
            p: 2,
          }}
          container
          item
          xs
        >
          {!isAuth && (
            <>
              <Typography sx={{ fontFamily: "Saira" }}>
                You need to sign in to your account to create a post
              </Typography>
              <Grid sx={{ mt: 2 }}>
                <Link href="/signin">
                  <Button
                    sx={{
                      backgroundColor: "#FFD816",
                      color: "black!important",
                      maxHeight: "33px!important",
                      minHeight: 0,
                      "&:active": {
                        backgroundColor: "#FFD816",
                      },
                    }}
                  >
                    Sign in
                  </Button>
                </Link>
              </Grid>
            </>
          )}
        </Grid>
      )}
      <Hidden mdUp>
        <Grid container direction={"column"} item xs>
          <SubHeader title={"Add New Post"} backPath={"/app"}>
            {isAuth && (
              <Button
                sx={{
                  backgroundColor: "#FFD816",
                  color: "black!important",
                  maxHeight: "33px!important",
                  minHeight: 0,
                }}
              >
                Done
              </Button>
            )}
          </SubHeader>
          <Grid
            container
            justifyContent={"center"}
            sx={{ flex: 1, overflowY: "auto", px: 2 }}
            id="appPostLists"
            item
            xs
          >
            <Grid
              container
              direction={"column"}
              sx={{
                filter: isAuth ? "" : "blur(4px)",
                border: "1px solid #E5E5E5",
                p: 2,
                borderRadius: "12px",
              }}
            >
              <Grid
                container
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ mb: 2 }}
              >
                <FileUploaderList
                  files={files}
                  handleAddFileToList={handleAddFileToList}
                  handleRemoveFromList={handleRemoveFromList}
                />
              </Grid>
              <TextField {...title} label="Title" />
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
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default AddNewPost;
