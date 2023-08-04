import { Typography, Grid, Box, Avatar, IconButton, Link } from "@mui/material";
import theme from "../theme/theme";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
const ContactPage = () => {
  return (
    <div>
      <Grid
        container
        paddingTop={"100px"}
        paddingBottom={"50px"}
        sx={{
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Grid item xs={1} lg={1}></Grid>
        <Grid
          item
          xs={10}
          sx={{
            boxShadow: 5,
            paddingTop: "100px",
            paddingBottom: "80px",
          }}
          style={{ display: "flex" }}
        >
          <Grid container paddingBottom={10}>
            <Grid item xs={2}></Grid>
            <Grid item>
              <Avatar
                alt="Kevin Xu"
                src="/src/images/kevprofilepic.jpeg"
                sx={{ width: 180, height: 180 }}
              />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
              <Typography color="black">
                <h1 style={{ marginBottom: "3px" }}>Kevin Xu</h1>
              </Typography>
              <Typography color="black" style={{ marginBottom: "6px" }}>
                Northeastern Track & Field
              </Typography>
              <Grid item style={{ display: "flex" }}>
                <EmailIcon></EmailIcon>
                <Grid item xs={0.1}></Grid>
                <Typography style={{ marginBottom: "12px" }} color="black">
                  xu.kev@northeastern.edu
                </Typography>
              </Grid>
              <Grid container>
                <IconButton
                  component={Link}
                  href={`https://instagram.com/joshkung_`}
                >
                  <InstagramIcon fontSize="large" color="error" />
                </IconButton>
                <Grid item xs={1}></Grid>
                <IconButton
                  component={Link}
                  href={`https://instagram.com/joshkung_`}
                >
                  <LinkedInIcon
                    fontSize="large"
                    color="secondary"
                  ></LinkedInIcon>
                </IconButton>
                <Grid item xs={1}></Grid>
                <IconButton
                  component={Link}
                  href={`https://instagram.com/joshkung_`}
                >
                  <TwitterIcon fontSize="large"></TwitterIcon>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item>
              <Avatar
                alt="Joshua Kung"
                src="/src/images/joshprofilepic.png"
                sx={{ width: 180, height: 180 }}
              />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
              <Typography color="black">
                <h1 style={{ marginBottom: "3px" }}>Josh Kung</h1>
              </Typography>
              <Typography color="black" style={{ marginBottom: "6px" }}>
                Northeastern Track & Field
              </Typography>
              <Grid item style={{ display: "flex" }}>
                <EmailIcon></EmailIcon>
                <Grid item xs={0.1}></Grid>
                <Typography style={{ marginBottom: "15px" }} color="black">
                  kung.jo@northeastern.edu
                </Typography>
              </Grid>
              <Grid container>
                <IconButton
                  component={Link}
                  href={`https://instagram.com/joshkung_`}
                >
                  <InstagramIcon fontSize="large" color="error" />
                </IconButton>
                <Grid item xs={1}></Grid>
                <IconButton
                  component={Link}
                  href={`https://instagram.com/joshkung_`}
                >
                  <LinkedInIcon
                    fontSize="large"
                    color="secondary"
                  ></LinkedInIcon>
                </IconButton>
                <Grid item xs={1}></Grid>
                <IconButton
                  component={Link}
                  href={`https://instagram.com/joshkung_`}
                >
                  <TwitterIcon fontSize="large"></TwitterIcon>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} lg={1}></Grid>
      </Grid>
      <Grid
        container
        paddingBottom={"500px"}
        sx={{
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Grid item xs={1} lg={1}></Grid>
        <Grid
          item
          xs={10}
          sx={{
            boxShadow: 5,
            paddingTop: "50px",
            paddingBottom: "80px",
          }}
          style={{ display: "flex" }}
        >
          <Grid item xs={1}></Grid>{" "}
          <Grid item xs={10}>
            <h1>What is Blockstart?</h1>
            <span>
              Being two walkons to the Northeastern track team, we understand
              how difficult the college search can be for student athletes.
              Blockstart is the ultimate college search tool for track athletes
              looking to take their talents to the next level. Athletes can
              enter their event PRs and other preferences into our Recruit
              Finder and receive a list of schools that match their talents and
              interests. Recruiting standards are based on real, up to date meet
              records, seperated into three categories: Walkon, Soft recruit,
              and Hard recruit.
            </span>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactPage;
