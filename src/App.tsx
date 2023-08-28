// not sure where to import this
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import RecruitPage from "./pages/RecruitPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import CollegeProfile, {
  loader as collegeProfileLoader,
} from "./components/CollegeProfile";
import { CssBaseline } from "@mui/material";

import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "recruit", element: <RecruitPage /> },
      { path: "contact", element: <ContactPage /> },
      {
        path: "college/:collegeName",
        element: <CollegeProfile />,
        loader: collegeProfileLoader,
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <RouterProvider router={router} />
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
