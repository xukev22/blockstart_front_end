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
  Divider,
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

  return (
    <>
      <AppBar sx={{ background: primaryColor }} position="fixed">
        <Toolbar>
          <Link to="/">
            <Image
              src="/src/images/blockstart1_2.png"
              duration={0}
              fit="fill"
              height="4rem"
            />
          </Link>
          <Paper component="form" onSubmit={submitHandlerSearch} elevation={3}>
            <Autocomplete
              clearOnEscape
              disablePortal
              id="combo-box-demo"
              options={collegeNames}
              sx={{ width: "40rem" }}
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflowX: "auto",
              gap: "10px",
              marginLeft: "auto",
            }}
          >
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
        </Toolbar>
      </AppBar>
      <ToastContainer />
    </>
  );
};

export default MainNavigation;
