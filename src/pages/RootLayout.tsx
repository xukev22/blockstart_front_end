import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";

const RootLayout = () => {
  return (
    <Stack spacing={5}>
      <MainNavigation />
      <Outlet />
    </Stack>
  );
};

export default RootLayout;
