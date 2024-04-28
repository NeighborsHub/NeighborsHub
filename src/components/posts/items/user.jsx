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
      sx={{ cursor: "pointer", mt: 2 }}
    >
      <Avatar
        alt={data.created_by?.first_name}
        src={BASE_URL + data.created_by?.avatar.avatar_thumbnail}
      />
      <Typography sx={{ ml: 1, fontWeight: "bold" }}>
        {data.created_by?.username || "unknown"}
      </Typography>
    </Grid>
  );
};

export default User;
