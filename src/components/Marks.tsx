import {
  Accordion,
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
  Stack,
  TextField,
  useTheme,
  ButtonGroup,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Import the ExpandMoreIcon
import { toast } from "react-toastify";
import { CollegeProfileDataWrapper } from "../model/CollegeProfileData";
import "react-toastify/dist/ReactToastify.css";

const isMulti = (eventName: string) => {
  return ["Pentathalon", "Heptathalon", "Decathalon"].includes(eventName);
};

import { ResultStatus, UserInput, Result } from "../pages/RecruitPage";
interface Props {
  criteriaIsValid: () => boolean;
  marksIsValid: () => boolean;
  changeGender: (gender: string) => void;
  activeGender: string;
  userInput: UserInput;
  changeUserInput: (eventName: string, value: string) => void;
  eventNamesTrackShort: string[];
  eventNamesTrackLong: string[];
  eventNamesField: string[];
  eventNamesXC: string[];
  changeResults: (results: Result[]) => void;
  changeResultStatus: (status: ResultStatus) => void;
  siblingInfo: {
    activeDivision: string;
    activeConference: string;
    activeState: string;
    publicPrivate: string;
    hbcuOrNot: string;
  };
}

import SearchBothButton from "../ui/SearchBothButton";
import { MARKS_INVALID } from "../constants/recruit-page-error-messages";
import {
  Gender,
  tagsToString,
  textFieldToEventTypeName,
} from "../utils/mappings";

export interface FilterDTO {
  gender?: string;
  userInput?: UserInput;
  division?: string;
  conference?: string;
  state?: string;
  publicOrPrivate?: string;
  hbcuOrNot?: string;
}

const Marks = (props: Props) => {
  const theme = useTheme();

  const clearMarksFields = () => {
    props.changeGender("");
    props.changeUserInput("RESET", "RESET");

    // reset all the dynamically rendered text fields
  };

  const clickHandlerMarksSearch = async () => {
    if (props.marksIsValid()) {
      toast.success("data is valid", { position: toast.POSITION.BOTTOM_LEFT });

      props.changeResultStatus(ResultStatus.LOADING);

      let filterDTO: FilterDTO = { gender: props.activeGender, userInput: {} };
      // Iterate through the userInput object and map events to their corresponding event names.
      for (const [textFieldName, value] of Object.entries(props.userInput)) {
        const eventName = textFieldToEventTypeName(
          textFieldName,
          props.activeGender as Gender
        );
        if (props.eventNamesField.includes(textFieldName)) {
          let convertedValue = value?.trim();
          if (value?.includes("pts")) {
            convertedValue = value.replace("pts", "");
          } else if (value?.includes("points")) {
            convertedValue = value.replace("points", "");
          } else {
            convertedValue = value + "m";
          }
          if (filterDTO.userInput) {
            filterDTO.userInput[eventName] = convertedValue;
          } else {
            throw new Error("filterDTO.userInput is null");
          }
        } else {
          if (filterDTO.userInput) {
            filterDTO.userInput[eventName] = value;
          } else {
            throw new Error("filterDTO.userInput is null");
          }
        }
      }

      try {
        const response = await fetch(
          "http://localhost:8080/colleges/getMatchingColleges",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(filterDTO),
          }
        );

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();
        const cpData = data as CollegeProfileDataWrapper[];

        const results: Result[] = cpData.map((cp) => {
          return {
            college: cp.collegeProfile.essentials.name,
            tags: !cp.tags ? "None" : tagsToString(cp.tags),
            state: cp.collegeProfile.essentials.state,
            division: cp.collegeProfile.essentials.division,
          };
        });
        props.changeResults(results);
        props.changeResultStatus(ResultStatus.SUCCESS);
      } catch (error) {
        props.changeResultStatus(ResultStatus.ERROR);
        // Handle any errors
        console.error(error);
      }
    } else {
      toast.error(MARKS_INVALID, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      {/* Top Label */}
      <Typography
        variant="h4"
        sx={{
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          borderBottom: `3px solid ${theme.palette.secondary.main}`,
          padding: "10px",
          textAlign: "center", // Center the text horizontally,
          backgroundColor: "white", // Set the background color to white
        }}
      >
        Filter By Your Marks
        {/* {Object.entries(props.userInput).map(([eventName, value]) => (
          <p key={eventName}>
            Event: {eventName}, Value: {value}
          </p>
        ))} */}
      </Typography>
      <Stack direction="column">
        <Box
          sx={{
            padding: "1rem",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <ButtonGroup variant="outlined">
            <Button
              color={props.activeGender === "MALE" ? "secondary" : "inherit"}
              onClick={() => {
                props.changeGender("MALE");
              }}
            >
              Male
            </Button>
            <Button
              color={props.activeGender === "FEMALE" ? "secondary" : "inherit"}
              onClick={() => {
                props.changeGender("FEMALE");
              }}
            >
              Female
            </Button>
          </ButtonGroup>
        </Box>

        <Box sx={{ backgroundColor: "white" }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Track Events (600m and below)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: "center" }}>
                    <TextField
                      disabled
                      label="xx:xx.xx"
                      color="secondary"
                      variant="outlined"
                      focused
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">s</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>

                {props.eventNamesTrackShort.map((eventName) => (
                  <Grid key={eventName} item xs={6}>
                    <Box sx={{ textAlign: "center" }}>
                      <TextField
                        value={
                          props.userInput && props.userInput[eventName]
                            ? props.userInput[eventName]
                            : ""
                        }
                        id={eventName.replace(/\s+/g, "_")} // Replacing spaces with underscores
                        label={eventName}
                        variant="filled"
                        color="secondary"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">s</InputAdornment>
                          ),
                        }}
                        onChange={(evt) =>
                          props.changeUserInput(eventName, evt.target.value)
                        }
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Track Events (800m and up)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: "center" }}>
                    <TextField
                      disabled
                      label="xx:xx.xx"
                      color="secondary"
                      variant="outlined"
                      focused
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">s</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
                {props.eventNamesTrackLong.map((eventName) => (
                  <Grid key={eventName} item xs={6}>
                    <Box sx={{ textAlign: "center" }}>
                      <TextField
                        value={
                          props.userInput && props.userInput[eventName]
                            ? props.userInput[eventName]
                            : ""
                        }
                        id={eventName.replace(/\s+/g, "_")} // Replacing spaces with underscores
                        label={eventName}
                        variant="filled"
                        color="secondary"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">s</InputAdornment>
                          ),
                        }}
                        onChange={(evt) =>
                          props.changeUserInput(eventName, evt.target.value)
                        }
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Field Events + Multi</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: "center" }}>
                    <TextField
                      disabled
                      label="4.25"
                      color="secondary"
                      variant="outlined"
                      focused
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">m</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: "center" }}>
                    <TextField
                      disabled
                      label="5680"
                      color="secondary"
                      variant="outlined"
                      focused
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">pts</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
                {props.eventNamesField.map((eventName) => (
                  <Grid key={eventName} item xs={6}>
                    <Box sx={{ textAlign: "center" }}>
                      <TextField
                        value={
                          props.userInput && props.userInput[eventName]
                            ? props.userInput[eventName]
                            : ""
                        }
                        id={eventName.replace(/\s+/g, "_")} // Replacing spaces with underscores
                        label={eventName}
                        variant="filled"
                        color="secondary"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {isMulti(eventName) ? "pts" : "m"}
                            </InputAdornment>
                          ),
                        }}
                        onChange={(evt) =>
                          props.changeUserInput(eventName, evt.target.value)
                        }
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>XC Events</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: "center" }}>
                    <TextField
                      disabled
                      label="xx:xx.xx"
                      color="secondary"
                      variant="outlined"
                      focused
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">s</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
                {props.eventNamesXC.map((eventName) => (
                  <Grid key={eventName} item xs={6}>
                    <Box sx={{ textAlign: "center" }}>
                      <TextField
                        value={
                          props.userInput && props.userInput[eventName]
                            ? props.userInput[eventName]
                            : ""
                        }
                        id={eventName.replace(/\s+/g, "_")} // Replacing spaces with underscores
                        label={eventName}
                        variant="filled"
                        color="secondary"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">s</InputAdornment>
                          ),
                        }}
                        onChange={(evt) =>
                          props.changeUserInput(eventName, evt.target.value)
                        }
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box
          sx={{
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
            padding: "10px",
            backgroundColor: "white", // Set the background color to white
            display: "flex",
            justifyContent: "center",
            gap: `${2}rem`,
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={clickHandlerMarksSearch}
          >
            Search
          </Button>
          <Button variant="contained" color="error" onClick={clearMarksFields}>
            Clear Fields
          </Button>
          <SearchBothButton
            eventNamesField={props.eventNamesField}
            criteriaIsValid={props.criteriaIsValid}
            marksIsValid={props.marksIsValid}
            userInput={props.userInput}
            activeGender={props.activeGender}
            activeConference={props.siblingInfo.activeConference}
            activeDivision={props.siblingInfo.activeDivision}
            activeState={props.siblingInfo.activeState}
            hbcuOrNot={props.siblingInfo.hbcuOrNot}
            publicPrivate={props.siblingInfo.publicPrivate}
            changeResults={(results: Result[]) => props.changeResults(results)}
            changeResultStatus={(status: ResultStatus) =>
              props.changeResultStatus(status)
            }
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Marks;
