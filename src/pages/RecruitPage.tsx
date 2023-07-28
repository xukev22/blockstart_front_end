import { Box, Grid, Stack, Divider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Criteria from "../components/Criteria";
import Marks from "../components/Marks";
import SearchResults from "../components/SearchResults";

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

// Define the union type for all possible event names
type AllEventNames =
  | (typeof eventNamesTrackShort)[number]
  | (typeof eventNamesTrackLong)[number]
  | (typeof eventNamesField)[number]
  | (typeof eventNamesXC)[number];

export type UserInput = Partial<Record<AllEventNames, string>>;
import { EventType } from "../model/CollegeProfileData"; //reminder

// const fetchHardCoded = async () => {
//   const filterDTO = {
//     gender: "MALE",
//     userInput: {
//       MALE_TRACK_100: "10.85",
//       MALE_FIELD_POLE_VAULT: "3.25m",
//       MALE_FIELD_HIGH_JUMP: "1.95m",
//     },
//   };

//   try {
//     const response = await fetch(
//       "http://localhost:8080/colleges/getMatchingColleges",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(filterDTO),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Request failed");
//     }

//     const data = await response.json();

//     // Handle the response data
//     console.log(data);
//   } catch (error) {
//     // Handle any errors
//     console.error(error);
//   }
// };

const RecruitPage = () => {
  const [activeDivision, setActiveDivision] = useState("");
  const [publicPrivate, setPublicPrivate] = useState("");
  const [hbcuOrNot, setHbcuOrNot] = useState("");
  const [activeConference, setActiveConference] = useState("");
  const [activeState, setActiveState] = useState("");

  const [activeGender, setActiveGender] = useState("");
  // const initialTestData: EventData = { abc: "lol" };
  const [userInput, setUserInput] = useState<UserInput>({});

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

  return (
    // box for anti-horizontal scroll
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={7}>
          <Stack
            direction="column"
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
          >
            <Criteria
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
              siblingInfo={{ activeGender, userInput }}
            />
            <SearchResults />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <Marks
            criteriaIsValid={criteriaIsValid}
            marksIsValid={marksIsValid}
            eventNamesTrackShort={eventNamesTrackShort}
            eventNamesTrackLong={eventNamesTrackLong}
            eventNamesField={eventNamesField}
            eventNamesXC={eventNamesXC}
            userInput={userInput}
            changeUserInput={(eventName: string, value: string) =>
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
              })
            }
            activeGender={activeGender}
            changeGender={(gender: string) => setActiveGender(gender)}
            siblingInfo={{
              activeDivision,
              activeConference,
              activeState,
              publicPrivate,
              hbcuOrNot,
            }}
          />
        </Grid>
      </Grid>
      <ToastContainer />
    </Box>
  );
};

export default RecruitPage;
