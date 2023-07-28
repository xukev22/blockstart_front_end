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
import { UserInput } from "../pages/RecruitPage";
import SearchBothButton from "../ui/SearchBothButton";
import { CRITERIA_INVALID } from "../constants/recruit-page-error-messages";

interface Props {
  criteriaIsValid: () => boolean;
  marksIsValid: () => boolean;
  changeDivision: (division: string) => void;
  changeConference: (conference: string) => void;
  changeState: (state: string) => void;
  changePublicPrivate: (publicPrivate: string) => void;
  changeHbcuOrNot: (hbcuOrNot: string) => void;
  activeDivision: string;
  publicPrivate: string;
  hbcuOrNot: string;
  activeConference: string;
  activeState: string;
  siblingInfo: { activeGender: string; userInput: UserInput };
}

const Criteria = (props: Props) => {
  const theme = useTheme();

  const [collegeConferences, setCollegeConferences] = useState<string[]>([]);
  const [collegeStates, setCollegeStates] = useState<string[]>([]);
  const [error, setError] = useState(false);

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

  const clickHandlerCriteriaSearch = () => {
    if (props.criteriaIsValid()) {
      toast.success("data is valid", { position: toast.POSITION.BOTTOM_RIGHT });
    } else {
      toast.error(CRITERIA_INVALID, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
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
                color={props.activeDivision === "I" ? "secondary" : "inherit"}
                onClick={() => {
                  if (props.activeDivision === "I") {
                    props.changeDivision("");
                  } else {
                    props.changeDivision("I");
                  }
                }}
              >
                Division I
              </Button>
              <Button
                color={props.activeDivision === "II" ? "secondary" : "inherit"}
                onClick={() => {
                  if (props.activeDivision === "II") {
                    props.changeDivision("");
                  } else {
                    props.changeDivision("II");
                  }
                }}
              >
                Division II
              </Button>
              <Button
                color={props.activeDivision === "III" ? "secondary" : "inherit"}
                onClick={() => {
                  if (props.activeDivision === "III") {
                    props.changeDivision("");
                  } else {
                    props.changeDivision("III");
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
                  props.changeConference(value);
                } else {
                  props.changeConference("");
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
                  props.changeState(value);
                } else {
                  props.changeState("");
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
                color={
                  props.publicPrivate === "Public" ? "secondary" : "inherit"
                }
                onClick={() => {
                  if (props.publicPrivate === "Public") {
                    props.changePublicPrivate("");
                  } else {
                    props.changePublicPrivate("Public");
                  }
                }}
              >
                Public
              </Button>
              <Button
                color={
                  props.publicPrivate === "Private" ? "secondary" : "inherit"
                }
                onClick={() => {
                  if (props.publicPrivate === "Private") {
                    props.changePublicPrivate("");
                  } else {
                    props.changePublicPrivate("Private");
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
                color={props.hbcuOrNot === "Yes" ? "secondary" : "inherit"}
                onClick={() => {
                  if (props.hbcuOrNot === "Yes") {
                    props.changeHbcuOrNot("");
                  } else {
                    props.changeHbcuOrNot("Yes");
                  }
                }}
              >
                HBCU
              </Button>
              <Button
                color={props.hbcuOrNot === "No" ? "secondary" : "inherit"}
                onClick={() => {
                  if (props.hbcuOrNot === "No") {
                    props.changeHbcuOrNot("");
                  } else {
                    props.changeHbcuOrNot("No");
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
        <SearchBothButton
          criteriaIsValid={props.criteriaIsValid}
          marksIsValid={props.marksIsValid}
          activeGender={props.siblingInfo.activeGender}
          userInput={props.siblingInfo.userInput}
          activeConference={props.activeConference}
          activeDivision={props.activeDivision}
          activeState={props.activeState}
          publicPrivate={props.publicPrivate}
          hbcuOrNot={props.hbcuOrNot}
        />
      </Box>
    </Box>
  );
};

export default Criteria;
