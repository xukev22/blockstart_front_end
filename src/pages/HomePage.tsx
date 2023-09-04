import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

import theme from "../theme/theme";
import { GlobalReference } from "../utils/global-reference";

const HomePage = () => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid
        container
        sx={{
          background: theme.palette.secondary.main,
          backgroundImage: "url(/images/haywardfield_smaller.png)",

          backgroundSize: "cover",
          height: "800px",
        }}
      >
        <Grid item xs={1} lg={2}></Grid>
        <Grid
          item
          xs={10}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: isSmallScreen ? "120px" : "220px",
          }}
        >
          <Typography
            color="white"
            style={{
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
            variant="h5"
          >
            Blockstart, the ultimate recruit finder
          </Typography>
          <Typography
            color="white"
            style={{
              fontWeight: "bold",
              paddingBottom: isSmallScreen ? "0px" : "30px",
            }}
            variant="h2"
          >
            Enter your marks. Find your school.
          </Typography>

          <Grid
            container //WHITE BOX CONTAINER
            sx={{
              backgroundColor: isSmallScreen ? "#" : "#f0f0f0", // Customize background color
              borderRadius: "16px", // Adjust the radius as needed
              height: isSmallScreen ? "100px" : "80px",
            }}
          >
            {!isSmallScreen && (
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: isSmallScreen ? "10px" : "0px",
                }}
              >
                <Typography variant={isLargeScreen ? "subtitle1" : "h5"}>
                  Take Your Talents To The Next Level
                </Typography>
              </Grid>
            )}
            <Grid
              item
              xs={6}
              sm={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size={isLargeScreen ? "medium" : "large"}
                sx={{ borderRadius: "10px" }}
                onClick={() => {
                  GlobalReference.navSearchBar.current?.focus();
                }}
              >
                Search College
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sm={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link to="/recruit">
                <Button
                  variant="contained"
                  color="secondary"
                  size={isLargeScreen ? "medium" : "large"}
                  sx={{ borderRadius: "10px" }}
                >
                  Recruit Finder
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} lg={2}></Grid>
      </Grid>
    </>
  );
};

export default HomePage;
