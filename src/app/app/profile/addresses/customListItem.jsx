"use client";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

const CustomListItem = ({ data, setDrawerOpen, children, onClick }) => {
  return (
    <ListItemButton
      sx={{ p: 0, borderRadius: "10px", my: 1 }}
      onClick={onClick}
    >
      {children}
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" sx={{ width: "70px" }}>
            <MoreVertIcon onClick={(e) => setDrawerOpen(true, e)} />
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

export default CustomListItem;
