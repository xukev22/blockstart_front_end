import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme, AppBar, Toolbar, Tab, Box, Button } from "@mui/material";
import Image from "mui-image";

const MainNavigation = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const location = useLocation();

  const isActiveTab = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar sx={{ background: primaryColor }} position="fixed">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            gap: "10px",
          }}
        >
          <Link to="/">
            <Image
              src="/src/images/hole.png"
              duration={0}
              fit="fill"
              height="3rem"
              width="3rem"
            />
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Tab
              label="Home"
              sx={{
                color: isActiveTab("/") ? "secondary.main" : "white",
              }}
            />
          </Link>
          <Link to="/recruit" style={{ textDecoration: "none" }}>
            <Tab
              label="Recruit"
              sx={{
                color: isActiveTab("/recruit") ? "secondary.main" : "white",
              }}
            />
          </Link>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <Tab
              label="Contact"
              sx={{
                color: isActiveTab("/contact") ? "secondary.main" : "white",
              }}
            />
          </Link>
        </Box>
        <Button sx={{ marginLeft: "auto" }} variant="contained">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
