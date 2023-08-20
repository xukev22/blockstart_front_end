import { Box, Grid, Stack, Divider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Criteria from "../components/Criteria";
import Marks from "../components/Marks";
import SearchResults from "../components/SearchResults";

import { useState, useCallback, useEffect } from "react";

import { CollegeProfileDataWrapper } from "../model/CollegeProfileData";
import { domain } from "../constants/data-api";

export enum ResultStatus {
  SUCCESS = "SUCCESS",
  LOADING = "LOADING",
  ERROR = "ERROR",
}

export interface Result {
  college: string;
  tags: string;
  state: string;
  division: string;
}

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

// Define the union type for all possible event names
type AllEventNames =
  | (typeof eventNamesTrackShort)[number]
  | (typeof eventNamesTrackLong)[number]
  | (typeof eventNamesField)[number]
  | (typeof eventNamesXC)[number];

export type UserInput = Partial<Record<AllEventNames, string>>;
// import { EventType } from "../model/CollegeProfileData"; reminder to maybe fix the need for this using event type reverse mapping

const RecruitPage = () => {
  const [activeDivision, setActiveDivision] = useState("");
  const [publicPrivate, setPublicPrivate] = useState("");
  const [hbcuOrNot, setHbcuOrNot] = useState("");
  const [activeConference, setActiveConference] = useState("");
  const [activeState, setActiveState] = useState("");

  const [activeGender, setActiveGender] = useState("");
  // const initialTestData: EventData = { abc: "lol" };
  const [userInput, setUserInput] = useState<UserInput>({});

  const [resultStatus, setResultStatus] = useState<ResultStatus>(
    ResultStatus.LOADING
  );
  const fetchAllCollegesHandler = useCallback(async () => {
    try {
      const response = await fetch(`${domain}/colleges/getAllColleges`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const cpData = data as CollegeProfileDataWrapper[];

      // Handle the response data
      console.log(cpData);

      const initResults: Result[] = cpData.map((cp) => {
        return {
          college: cp.collegeProfile.essentials.name,
          tags: "None",
          state: cp.collegeProfile.essentials.state,
          division: cp.collegeProfile.essentials.division,
        };
      });

      setResults(initResults);
      setResultStatus(ResultStatus.SUCCESS);
    } catch (error) {
      setResultStatus(ResultStatus.ERROR);
    }
  }, []);

  useEffect(() => {
    fetchAllCollegesHandler();
  }, [fetchAllCollegesHandler]);

  const [results, setResults] = useState<Result[]>([]);

  const criteriaIsValid = () => {
    return !(
      activeDivision === "" &&
      activeConference === "" &&
      activeState === "" &&
      publicPrivate === "" &&
      hbcuOrNot === ""
    );
  };

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

    let empty = true;
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

      empty = false;
      if (!isMarkValid(eventName, textFieldValue)) {
        return false; // Found at least one valid mark
      }
    }

    return !empty;
  };

  return (
    // box for anti-horizontal scroll
    <Box>
      <Grid container sx={{ paddingTop: "40px" }}>
        <Grid item xs={0} sm={0} md={0.5}></Grid>
        <Grid item xs={12} sm={12} md={7.5}>
          <SearchResults results={results} resultStatus={resultStatus} />
        </Grid>

        <Grid item xs={12} sm={12} md={3.5}>
          <Stack
            direction="column"
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
          >
            <Marks
              criteriaIsValid={criteriaIsValid}
              marksIsValid={marksIsValid}
              eventNamesTrackShort={eventNamesTrackShort}
              eventNamesTrackLong={eventNamesTrackLong}
              eventNamesField={eventNamesField}
              eventNamesXC={eventNamesXC}
              userInput={userInput}
              changeUserInput={(eventName: string, value: string) => {
                setUserInput((prevState) => {
                  if (value !== "") {
                    return {
                      ...prevState,
                      [`${eventName}`]: `${value}`,
                    };
                  } else {
                    const newState = { ...prevState };
                    delete newState[`${eventName}`];
                    return newState;
                  }
                });
                if (eventName === "RESET" && value === "RESET") {
                  setUserInput({});
                }
              }}
              activeGender={activeGender}
              changeGender={(gender: string) => setActiveGender(gender)}
              changeResults={(results: Result[]) => setResults(results)}
              changeResultStatus={(status: ResultStatus) =>
                setResultStatus(status)
              }
              siblingInfo={{
                activeDivision,
                activeConference,
                activeState,
                publicPrivate,
                hbcuOrNot,
              }}
            />
            <Criteria
              eventNamesField={eventNamesField}
              criteriaIsValid={criteriaIsValid}
              marksIsValid={marksIsValid}
              changeDivision={(division: string) => setActiveDivision(division)}
              activeDivision={activeDivision}
              changePublicPrivate={(publicPrivate: string) =>
                setPublicPrivate(publicPrivate)
              }
              publicPrivate={publicPrivate}
              changeHbcuOrNot={(hbcuOrNot: string) => setHbcuOrNot(hbcuOrNot)}
              hbcuOrNot={hbcuOrNot}
              changeConference={(conference: string) =>
                setActiveConference(conference)
              }
              activeConference={activeConference}
              changeState={(state: string) => setActiveState(state)}
              activeState={activeState}
              changeResults={(results: Result[]) => setResults(results)}
              changeResultStatus={(status: ResultStatus) =>
                setResultStatus(status)
              }
              siblingInfo={{ activeGender, userInput }}
            />
          </Stack>
        </Grid>
      </Grid>
      <ToastContainer />
    </Box>
  );
};

export default RecruitPage;
