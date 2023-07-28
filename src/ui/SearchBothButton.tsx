import { Button } from "@mui/material";
import { toast } from "react-toastify";

import { UserInput } from "../pages/RecruitPage";
import {
  BOTH_INVALID,
  CRITERIA_INVALID,
  MARKS_INVALID,
} from "../constants/recruit-page-error-messages";

interface Props {
  criteriaIsValid: () => boolean;
  marksIsValid: () => boolean;
  activeGender: string;
  userInput: UserInput;
  activeDivision: string;
  activeConference: string;
  activeState: string;
  publicPrivate: string;
  hbcuOrNot: string;
}

const SearchBothButton = (props: Props) => {
  const clickHandlerBothSearch = () => {
    toast.warning(
      "[HOVER ON ME] DISCLAIMER: This service is still in beta and thus we do not do conversions automatically yet! You must convert to your best guess of the college equivalent. This applies to many events, like hurdles (which are lower in high school vs. college), throwing events (weight), etc.",
      {
        position: toast.POSITION.BOTTOM_LEFT,
      }
    );
    if (props.criteriaIsValid() && props.marksIsValid()) {
      toast.success("data for both are valid", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
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
    <Button variant="contained" color="info" onClick={clickHandlerBothSearch}>
      Search Both
    </Button>
  );
};

export default SearchBothButton;
