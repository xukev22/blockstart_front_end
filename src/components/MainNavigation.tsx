import React, { useEffect, useCallback, useState, useRef } from "react";
import { GlobalReference } from "../utils/global-reference";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useTheme,
  AppBar,
  Tab,
  Box,
  Paper,
  TextField,
  Drawer,
  Autocomplete,
  Grid,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Image from "mui-image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainNavigation = () => {
  const [collegeNames, setCollegeNames] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  console.log(error);

  const isValid = (name: string | undefined) => {
    if (!name) {
      return false;
    }
    return collegeNames.includes(name);
  };

  const collegeNameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    GlobalReference.navSearchBar = collegeNameRef;
  }, []);

  const submitHandlerSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedCollegeName = collegeNameRef.current?.value;

    const removeAmpersandSelectedCollegeName = selectedCollegeName?.replace(
      "&",
      "---and---"
    );

    if (isValid(selectedCollegeName)) {
      navigate(`/colleges/${removeAmpersandSelectedCollegeName}`);
    } else {
      toast.error("Enter a valid college name! (see dropdown)", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const clickHandlerSearch = () => {
    const selectedCollegeName = collegeNameRef.current?.value;

    const removeAmpersandSelectedCollegeName = selectedCollegeName?.replace(
      "&",
      "---and---"
    );

    if (isValid(selectedCollegeName)) {
      navigate(`/colleges/${removeAmpersandSelectedCollegeName}`);
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
        {/* Smaller width navbar for small screens */}
        <AppBar sx={{ background: primaryColor }}>
          <Grid columns={12} container>
            <Grid item xs={4}>
              <Link to="/">
                <Image
                  src="/images/blockstartLogoNew.png"
                  duration={0}
                  fit="cover"
                  style={{ height: 30 }}
                />
              </Link>
            </Grid>
            <Grid item xs={5}>
              {/* Modify the size of the search bar */}
              <Box sx={{ margin: "0.5rem" }}>
                <Paper
                  elevation={0}
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
                        variant="outlined"
                        inputRef={collegeNameRef} // Assign the ref to the input field
                      />
                    )}
                  />
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "1rem",
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ justifyContent: "center" }}
                  onClick={clickHandlerSearch}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "1rem",
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </AppBar>
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Link to="/recruit">
            <Tab
              label="Recruit"
              sx={{
                color: isActiveTab("/recruit") ? "secondary.main" : "info.main",
              }}
            />
          </Link>
          <Link to="/contact">
            <Tab
              label="Contact"
              sx={{
                color: isActiveTab("/contact") ? "secondary.main" : "info.main",
              }}
            />
          </Link>
        </Drawer>
      </>
    );
  } else {
    // Render the original navbar for larger screens
    return (
      <>
        {/* Original navbar for larger screens */}
        <AppBar sx={{ background: primaryColor }}>
          <Grid container alignItems="center" columns={24} spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <Link to="/">
                <Image
                  src="/images/blockstartLogoNew.png"
                  duration={0}
                  fit="cover"
                  style={{ height: 70, width: 190 }}
                />
              </Link>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={9}>
              {/* Modify the  size of the search bar */}
              <Box sx={{ margin: "0.5rem" }}>
                <Paper
                  elevation={0}
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
                        variant="outlined"
                        inputRef={collegeNameRef} // Assign the ref to the input field
                      />
                    )}
                  />
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={clickHandlerSearch}
              >
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
              </Box>
            </Grid>
          </Grid>
        </AppBar>
        <ToastContainer />
      </>
    );
  }
};

export default MainNavigation;
