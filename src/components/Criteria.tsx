import {
  Box,
  Typography,
  Autocomplete,
  Grid,
  Button,
  Stack,
  Divider,
  TextField,
  useTheme,
  ButtonGroup,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useCallback, useEffect } from "react";

const Criteria = () => {
  const theme = useTheme();

  const [collegeConferences, setCollegeConferences] = useState<string[]>([]);
  const [collegeStates, setCollegeStates] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const [activeDivision, setActiveDivision] = useState("");
  const [publicPrivate, setPublicPrivate] = useState("");
  const [hbcuOrNot, setHbcuOrNot] = useState("");
  const [activeConference, setActiveConference] = useState("");
  const [activeState, setActiveState] = useState("");

  const blue = theme.palette.secondary.main;

  const fetchCollegeConferencesHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/colleges/getListOfAllConferences`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setCollegeConferences(data);
      setError(false);
    } catch (error) {
      setError(true);
    }
  }, []);

  const fetchCollegeStatesHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/colleges/getListOfAllStates`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setCollegeStates(data);
      setError(false);
    } catch (error) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchCollegeConferencesHandler();
    fetchCollegeStatesHandler();
  }, [fetchCollegeConferencesHandler, fetchCollegeStatesHandler]);

  const criteriaIsValid = () => {
    return !(
      activeDivision === "" &&
      activeConference === "" &&
      activeState === "" &&
      publicPrivate === "" &&
      hbcuOrNot === ""
    );
  };

  const clickHandlerCriteriaSearch = () => {
    if (criteriaIsValid()) {
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
  {
    /* <Button onClick={fetchHardCoded} variant="contained">
        Fetch hard coded data
      </Button> */
  }
  return (
    <Box sx={{ padding: "1rem" }}>
      {/* Top Label */}
      <Typography
        variant="h4"
        sx={{
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          borderBottom: `3px solid ${blue}`,
          padding: "10px",
          textAlign: "center", // Center the text horizontally,
          backgroundColor: "white", // Set the background color to white
        }}
      >
        Filter By Criteria
      </Typography>

      <Box
        sx={{
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <ButtonGroup variant="outlined">
              <Button
                color={activeDivision === "I" ? "secondary" : "inherit"}
                onClick={() => {
                  if (activeDivision === "I") {
                    setActiveDivision("");
                  } else {
                    setActiveDivision("I");
                  }
                }}
              >
                Division I
              </Button>
              <Button
                color={activeDivision === "II" ? "secondary" : "inherit"}
                onClick={() => {
                  if (activeDivision === "II") {
                    setActiveDivision("");
                  } else {
                    setActiveDivision("II");
                  }
                }}
              >
                Division II
              </Button>
              <Button
                color={activeDivision === "III" ? "secondary" : "inherit"}
                onClick={() => {
                  if (activeDivision === "III") {
                    setActiveDivision("");
                  } else {
                    setActiveDivision("III");
                  }
                }}
              >
                Division III
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              onChange={(evt, value) => {
                if (value) {
                  setActiveConference(value);
                } else {
                  setActiveConference("");
                }
              }}
              clearOnEscape
              disablePortal
              options={collegeConferences}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="collegeConference"
                  label="Select a conference"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              onChange={(evt, value) => {
                if (value) {
                  setActiveState(value);
                } else {
                  setActiveState("");
                }
              }}
              clearOnEscape
              disablePortal
              options={collegeStates}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="collegeState"
                  label="Select a state/region"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs>
            <ButtonGroup variant="outlined">
              <Button
                color={publicPrivate === "Public" ? "secondary" : "inherit"}
                onClick={() => {
                  if (publicPrivate === "Public") {
                    setPublicPrivate("");
                  } else {
                    setPublicPrivate("Public");
                  }
                }}
              >
                Public
              </Button>
              <Button
                color={publicPrivate === "Private" ? "secondary" : "inherit"}
                onClick={() => {
                  if (publicPrivate === "Private") {
                    setPublicPrivate("");
                  } else {
                    setPublicPrivate("Private");
                  }
                }}
              >
                Private
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs>
            <ButtonGroup variant="outlined">
              <Button
                color={hbcuOrNot === "Yes" ? "secondary" : "inherit"}
                onClick={() => {
                  if (hbcuOrNot === "Yes") {
                    setHbcuOrNot("");
                  } else {
                    setHbcuOrNot("Yes");
                  }
                }}
              >
                HBCU
              </Button>
              <Button
                color={hbcuOrNot === "No" ? "secondary" : "inherit"}
                onClick={() => {
                  if (hbcuOrNot === "No") {
                    setHbcuOrNot("");
                  } else {
                    setHbcuOrNot("No");
                  }
                }}
              >
                Not HBCU
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
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
          onClick={clickHandlerCriteriaSearch}
        >
          Search
        </Button>
        <Button variant="contained" color="error">
          Clear Criteria
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={clickHandlerBothSearch}
        >
          Search Both
        </Button>
      </Box>
    </Box>
  );
};

export default Criteria;
