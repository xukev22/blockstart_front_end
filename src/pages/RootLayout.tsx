import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { useMediaQuery, useTheme } from "@mui/material";

const RootLayout = () => {
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack spacing={isSmallerScreen ? 10 : 5}>
      <MainNavigation />
      <Outlet />
    </Stack>
  );
};

export default RootLayout;
