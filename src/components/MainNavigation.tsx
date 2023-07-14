import React, { useEffect, useCallback, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useTheme,
  AppBar,
  Toolbar,
  Tab,
  Box,
  Paper,
  TextField,
  Autocomplete,
  Stack,
  Grid,
  Divider,
  useMediaQuery,
} from "@mui/material";
import Image from "mui-image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainNavigation = () => {
  const [collegeNames, setCollegeNames] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const location = useLocation();
  const theme = useTheme();

  const navigate = useNavigate();

  const fetchCollegeNamesHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/colleges/getListOfAllCollegeNames`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setCollegeNames(data);
      setError(false);
    } catch (error) {
      setError(true);
    }
  }, []);

  const isValid = (name: string | undefined) => {
    if (!name) {
      return false;
    }
    return collegeNames.includes(name);
  };

  const collegeNameRef = useRef<HTMLInputElement | null>(null);

  const submitHandlerSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedCollegeName = collegeNameRef.current?.value;

    if (isValid(selectedCollegeName)) {
      navigate(`/colleges/${selectedCollegeName}`);
    } else {
      toast.error("Enter a valid college name! (see dropdown)", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    fetchCollegeNamesHandler();
  }, [fetchCollegeNamesHandler]);

  const primaryColor = theme.palette.primary.main;

  const isActiveTab = (path: string) => {
    return location.pathname === path;
  };

  // Use useMediaQuery hook to determine the screen size
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Conditional rendering of the navbar based on the screen size
  if (isSmallScreen) {
    // Render the placeholder comment for small screen
    return (
      <>
        {/* Placeholder for small screen navbar */}
        {/* Add your small screen navbar content here */}
        {/* Placeholder comment */}
        {/* Add your small screen navbar content here */}
        {/* Placeholder comment */}
      </>
    );
  } else {
    // Render the original navbar for larger screens
    return (
      <>
        {/* Original navbar for larger screens */}
        <AppBar sx={{ background: primaryColor }}>
          <Grid container alignItems="center" columns={24}>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <Link to="/">
                <Image
                  src="/src/images/blockstart1_cropped.png"
                  duration={0}
                  fit="cover"
                />
              </Link>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={12}>
              <Paper
                elevation={1}
                component="form"
                onSubmit={submitHandlerSearch}
              >
                <Autocomplete
                  clearOnEscape
                  disablePortal
                  id="combo-box-demo"
                  options={collegeNames}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="collegeName"
                      label="Search for a College"
                      variant="filled"
                      inputRef={collegeNameRef} // Assign the ref to the input field
                    />
                  )}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Link to="/recruit">
                <Tab
                  label="Recruit"
                  sx={{
                    color: isActiveTab("/recruit")
                      ? "secondary.main"
                      : "info.main",
                  }}
                />
              </Link>
              <Link to="/contact">
                <Tab
                  label="Contact"
                  sx={{
                    color: isActiveTab("/contact")
                      ? "secondary.main"
                      : "info.main",
                  }}
                />
              </Link>
            </Grid>
          </Grid>
        </AppBar>
        <ToastContainer />
      </>
    );
  }
};

export default MainNavigation;
