import { useTheme } from "@mui/material/styles";
import muiUseMediaQuery from "@mui/material/useMediaQuery";
const useMediaQuery = () => {
  const theme = useTheme();
  return (breakpoint) => muiUseMediaQuery(theme.breakpoints.down(breakpoint));
};

export default useMediaQuery;
