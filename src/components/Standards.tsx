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
} from "@mui/material";
import theme from "../theme/theme";
import { StandardsSet } from "../model/CollegeProfileData";
import { EventType } from "../model/CollegeProfileData";
import { Mark } from "../model/CollegeProfileData";
//import { existingEventsMapAndTheirTargetStandard } from "../model/CollegeProfileData";

interface Props {
  tabValue: string;
  standardSet: StandardsSet | null;
}

function Standards({ tabValue, standardSet }: Props) {
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
  const setStandards = () => {
    if (tabValue == "two") {
      walkonStandard = standardSet?.femaleWalkOn;
      softStandard = standardSet?.femaleSoftRecruit;
      hardStandard = standardSet?.femaleHardRecruit;
    } else {
      walkonStandard = standardSet?.maleWalkOn;
      softStandard = standardSet?.maleSoftRecruit;
      hardStandard = standardSet?.maleHardRecruit;
    }
  };

  //TABLE START
  function createData(
    name: string,
    walkon: string | undefined,
    soft: string | undefined,
    hard: string | undefined
  ) {
    return { name, walkon, soft, hard };
  }
  const rows: {
    name: string;
    walkon: string | undefined;
    soft: string | undefined;
    hard: string | undefined;
  }[] = []; //assign differently

  const createRows = () => {
    let name: string;
    let walkonForEvent: string | undefined;
    let softForEvent: string | undefined;
    let hardForEvent: string | undefined;

    if (walkonStandard?.existingEventsMapAndTheirTargetStandard == null) {
    } else {
      //for each eventType in the walk on map
      for (const [eventType, mark] of Object.entries(
        walkonStandard.existingEventsMapAndTheirTargetStandard
      )) {
        //get name
        name = eventType;
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
          } else {
            walkonForEvent = mark.meters + "m";
          }
        } else {
          console.log(`Event: ${eventType}, Mark is missing or undefined`);
        }
        //get soft
        const softMap = softStandard?.existingEventsMapAndTheirTargetStandard;
        if (softMap !== null && softMap !== undefined) {
          if (name in softMap) {
            if (softMap[name as EventType]?.type == "time") {
              if (softMap[name as EventType]?.minute == 0) {
                //short event
                softForEvent =
                  softMap[name as EventType]?.second +
                  "." +
                  softMap[name as EventType]?.fracSecond;
              } else if ((softMap[name as EventType]?.second ?? 0) >= 10) {
                //double digit seconds
                softForEvent =
                  softMap[name as EventType]?.minute +
                  ":" +
                  softMap[name as EventType]?.second +
                  "." +
                  softMap[name as EventType]?.fracSecond;
              } else {
                //single digit seconds
                softForEvent =
                  softMap[name as EventType]?.minute +
                  ":" +
                  "0" +
                  softMap[name as EventType]?.second +
                  "." +
                  softMap[name as EventType]?.fracSecond;
              }
            } else {
              softForEvent = softMap[name as EventType]?.meters + "m";
            }
          }
        }
        //getHard
        const hardMap = hardStandard?.existingEventsMapAndTheirTargetStandard;

        if (hardMap !== null && hardMap !== undefined) {
          if (name in hardMap) {
            if (hardMap[name as EventType]?.type == "time") {
              if (hardMap[name as EventType]?.minute == 0) {
                //short event
                hardForEvent =
                  hardMap[name as EventType]?.second +
                  "." +
                  hardMap[name as EventType]?.fracSecond;
              } else if ((hardMap[name as EventType]?.second ?? 0) >= 10) {
                //double digit sec
                hardForEvent =
                  hardMap[name as EventType]?.minute +
                  ":" +
                  hardMap[name as EventType]?.second +
                  "." +
                  hardMap[name as EventType]?.fracSecond;
              } else {
                //single digit sec
                hardForEvent =
                  hardMap[name as EventType]?.minute +
                  ":" +
                  "0" +
                  hardMap[name as EventType]?.second +
                  "." +
                  hardMap[name as EventType]?.fracSecond;
              }
            } else {
              hardForEvent = hardMap[name as EventType]?.meters + "m";
            }
          }
        }

        //create data
        createData(name, walkonForEvent, softForEvent, hardForEvent);
        //add to array
        rows.push(createData(name, walkonForEvent, softForEvent, hardForEvent));
      }
    }
  };
  setStandards();
  createRows();
  //Table
  return (
    <Grid
      container
      paddingTop={"50px"}
      paddingBottom={"50px"}
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
                <TableCell align="right">{row.walkon}</TableCell>
                <TableCell align="right">{row.soft}</TableCell>
                <TableCell align="right">{row.hard}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default Standards;
