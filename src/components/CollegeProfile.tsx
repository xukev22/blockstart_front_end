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
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import * as React from "react";
import Standards from "./Standards";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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
    newValue: any
  ) => {
    setSelectedTab(newValue);
  };
  console.log(selectedTab);

  //TABLE START
  function createData(
    name: string,
    walkon: number,
    soft: number,
    hard: number
  ) {
    return { name, walkon, soft, hard };
  }
  const rows = [createData("100m", 0, 0, 0)]; //assign differently
  const TabContainer1 = () => (
    <Grid
      container
      paddingTop={"50px"}
      paddingBottom={"25px"}
      paddingLeft={"200px"}
      paddingRight={"200px"}
      sx={{
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell align="right">Walk-on</TableCell>
              <TableCell align="right">Soft Recruit</TableCell>
              <TableCell align="right">Hard Recruit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {
                    dataCast.standardsSet?.maleWalkOn
                      .existingEventsMapAndTheirTargetStandard?.MALE_TRACK_100
                      ?.second
                  }
                  .
                  {
                    dataCast.standardsSet?.maleWalkOn
                      .existingEventsMapAndTheirTargetStandard?.MALE_TRACK_100
                      ?.fracSecond
                  }
                </TableCell>
                <TableCell align="right">{row.soft}</TableCell>
                <TableCell align="right">{row.hard}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );

  //OLD render
  const renderTabContent = () => {
    switch (selectedTab) {
      case "one":
        return <TabContainer1 />;
      default:
        return <TabContainer1 />;
    }
  };
  console.log(renderTabContent);
  console.log(dataCast.standardsSet);

  //RETURN COLLEGE PROFILE PAGE
  return (
    <div className="CollegeProfile">
      <Box>
        <Grid
          container
          paddingTop={"10px"}
          paddingBottom={"25px"}
          sx={{
            backgroundColor: dataCast.eb?.hexColor,
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
            <Typography color="white">
              <h1 style={{ marginBottom: "5px" }}>
                {dataCast.essentials.name}
              </h1>
              <span> State: {dataCast.essentials.state}</span>
            </Typography>
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
            <Typography color="white">
              <h1 style={{ marginBottom: "5px" }}>
                Division {dataCast.essentials.division}
              </h1>
            </Typography>
            <Typography color="white">
              <span>{dataCast.essentials.conference}</span>
            </Typography>
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
            <Link href={`https://${dataCast.essentials.mainWebsiteURL}`}>
              <Button
                startIcon={<ReactIcons.Link></ReactIcons.Link>}
                size="small"
              >
                {dataCast.essentials.mainWebsiteURL}
              </Button>
            </Link>
            <Link href={`https://${dataCast.essentials.mainWebsiteURL}`}>
              <Button
                startIcon={<ReactIcons.Link></ReactIcons.Link>}
                size="small"
              >
                {dataCast.essentials.athleticWebsiteURL}
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection="column"
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Men Standards" />
          <Tab value="two" label="Women Standards" />
          <Tab value="three" label="More Info" />
        </Tabs>
      </Box>
      {renderTabContent()}
      <Standards tabValue={selectedTab} standardSet={dataCast.standardsSet} />
    </div>
  );
};

export default CollegeProfile;

export const loader: LoaderFunction = async ({ params }) => {
  const response = await fetch(
    `http://localhost:8080/colleges/getDetailsForCollegeByName?collegeName=${params.collegeName}`
  );
  if (!response.ok) {
    throw new Error("Getting college by name faileda!");
  } else {
    const resData = await response.json();
    return resData;
  }
};
