import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "services/constants";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";

const User = ({ data }) => {
  const router = useRouter();

  const handleRirectToUserProfile = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/app/user?id=${id}`);
  };
  return (
    <Grid
      item
      container
      alignItems={"center"}
      onClick={(e) => handleRirectToUserProfile(e, data.created_by.id)}
      sx={{ cursor: "pointer" }}
    >
      <Avatar
        alt={data.created_by?.first_name}
        src={BASE_URL + data.created_by?.avatar.avatar_thumbnail}
        sx={{ width: "35px", height: "35px" }}
      />
      <Typography
        sx={{
          ml: 1,
          fontSize: "14px",
          fontFamily: "Saira",
          fontWeight: "bold",
        }}
      >
        {data.created_by?.username || data.created_by?.first_name + ' ' + data.created_by?.last_name || "unknown"}
      </Typography>
    </Grid>
  );
};

export default User;
