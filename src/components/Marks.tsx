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
import "react-toastify/dist/ReactToastify.css";

const isMulti = (eventName: string) => {
  return ["Pentathalon", "Heptathalon", "Decathalon"].includes(eventName);
};

import { UserInput } from "../pages/RecruitPage";
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
  siblingInfo: {
    activeDivision: string;
    activeConference: string;
    activeState: string;
    publicPrivate: string;
    hbcuOrNot: string;
  };
}

import { useState } from "react";
import SearchBothButton from "../ui/SearchBothButton";
import { MARKS_INVALID } from "../constants/recruit-page-error-messages";

const Marks = (props: Props) => {
  const theme = useTheme();

  const clickHandlerMarksSearch = () => {
    if (props.marksIsValid()) {
      toast.success("data is valid", { position: toast.POSITION.BOTTOM_LEFT });
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
        {Object.entries(props.userInput).map(([eventName, value]) => (
          <p key={eventName}>
            Event: {eventName}, Value: {value}
          </p>
        ))}
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
              color={props.activeGender === "Male" ? "secondary" : "inherit"}
              onClick={() => {
                props.changeGender("Male");
              }}
            >
              Male
            </Button>
            <Button
              color={props.activeGender === "Female" ? "secondary" : "inherit"}
              onClick={() => {
                props.changeGender("Female");
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
          <Button variant="contained" color="error">
            Clear Fields
          </Button>
          <SearchBothButton
            criteriaIsValid={props.criteriaIsValid}
            marksIsValid={props.marksIsValid}
            userInput={props.userInput}
            activeGender={props.activeGender}
            activeConference={props.siblingInfo.activeConference}
            activeDivision={props.siblingInfo.activeDivision}
            activeState={props.siblingInfo.activeState}
            hbcuOrNot={props.siblingInfo.hbcuOrNot}
            publicPrivate={props.siblingInfo.publicPrivate}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Marks;
