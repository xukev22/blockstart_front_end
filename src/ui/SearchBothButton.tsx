import { Button } from "@mui/material";
import { toast } from "react-toastify";

import { UserInput, Result, ResultStatus } from "../pages/RecruitPage";
import {
  BOTH_INVALID,
  CRITERIA_INVALID,
  DISCLAIMER,
  MARKS_INVALID,
} from "../constants/recruit-page-error-messages";

import { FilterDTO } from "../components/Marks";
import { Gender, convertFullNameToAbbreviation } from "../utils/mappings";
import { CollegeProfileDataWrapper } from "../model/CollegeProfileData";

import { tagsToString, textFieldToEventTypeName } from "../utils/mappings";

interface Props {
  eventNamesField: string[];
  criteriaIsValid: () => boolean;
  marksIsValid: () => boolean;
  activeGender: string;
  userInput: UserInput;
  activeDivision: string;
  activeConference: string;
  activeState: string;
  publicPrivate: string;
  hbcuOrNot: string;
  changeResults: (results: Result[]) => void;
  changeResultStatus: (status: ResultStatus) => void;
}

const SearchBothButton = (props: Props) => {
  const clickHandlerBothSearch = async () => {
    if (props.criteriaIsValid() && props.marksIsValid()) {
      toast.success("data for both are valid", {
        position: toast.POSITION.BOTTOM_LEFT,
      });

      toast.warning(DISCLAIMER, {
        position: toast.POSITION.BOTTOM_LEFT,
      });

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
        // console.error(error);
      }
    } else if (props.criteriaIsValid()) {
      toast.error(MARKS_INVALID, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else if (props.marksIsValid()) {
      toast.error(CRITERIA_INVALID, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      toast.error(BOTH_INVALID, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  return (
    <Button
      size="small"
      variant="contained"
      color="info"
      onClick={clickHandlerBothSearch}
    >
      Search Both
    </Button>
  );
};

export default SearchBothButton;
