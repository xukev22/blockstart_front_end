import { useParams, useLoaderData, LoaderFunction } from "react-router-dom";
import { Box, Button, ButtonGroup, Grid, Paper } from "@mui/material";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import theme from "../theme/theme";
import { makeStyles } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import * as ReactIcons from "@mui/icons-material";
import { Link } from "@mui/material";
import Image from "mui-image";
import { useState } from "react";
import CollegeProfileData from "../model/CollegeProfileData";
import { TabPanel } from "@mui/lab";
import { TabContext } from "@mui/lab";
import { TabList } from "@mui/lab";
const CollegeProfile = () => {
  const params = useParams();
  const data = useLoaderData();
  const dataCast: CollegeProfileData = data as CollegeProfileData;
  console.log(dataCast);
  //not all data will have standard set, some can be null

  //for tabs
  const [selectedTab, setSelectedTab] = useState("one");

  const handleTabChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setSelectedTab(value);
  };
  console.log(selectedTab);

  // const renderTabContent = () => {
  //   switch (selectedTab) {
  //     case "one":
  //       return <Box>LMAO1</Box>;
  //     case "two":
  //       return <Box>LMAO2</Box>;
  //     case "three":
  //       return <Box>LMAO3</Box>;
  //     default:
  //       return <Box>NAHH</Box>;
  //   }
  // };

  return (
    <div className="CollegeProfile">
      <Box>
        <Grid
          container
          sx={{
            backgroundColor: theme.palette.secondary.main,
            height: "150px",
            width: "100%",
          }}
        >
          <Grid item xs={1}></Grid>

          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "self-start",
            }}
            xs={3}
          >
            <h1 style={{ marginBottom: "5px" }}> {params.collegeName}</h1>
            <span> State: {dataCast.essentials.state}</span>
          </Grid>
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={4}
          >
            <h1 style={{ marginBottom: "5px" }}>
              Division {dataCast.essentials.division}
            </h1>
            <span>{dataCast.essentials.conference}</span>
          </Grid>
          <Grid item xs={1}></Grid>

          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "self-start",
            }}
            xs={3}
          >
            <Link href={`/${dataCast.essentials.mainWebsiteURL}`}>
              <Button
                startIcon={<ReactIcons.Link></ReactIcons.Link>}
                size="small"
              >
                {dataCast.essentials.mainWebsiteURL}
              </Button>
            </Link>
            <Button
              startIcon={<ReactIcons.Link></ReactIcons.Link>}
              size="small"
            >
              {dataCast.essentials.athleticWebsiteURL}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection="column"
      >
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: "ButtonHighlight" }}>
            <TabList
              textColor="secondary"
              indicatorColor="secondary"
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Men Standards" value="one" />
              <Tab label="Women Standards" value="two" />
              <Tab label="More Info" value="three" />
            </TabList>
          </Box>
          <TabPanel value="one">
            <Grid
              container
              sx={{
                backgroundColor: theme.palette.secondary.main,
                height: "150px",
                width: "200%",
              }}
            >
              ayy
            </Grid>
          </TabPanel>
          <TabPanel value="two">Item Two</TabPanel>
          <TabPanel value="three">Item Three</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default CollegeProfile;

export const loader: LoaderFunction = async ({ params }) => {
  const response = await fetch(
    `http://localhost:8080/colleges/getDetailsForCollegeByName?collegeName=${params.collegeName}`
  );
  if (!response.ok) {
    throw new Error("Getting college by name failed!");
  } else {
    const resData = await response.json();
    return resData;
  }
};
