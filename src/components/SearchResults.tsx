import { Box, CircularProgress, Typography } from "@mui/material";
import ReturnedSchoolsTable from "./ReturnedSchoolsTable";
import { Result, ResultStatus } from "../pages/RecruitPage";

interface Props {
  resultStatus: ResultStatus;
  results: Result[];
}

const SearchResults = (props: Props) => {
  return (
    <Box sx={{ padding: "1rem" }}>
      {props.resultStatus === ResultStatus.SUCCESS && <ReturnedSchoolsTable results={props.results}/>}
      {props.resultStatus === ResultStatus.ERROR && (
        <Typography>Something went wrong!</Typography>
      )}
      {props.resultStatus === ResultStatus.LOADING && <CircularProgress />}
    </Box>
  );
};

export default SearchResults;
