import { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import Badge from "@mui/material/Badge";

const AvatarSelectable = () => {
  return (
    <>
      <Badge
        badgeContent={<AddIcon />}
        color="primary"
        sx={{
          "& .MuiBadge-badge": {
            top: "10px",
            right: "10px",
            width: "30px",
            height: "30px",
            borderRadius: "100%",
          },
          cursor: "pointer",
        }}
        onClick={handleChooseAvatarFile}
      >
        <Avatar
          alt="Remy Sharp"
          src={myInfo.avatar?.avatar_thumbnail}
          sx={{ width: "100px", height: "100px" }}
        />
      </Badge>
      <input
        type="file"
        ref={avatarInputRef}
        style={{ width: 0, height: 0, opacity: "hidden" }}
        onChange={handleSetAvatarImage}
      />
    </>
  );
};
