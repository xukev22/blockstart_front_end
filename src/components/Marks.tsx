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

import { useState } from "react";

const eventNamesTrackShort: string[] = [
  "60m",
  "60m Hurdles",
  "100m",
  "110/100m Hurdles",
  "200m",
  "300m",
  "400m",
  "400m Hurdles",
  "600m",
];

const eventNamesTrackLong: string[] = [
  "800m",
  "1000m",
  "1500m",
  "1600m",
  "3000m",
  "3000m SC",
  "3200m",
  "5000m",
  "10000m",
];

const eventNamesField: string[] = [
  "Long Jump",
  "Triple Jump",
  "High Jump",
  "Pole Vault",
  "Shot Put",
  "Discus",
  "Javelin",
  "Hammer",
  "Weight Throw",
  "Pentathalon",
  "Heptathalon",
  "Decathalon",
];

const eventNamesXC: string[] = [
  "5k XC",
  "6k XC",
  "8k XC",
  "10k XC",
  "4 Mile XC",
  "7600m XC",
  "9500m XC",
];

const isMulti = (eventName: string) => {
  return ["Pentathalon", "Heptathalon", "Decathalon"].includes(eventName);
};

const Marks = () => {
  const [activeGender, setActiveGender] = useState("");

  const theme = useTheme();

  const marksIsValid = () => {
    if (activeGender === "") {
      return false;
    }

    // Validation function for individual text fields
    // Regular expressions for time and non-time formats
    const timeFormatRegex = /^([0-5]?\d:)?[0-5]?\d\.\d{1,2}$/;
    const nonTimeFormatRegex = /^\d+(?:\.\d{1,2})?(?:\s*m|pts|points)?$/i;

    // Function to validate individual mark
    const isMarkValid = (eventName: string, value: string): boolean => {
      if (
        eventNamesTrackShort.includes(eventName) ||
        eventNamesTrackLong.includes(eventName) ||
        eventNamesXC.includes(eventName)
      ) {
        return timeFormatRegex.test(value);
      } else {
        return nonTimeFormatRegex.test(value);
      }
    };

    // Check if at least one field has a valid mark
    const allEventNames = [
      ...eventNamesTrackShort,
      ...eventNamesTrackLong,
      ...eventNamesField,
      ...eventNamesXC,
    ];

    for (const eventName of allEventNames) {
      const textFieldValue =
        (
          document.getElementById(
            eventName.replace(/\s+/g, "_")
          ) as HTMLInputElement
        )?.value || "";
      if (textFieldValue.trim() === "") {
        continue;
      }
      if (!isMarkValid(eventName, textFieldValue)) {
        return false; // Found at least one valid mark
      }
    }

    return true; // No valid marks found
  };

  const clickHandlerMarksSearch = () => {
    if (marksIsValid()) {
      toast.success("data is valid", { position: toast.POSITION.BOTTOM_RIGHT });
    } else {
      toast.error("data is not valid", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const clickHandlerBothSearch = () => {
    toast.warning(
      "[HOVER ON ME] DISCLAIMER: This service is still in beta and thus we do not do conversions automatically yet! You must convert to your best guess of the college equivalent. This applies to many events, like hurdles (which are lower in high school vs. college), throwing events (weight), etc.",
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
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
              color={activeGender === "Male" ? "secondary" : "inherit"}
              onClick={() => {
                setActiveGender("Male");
              }}
            >
              Male
            </Button>
            <Button
              color={activeGender === "Female" ? "secondary" : "inherit"}
              onClick={() => {
                setActiveGender("Female");
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

                {eventNamesTrackShort.map((eventName) => (
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
                {eventNamesTrackLong.map((eventName) => (
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
                {eventNamesField.map((eventName) => (
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
                {eventNamesXC.map((eventName) => (
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
          <Button
            variant="contained"
            color="info"
            onClick={clickHandlerBothSearch}
          >
            Search Both
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Marks;
