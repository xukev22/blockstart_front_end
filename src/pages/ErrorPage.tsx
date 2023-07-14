import MainNavigation from "../components/MainNavigation";
import { Stack } from "@mui/material";

const ErrorPage = () => {
  return (
    <Stack spacing={5}>
      <MainNavigation />
      <h1>Something went wrong!</h1>
    </Stack>
  );
};

export default ErrorPage;
