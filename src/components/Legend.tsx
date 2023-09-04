import { Chip, Grid, Typography } from "@mui/material";

// const legendData = [
//   { color: "#2f78e6", tag: "HARD RECRUIT", description: "Hard Recruit" },
//   { color: "yellowgreen", tag: "SOFT RECRUIT", description: "Soft Recruit" },
//   { color: "darkorange", tag: "WALK ON", description: "Walk On" },
// ];

const Legend = () => (
  <Grid container>
    {" "}
    <Grid
      item
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: "20px",
      }}
    >
      <Chip
        label="WALK ON:"
        style={{
          backgroundColor: "darkorange",
          color: "#ffffff",
        }}
      />
      <Typography sx={{ paddingLeft: "10px" }}>
        If you meet the walkon standard this means your marks are likely strong
        enough to reach out to the school for a walkon spot
      </Typography>
    </Grid>
    <Grid
      item
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: "20px",
      }}
    >
      <Chip
        label="SOFT RECRUIT:"
        style={{ backgroundColor: "yellowgreen", color: "#ffffff" }}
      />
      <Typography sx={{ paddingLeft: "10px" }}>
        If you meet the soft recruit standard this means your marks are likely
        strong enough to get recruited by the school
      </Typography>
    </Grid>
    <Grid
      item
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: "20px",
      }}
    >
      <Chip
        label="HARD RECRUIT:"
        style={{
          backgroundColor: "#2f78e6",
          color: "#ffffff",
        }}
      />
      <Typography sx={{ paddingLeft: "10px" }}>
        If you meet the hard recruit standard this means your marks are likely
        strong enough to get recruited to the school and sign an NIL agreement.{" "}
        {"("}This applies for DI schools, and varies from school to school{")"}
      </Typography>
    </Grid>
  </Grid>
);

export default Legend;
