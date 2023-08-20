import { useLoaderData, LoaderFunction } from "react-router-dom";
import {
  Button,
  Grid,
  Tabs,
  Tab,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as ReactIcons from "@mui/icons-material";
import { useState } from "react";
import CollegeProfileData from "../model/CollegeProfileData";
import * as React from "react";
import Standards from "./Standards";
//import Image from "mui-image";
import theme from "../theme/theme";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MoreInfo from "./MoreInfo";
import { domain } from "../constants/data-api";
//import { useMediaQuery } from "react-responsive";

const CollegeProfile = () => {
  // const params = useParams();
  const data = useLoaderData();
  const dataCast: CollegeProfileData = data as CollegeProfileData;
  // console.log(dataCast);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //College Profile Tabs HANDLER
  const [selectedTab, setSelectedTab] = useState("one");
  const handleTabChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    console.log(event);
    setSelectedTab(newValue);
  };

  // select dropdown HANDLER
  const [sport, setSport] = React.useState("Track");
  //handles change from Track to XC
  const handleChange = (event: SelectChangeEvent) => {
    setSport(event.target.value);
  };

  //switch between standards and more info component
  const switchComponents = () => {
    if (selectedTab == "one" || selectedTab == "two") {
      return (
        <div>
          <Grid
            container
            sx={{
              backgroundColor: theme.palette.primary.main,
              paddingTop: "20px",
            }}
          >
            <Grid item xs={9}></Grid>
            <Grid item>
              <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                <InputLabel id="demo-select-small-label">Sport</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={sport}
                  label="Sport"
                  onChange={handleChange}
                >
                  <MenuItem value={"Track"}>Track & Field</MenuItem>
                  <MenuItem value={"XC"}>Cross Country</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Standards
            tabValue={selectedTab}
            standardSet={dataCast.standardsSet}
            sport={sport}
          />
        </div>
      );
    } else {
      return (
        <div>
          <MoreInfo
            schoolEssentials={dataCast.essentials}
            schoolEssentialsBonus={dataCast.eb}
          ></MoreInfo>
        </div>
      );
    }
  };
  const tabComponent = switchComponents();
  //RETURN COLLEGE PROFILE PAGE
  return (
    <div className="CollegeProfile">
      <Grid
        container
        paddingTop={"10px"}
        paddingBottom={"25px"}
        sx={{
          backgroundColor: dataCast.eb?.hexColor,
          width: "100%",
        }}
      >
        <Grid item xs={2} sm={1}></Grid>

        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "self-start",
          }}
          xs={10}
          sm={3}
        >
          <Typography
            color="white"
            style={{
              fontWeight: "bold",
              paddingTop: "35px",
              paddingBottom: "5px",
            }}
            variant="h4"
          >
            {dataCast.essentials.name}
          </Typography>

          <Typography color="white">
            {dataCast.eb?.town}, {dataCast.essentials.state}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={1}></Grid>

        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: isSmallScreen ? "start" : "center",
            paddingBottom: isSmallScreen ? "20px" : "0px",
          }}
          xs={10}
          sm={2}
        >
          <Typography
            color="white"
            style={{
              fontWeight: "bold",
              paddingTop: "35px",
              paddingBottom: "5px",
            }}
            variant="h4"
          >
            Division {dataCast.essentials.division}
          </Typography>
          <Typography color="white">
            {dataCast.essentials.conference}
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: isSmallScreen ? "start" : "start",
          }}
          xs={10}
          sm={3}
        >
          <Link href={`https://${dataCast.essentials.mainWebsiteURL}`}>
            <Button
              startIcon={<ReactIcons.Link></ReactIcons.Link>}
              size="small"
            >
              {dataCast.essentials.mainWebsiteURL}
            </Button>
          </Link>
          <Link href={`https://${dataCast.essentials.athleticWebsiteURL}`}>
            <Button
              startIcon={<ReactIcons.Link></ReactIcons.Link>}
              size="small"
            >
              {dataCast.essentials.athleticWebsiteURL}
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection="column"
        sx={{ backgroundColor: theme.palette.primary.main }}
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
      </Grid>
      {tabComponent}
    </div>
  );
};

export default CollegeProfile;

export const loader: LoaderFunction = async ({ params }) => {
  const response = await fetch(
    `${domain}/colleges/getDetailsForCollegeByName?collegeName=${params.collegeName}`
  );
  if (!response.ok) {
    throw new Error("Getting college by name failed!");
  } else {
    const resData = await response.json();
    return resData;
  }
};
