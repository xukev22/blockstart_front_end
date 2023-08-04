import { Grid, Box } from "@mui/material";
import theme from "../theme/theme";
import { Essentials, EssentialsBonus } from "../model/CollegeProfileData";

interface Props {
  schoolEssentials: Essentials;
  schoolEssentialsBonus: EssentialsBonus | null;
}
const MoreInfo = ({ schoolEssentials, schoolEssentialsBonus }: Props) => {
  return (
    <Grid
      container
      paddingTop={"50px"}
      paddingBottom={"250px"}
      sx={{
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Grid item xs={1} lg={2}></Grid>
      <Grid
        item
        xs={8}
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: "30px",
            paddingBottom: "30px",
            paddingLeft: "60px",
          }}
        >
          <Grid paddingBottom={"5px"}>Name: {schoolEssentials.name}</Grid>
          <Grid paddingBottom={"5px"}>
            Division: {schoolEssentials.division}
          </Grid>
          <Grid paddingBottom={"5px"}>
            Location: {schoolEssentialsBonus?.town}, {schoolEssentials.state}
          </Grid>
          <Grid paddingBottom={"5px"}>
            Conference: {schoolEssentials.conference}
          </Grid>
          <Grid paddingBottom={"5px"}>
            Public/Private: {schoolEssentials.publicOrPrivate}
          </Grid>
          <Grid paddingBottom={"5px"}>HBCU: {schoolEssentials.hbcuOrNot}</Grid>
          <Grid paddingBottom={"5px"}>
            Website: {schoolEssentials.mainWebsiteURL}
          </Grid>
          <Grid>Athletic Website: {schoolEssentials.athleticWebsiteURL}</Grid>
        </Box>
      </Grid>
      <Grid item xs={1} lg={2}></Grid>
    </Grid>
  );
};

export default MoreInfo;
