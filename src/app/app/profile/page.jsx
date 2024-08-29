"use client";
import ResponsiveProfile from "components/profile/responsiveProfile";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DesktopVersionWithNavigationAndHeader from "components/profile/desktopVersionWithNavigationAndHeader";
import { useRouter } from "next/navigation";

const Profile = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  return matches ? (
    <ResponsiveProfile />
  ) : (
    <DesktopVersionWithNavigationAndHeader>
      {/* {router.push("/app/profile/edit-profile")} */}
    </DesktopVersionWithNavigationAndHeader>
  );
};

export default Profile;
