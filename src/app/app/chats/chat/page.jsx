"use client";
import Grid from "@mui/material/Grid";
import Chat from "components/chat/chat";
import SubHeader from "components/header/subHeader";
import Button from "@mui/material/Button";
import TextField from "components/inputs/textfiled";
import InputAdornment from "@mui/material/InputAdornment";
import { useRouter } from "next/navigation";
import SearchIcon from "assets/svgs/Search.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Conversation from 'components/chat/conversation';

const ChatWrapper = () => {
  const router = useRouter();

  return <Conversation />;

  // return (
  //   <Grid container direction={"column"} item xs>
  //     <SubHeader title={"Milad Seyf"} backPath={"/app/"}>
  //       <IconButton edge="end" aria-label="delete" sx={{ width: "70px" }}>
  //         <MoreVertIcon />
  //       </IconButton>
  //     </SubHeader>
  //     <Grid container sx={{ px: 2, mb: 2 }}>
  //       <TextField
  //         InputProps={{
  //           startAdornment: (
  //             <InputAdornment position="start">
  //               <img src={SearchIcon.src} />
  //             </InputAdornment>
  //           ),
  //         }}
  //         placeholder="Search"
  //         disabled
  //         fullWidth
  //       />
  //     </Grid>

  //     <Grid
  //       container
  //       direction={"column"}
  //       justifyContent={"flex-start"}
  //       item
  //       xs
  //       alignItems={"center"}
  //       sx={{
  //         flex: 1,
  //         px: 2,
  //         backgroundColor: "white!important",
  //         boxSizing: "border-box",
  //         mb: 2,
  //       }}
  //     >
  //       <Grid
  //         container
  //         direction="column"
  //         justifyContent={"flex-start"}
  //         sx={{
  //           backgroundColor: "white!important",
  //           borderRadius: "12px",
  //           borderWidth: "1px",
  //           borderStyle: "solid",
  //           borderColor: "rgba(229, 229, 229, 1)",
  //           boxSizing: "border-box",
  //           position: "relative",
  //         }}
  //         item
  //         xs
  //       >
  //         <Chat />
  //       </Grid>
  //     </Grid>
  //   </Grid>
  // );
};
export default ChatWrapper;
