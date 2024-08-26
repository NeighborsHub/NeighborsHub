"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import SubHeader from "components/header/subHeader";
import TextField from "components/inputs/textfiled";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import SearchIcon from "assets/svgs/Search.svg";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { myAddressesSelector, updateMyAddress } from "store/slices/userSlices";
import Divider from "@mui/material/Divider";
import Drawer from "components/drawer/drawer";
import BlackTrashIcon from "assets/svgs/BlackTrash.svg";
import BlackEdit from "assets/svgs/BlackEdit.svg";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DesktopVersionWithNavigationAndHeader from "components/profile/desktopVersionWithNavigationAndHeader";

const Addresses = () => {
  const theme = useTheme();
  const desktopVersion = useMediaQuery(theme.breakpoints.up("lg"));
  const addresses = useSelector(myAddressesSelector);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  return desktopVersion ? (
    <DesktopVersionWithNavigationAndHeader>
      <Grid container justifyContent={"flex-end"}>
        <Button
          sx={{
            height: "33px",
            minHeight: 0,
            width: "90px",
            p: 0,
            color: "black!important",
            backgroundColor: "rgba(255, 216, 22, 1)",
          }}
          onClick={() => router.push("/app/profile/addresses/map")}
        >
          Add New
        </Button>
      </Grid>
      <Grid container direction={"column"} item xs sx={{ mt: 2 }}>
        <Grid container sx={{ mb: 2 }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={SearchIcon.src} />
                </InputAdornment>
              ),
            }}
            placeholder="Search"
            disabled
            fullWidth
          />
        </Grid>

        <Grid
          container
          direction={"column"}
          justifyContent={"flex-start"}
          item
          xs
          alignItems={"center"}
          sx={{
            flex: 1,
            backgroundColor: "white!important",
            boxSizing: "border-box",
            mb: 2,
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent={"flex-start"}
            sx={{
              backgroundColor: "white!important",
              borderRadius: "12px",
              // py: 4,
              mt: 2,
              boxSizing: "border-box",
              position: "relative",
            }}
            item
            xs
          >
            <Typography
              sx={{
                fontFamily: "Saira",
                color: "rgba(153, 153, 153, 1)",
                fontSize: "13px",
                ml: 1,
              }}
            >
              Your Addresses
            </Typography>

            <List>
              {addresses.map((item, index) => (
                <CustomlistItem
                  data={item}
                  key={index}
                  setDrawerOpen={setDrawerOpen}
                />
              ))}
            </List>
          </Grid>
        </Grid>
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
    </DesktopVersionWithNavigationAndHeader>
  ) : (
    <Grid container direction={"column"} item xs>
      <SubHeader title={"Your Addresses"} backPath={"/app/profile"}>
        <Button
          sx={{
            height: "33px",
            minHeight: 0,
            width: "90px",
            p: 0,
            color: "black!important",
            backgroundColor: "rgba(255, 216, 22, 1)",
          }}
          onClick={() => router.push("/app/profile/addresses/map")}
        >
          Add New
        </Button>
      </SubHeader>
      <Grid container sx={{ px: 2, mb: 2 }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={SearchIcon.src} />
              </InputAdornment>
            ),
          }}
          placeholder="Search"
          disabled
          fullWidth
        />
      </Grid>

      <Grid
        container
        direction={"column"}
        justifyContent={"flex-start"}
        item
        xs
        alignItems={"center"}
        sx={{
          flex: 1,
          px: 2,
          backgroundColor: "white!important",
          boxSizing: "border-box",
          mb: 2,
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent={"flex-start"}
          sx={{
            backgroundColor: "white!important",
            borderRadius: "12px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgba(229, 229, 229, 1)",
            py: 4,
            px: 2,
            boxSizing: "border-box",
            position: "relative",
          }}
          item
          xs
        >
          <Typography
            sx={{
              fontFamily: "Saira",
              color: "rgba(153, 153, 153, 1)",
              fontSize: "13px",
              ml: 2,
              mb: 0.5,
            }}
          >
            Your Addresses
          </Typography>

          <List>
            {addresses.map((item, index) => (
              <CustomlistItem
                data={item}
                key={index}
                setDrawerOpen={setDrawerOpen}
              />
            ))}
          </List>
        </Grid>
      </Grid>
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

export default Addresses;

const CustomlistItem = ({ data, setDrawerOpen, children }) => {
  return (
    <ListItemButton sx={{ p: 0, borderRadius: "10px", my: 0.5 }}>
      {children}
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" sx={{ width: "70px" }}>
            <MoreVertIcon onClick={() => setDrawerOpen(true)} />
          </IconButton>
        }
        sx={{
          border: "1px solid rgba(229, 229, 229, 1)",
          py: 1,
          px: 2,
          borderRadius: "12px",
        }}
      >
        <ListItemText
          primary={data.street}
          sx={{
            "& .MuiTypography-root": {
              fontSize: "13px!important",
              fontFamily: "Saira",
              pr: 3,
            },
          }}
        />
      </ListItem>
    </ListItemButton>
  );
};
