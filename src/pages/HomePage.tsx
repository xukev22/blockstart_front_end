import { Grid, Typography, Button, Box, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

import Image from "mui-image";
import theme from "../theme/theme";

const HomePage = () => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid
        container
        sx={{
          backgroundImage: "url(/src/images/home_sample.jpg)",
          background: theme.palette.secondary.main,
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
              paddingBottom: "30px",
            }}
            variant="h2"
          >
            Enter your marks. Find your school.
          </Typography>

          <Grid
            container //WHITE BOX CONTAINER
            sx={{
              backgroundColor: "#f0f0f0", // Customize background color
              borderRadius: "16px", // Adjust the radius as needed
              height: isSmallScreen ? "100px" : "80px",
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant={isLargeScreen ? "body1" : "h5"}>
                Take Your Talents To The Next Level
              </Typography>
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
              <Button
                variant="contained"
                color="secondary"
                size={isLargeScreen ? "medium" : "large"}
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
