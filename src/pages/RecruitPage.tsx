import { Box, Grid, Stack, Divider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Criteria from "../components/Criteria";
import Marks from "../components/Marks";
import SearchResults from "../components/SearchResults";

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
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={7}>
          <Stack
            direction="column"
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
          >
            <Criteria />
            <SearchResults />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <Marks />
        </Grid>
      </Grid>
      <ToastContainer />
    </Box>
  );
};

export default RecruitPage;
