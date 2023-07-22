import {
  Accordion,
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Import the ExpandMoreIcon

const fetchHardCoded = async () => {
  const filterDTO = {
    gender: "MALE",
    userInput: {
      MALE_TRACK_100: "10.85",
      MALE_FIELD_POLE_VAULT: "3.25m",
      MALE_FIELD_HIGH_JUMP: "1.95m",
    },
  };

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

    // Handle the response data
    console.log(data);
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
};

const RecruitPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
        >
          <Button onClick={fetchHardCoded} variant="contained">
            Fetch hard coded data
          </Button>
          <Button>hello</Button>
        </Stack>
      </Grid>

      <Grid item xs={4}>
        <Stack direction="column">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Accordion Section 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Content of Accordion Section 1</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Accordion Section 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Content of Accordion Section 2</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Accordion Section 3</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Content of Accordion Section 3</Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default RecruitPage;
