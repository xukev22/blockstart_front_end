import {
  Box,
  Typography,
  Autocomplete,
  Grid,
  Button,
  TextField,
  useTheme,
  ButtonGroup,
  useMediaQuery,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useCallback, useEffect } from "react";
import { ResultStatus, UserInput, Result } from "../pages/RecruitPage";
import SearchBothButton from "../ui/SearchBothButton";
import { CRITERIA_INVALID } from "../constants/recruit-page-error-messages";
import { CollegeProfileDataWrapper } from "../model/CollegeProfileData";
import { convertFullNameToAbbreviation, convertState } from "../utils/mappings";
import { FilterDTO } from "./Marks";
import { domain } from "../constants/data-api";

interface Props {
  eventNamesField: string[];
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
  changeResults: (results: Result[]) => void;
  changeResultStatus: (status: ResultStatus) => void;
  siblingInfo: { activeGender: string; userInput: UserInput };
}

const Criteria = (props: Props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [collegeConferences, setCollegeConferences] = useState<string[]>([]);
  const [collegeStates, setCollegeStates] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const blue = theme.palette.secondary.main;

  const [conferenceKey, setConferenceKey] = useState(new Date().getTime());
  const [stateKey, setStateKey] = useState(new Date().getTime() + 10000);

  const fetchCollegeConferencesHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `${domain}/colleges/getListOfAllConferences`
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

  console.log(error);

  const fetchCollegeStatesHandler = useCallback(async () => {
    try {
      const response = await fetch(`${domain}/colleges/getListOfAllStates`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const convertedData = data.map((stateName: string) =>
        convertState(stateName)
      );
      setCollegeStates(convertedData);
      setError(false);
    } catch (error) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchCollegeConferencesHandler();
    fetchCollegeStatesHandler();
  }, [fetchCollegeConferencesHandler, fetchCollegeStatesHandler]);

  const clickHandlerCriteriaSearch = async () => {
    if (props.criteriaIsValid()) {
      toast.success("data is valid", { position: toast.POSITION.BOTTOM_RIGHT });

      props.changeResultStatus(ResultStatus.LOADING);

      let filterDTO: FilterDTO = {};
      if (props.activeDivision !== "") {
        filterDTO = { ...filterDTO, division: props.activeDivision };
      }
      if (props.activeConference !== "") {
        filterDTO = { ...filterDTO, conference: props.activeConference };
      }
      if (props.activeState !== "") {
        filterDTO = {
          ...filterDTO,
          state: convertFullNameToAbbreviation(props.activeState),
        };
      }
      if (props.publicPrivate !== "") {
        filterDTO = { ...filterDTO, publicOrPrivate: props.publicPrivate };
      }
      if (props.hbcuOrNot !== "") {
        filterDTO = { ...filterDTO, hbcuOrNot: props.hbcuOrNot };
      }

      try {
        const response = await fetch(`${domain}/colleges/getMatchingColleges`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterDTO),
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();
        const cpData = data as CollegeProfileDataWrapper[];

        // Handle the response data
        // console.log(cpData);

        const results: Result[] = cpData.map((cp) => {
          return {
            college: cp.collegeProfileSummary.name,
            tags: "None",
            state: cp.collegeProfileSummary.state,
            division: cp.collegeProfileSummary.division,
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
      toast.error(CRITERIA_INVALID, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const clearCriteriaFields = () => {
    props.changeConference("");
    props.changeDivision("");
    props.changeHbcuOrNot("");
    props.changePublicPrivate("");
    props.changeState("");

    setConferenceKey(new Date().getTime());
    setStateKey(new Date().getTime() + 10000);
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
        variant="h5"
        sx={{
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          borderBottom: `3px solid ${blue}`,
          padding: "10px",
          textAlign: "center", // Center the text horizontally,
          backgroundColor: "white", // Set the background color to white
        }}
      >
        Enter Criteria
      </Typography>

      <Box
        sx={{
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Grid container spacing={2}>
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
                size={isSmallScreen ? "small" : "small"}
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
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Autocomplete
              size="small"
              key={conferenceKey}
              onChange={(evt, value) => {
                console.log(evt);
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
          <Grid item xs={1}></Grid>

          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Autocomplete
              size="small"
              key={stateKey}
              onChange={(evt, value) => {
                console.log(evt);
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
          <Grid item xs={1}></Grid>

          <Grid item xs={0.75}></Grid>
          <Grid item xs={5}>
            <ButtonGroup variant="outlined">
              <Button
                color={
                  props.publicPrivate === "PUBLIC" ? "secondary" : "inherit"
                }
                onClick={() => {
                  if (props.publicPrivate === "PUBLIC") {
                    props.changePublicPrivate("");
                  } else {
                    props.changePublicPrivate("PUBLIC");
                  }
                }}
                size="small"
              >
                Public
              </Button>
              <Button
                color={
                  props.publicPrivate === "PRIVATE" ? "secondary" : "inherit"
                }
                onClick={() => {
                  if (props.publicPrivate === "PRIVATE") {
                    props.changePublicPrivate("");
                  } else {
                    props.changePublicPrivate("PRIVATE");
                  }
                }}
                size="small"
              >
                Private
              </Button>
            </ButtonGroup>
          </Grid>

          <Grid item xs={6}>
            <ButtonGroup variant="outlined">
              <Button
                color={props.hbcuOrNot === "YES" ? "secondary" : "inherit"}
                onClick={() => {
                  if (props.hbcuOrNot === "YES") {
                    props.changeHbcuOrNot("");
                  } else {
                    props.changeHbcuOrNot("YES");
                  }
                }}
                size="small"
              >
                HBCU
              </Button>
              <Button
                color={props.hbcuOrNot === "NO" ? "secondary" : "inherit"}
                onClick={() => {
                  if (props.hbcuOrNot === "NO") {
                    props.changeHbcuOrNot("");
                  } else {
                    props.changeHbcuOrNot("NO");
                  }
                }}
                size="small"
              >
                Not HBCU
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          padding: "10px",
          backgroundColor: "white", // Set the background color to white
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item></Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={clickHandlerCriteriaSearch}
            size="small"
            sx={{ boxShadow: "0" }}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={clearCriteriaFields}
            size="small"
            sx={{ boxShadow: "0" }}
          >
            Clear Criteria
          </Button>
          <SearchBothButton
            eventNamesField={props.eventNamesField}
            criteriaIsValid={props.criteriaIsValid}
            marksIsValid={props.marksIsValid}
            activeGender={props.siblingInfo.activeGender}
            userInput={props.siblingInfo.userInput}
            activeConference={props.activeConference}
            activeDivision={props.activeDivision}
            activeState={props.activeState}
            publicPrivate={props.publicPrivate}
            hbcuOrNot={props.hbcuOrNot}
            changeResults={(results: Result[]) => props.changeResults(results)}
            changeResultStatus={(status: ResultStatus) =>
              props.changeResultStatus(status)
            }
          />
          <Grid item></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Criteria;
