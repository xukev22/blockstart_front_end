//standards holds the table and will either be men or women standards
//props: tab value (determines men vs women), standardset
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import theme from "../theme/theme";
import { StandardsSet } from "../model/CollegeProfileData";
import { EventType } from "../model/CollegeProfileData";
import { Mark } from "../model/CollegeProfileData";
import CollapsibleRow from "./CollapsibleRow";
import {
  eventToReadableName,
  eventToEventGroup,
  eventToEventCategory,
} from "../utils/mappings";

interface Props {
  tabValue: string;
  standardSet: StandardsSet | null;
  sport: string;
}

export function createData(
  name: string,
  walkon: string | undefined,
  soft: string | undefined,
  hard: string | undefined
) {
  return { name, walkon, soft, hard };
}

function Standards({ tabValue, standardSet, sport }: Props) {
  let walkonStandard:
    | {
        existingEventsMapAndTheirTargetStandard: Partial<
          Record<EventType, Mark>
        > | null;
      }
    | undefined;
  let softStandard:
    | {
        existingEventsMapAndTheirTargetStandard: Partial<
          Record<EventType, Mark>
        > | null;
      }
    | undefined;
  let hardStandard:
    | {
        existingEventsMapAndTheirTargetStandard: Partial<
          Record<EventType, Mark>
        > | null;
      }
    | undefined;

  //sets standards based on tabValue
  const setStandards = () => {
    if (tabValue == "two") {
      //female standards
      walkonStandard = standardSet?.femaleWalkOn;
      softStandard = standardSet?.femaleSoftRecruit;
      hardStandard = standardSet?.femaleHardRecruit;
    } else {
      //male standards
      walkonStandard = standardSet?.maleWalkOn;
      softStandard = standardSet?.maleSoftRecruit;
      hardStandard = standardSet?.maleHardRecruit;
    }
  };

  const rows: {
    name: string;
    walkon: string | undefined;
    soft: string | undefined;
    hard: string | undefined;
  }[] = [];

  // the events that go under the short events dropdown
  const shortEventRows: {
    name: string;
    walkon: string | undefined;
    soft: string | undefined;
    hard: string | undefined;
  }[] = [];

  // the events that go under the long events dropdown
  const longEventRows: {
    name: string;
    walkon: string | undefined;
    soft: string | undefined;
    hard: string | undefined;
  }[] = [];

  // the events that go under the field events dropdown
  const fieldRows: {
    name: string;
    walkon: string | undefined;
    soft: string | undefined;
    hard: string | undefined;
  }[] = [];

  //creates all the rows of standards
  const createRows = () => {
    let name: string;
    let walkonForEvent: string | undefined;
    let softForEvent: string | undefined;
    let hardForEvent: string | undefined;

    let nameId: string;

    if (walkonStandard?.existingEventsMapAndTheirTargetStandard == null) {
    } else {
      //for each eventType in the walk on map
      for (const [eventType, mark] of Object.entries(
        walkonStandard.existingEventsMapAndTheirTargetStandard
      )) {
        console.log(sport);
        console.log(eventToEventGroup[eventType]);
        if (eventToEventGroup[eventType] == sport) {
          //get name
          nameId = eventType;
          name = eventToReadableName[eventType];
          //get walkon
          if (mark !== undefined) {
            console.log(`Event: ${eventType}, Mark: ${mark}`);

            if (mark.type == "time") {
              if (mark.minute == 0) {
                //short event
                walkonForEvent = mark.second + "." + mark.fracSecond;
              } else if (mark.second != undefined && mark.second >= 10) {
                //double digit seconds
                walkonForEvent =
                  mark.minute + ":" + mark.second + "." + mark.fracSecond;
              } else {
                //single digit seconds
                walkonForEvent =
                  mark.minute + ":" + "0" + mark.second + "." + mark.fracSecond;
              }
            } else if (mark.type == "distance") {
              walkonForEvent = mark.meters?.toFixed(2) + "m";
            } else {
              walkonForEvent = "No Data";
            }
          } else {
            console.log(`Event: ${eventType}, Mark is missing or undefined`);
          }
          //get soft
          const softMap = softStandard?.existingEventsMapAndTheirTargetStandard;
          if (softMap !== null && softMap !== undefined) {
            if (nameId in softMap) {
              if (softMap[nameId as EventType]?.type == "time") {
                if (softMap[nameId as EventType]?.minute == 0) {
                  //short event
                  softForEvent =
                    softMap[nameId as EventType]?.second +
                    "." +
                    softMap[nameId as EventType]?.fracSecond;
                } else if ((softMap[nameId as EventType]?.second ?? 0) >= 10) {
                  //double digit seconds
                  softForEvent =
                    softMap[nameId as EventType]?.minute +
                    ":" +
                    softMap[nameId as EventType]?.second +
                    "." +
                    softMap[nameId as EventType]?.fracSecond;
                } else {
                  //single digit seconds
                  softForEvent =
                    softMap[nameId as EventType]?.minute +
                    ":" +
                    "0" +
                    softMap[nameId as EventType]?.second +
                    "." +
                    softMap[nameId as EventType]?.fracSecond;
                }
              } else if (softMap[nameId as EventType]?.type == "distance") {
                softForEvent =
                  softMap[nameId as EventType]?.meters.toFixed(2) + "m";
              } else {
                softForEvent = "No Data";
              }
            }
          }
          //getHard
          const hardMap = hardStandard?.existingEventsMapAndTheirTargetStandard;

          if (hardMap !== null && hardMap !== undefined) {
            if (nameId in hardMap) {
              if (hardMap[nameId as EventType]?.type == "time") {
                if (hardMap[nameId as EventType]?.minute == 0) {
                  //short event
                  hardForEvent =
                    hardMap[nameId as EventType]?.second +
                    "." +
                    hardMap[nameId as EventType]?.fracSecond;
                } else if ((hardMap[nameId as EventType]?.second ?? 0) >= 10) {
                  //double digit sec
                  hardForEvent =
                    hardMap[nameId as EventType]?.minute +
                    ":" +
                    hardMap[nameId as EventType]?.second +
                    "." +
                    hardMap[nameId as EventType]?.fracSecond;
                } else {
                  //single digit sec
                  hardForEvent =
                    hardMap[nameId as EventType]?.minute +
                    ":" +
                    "0" +
                    hardMap[nameId as EventType]?.second +
                    "." +
                    hardMap[nameId as EventType]?.fracSecond;
                }
              } else if (hardMap[nameId as EventType]?.type == "distance") {
                hardForEvent =
                  hardMap[nameId as EventType]?.meters.toFixed(2) + "m";
              } else {
                hardForEvent = "No Data";
              }
            }
          }

          //create data
          createData(name, walkonForEvent, softForEvent, hardForEvent);
          //add to array
          if (eventToEventCategory[eventType] == "Short") {
            shortEventRows.push(
              createData(name, walkonForEvent, softForEvent, hardForEvent)
            );
          } else if (eventToEventCategory[eventType] == "Long") {
            longEventRows.push(
              createData(name, walkonForEvent, softForEvent, hardForEvent)
            );
          } else if (eventToEventCategory[eventType] == "Field") {
            fieldRows.push(
              createData(name, walkonForEvent, softForEvent, hardForEvent)
            );
          } else {
            rows.push(
              createData(name, walkonForEvent, softForEvent, hardForEvent)
            );
          }
        }
      }
    }
    shortEventRows.sort((a, b) => a.name.localeCompare(b.name));
    longEventRows.sort((a, b) => a.name.localeCompare(b.name));
    fieldRows.sort((a, b) => a.name.localeCompare(b.name));
    rows.sort((a, b) => a.name.localeCompare(b.name));
  };
  const switchSports = () => {
    if (sport == "XC") {
      return (
        <>
          <TableHead>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell component="th" scope="row">
                <Typography variant="h6">Cross Country</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell align="center">Walk-on</TableCell>
              <TableCell align="center">Soft Recruit</TableCell>
              <TableCell align="center">Hard Recruit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.walkon}</TableCell>
                <TableCell align="center">{row.soft}</TableCell>
                <TableCell align="center">{row.hard}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      );
    } else
      return (
        <TableBody>
          <CollapsibleRow
            name="Short Events"
            eventRows={shortEventRows}
          ></CollapsibleRow>
          <CollapsibleRow
            name="Long Events"
            eventRows={longEventRows}
          ></CollapsibleRow>
          <CollapsibleRow
            name="Field Events"
            eventRows={fieldRows}
          ></CollapsibleRow>
        </TableBody>
      );
  };
  setStandards();
  createRows();
  const switchSport = switchSports();

  //Table
  return (
    <Grid
      container
      paddingTop={"50px"}
      paddingBottom={"100px"}
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Grid item xs={0} sm={1} lg={2}></Grid>
      <Grid item xs={12} sm={10} lg={8}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 10 }} aria-label="simple table">
            {switchSport}
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={0} sm={1} lg={2}></Grid>
    </Grid>
  );
}

export default Standards;
