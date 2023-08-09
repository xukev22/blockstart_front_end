import { Chip, Stack } from "@mui/material";

const legendData = [
  { color: "#623CEA", tag: "HARD_RECRUIT", description: "Hard Recruit" },
  { color: "#3DDC97", tag: "SOFT_RECRUIT", description: "Soft Recruit" },
  { color: "#F4D06F", tag: "WALK_ON", description: "Walk On" },
];

const Legend = () => (
  <Stack direction="column">
    {legendData.map((item) => (
      <Chip
        label={item.tag}
        style={{ backgroundColor: item.color, color: "#ffffff" }}
      />
    ))}
  </Stack>
);

export default Legend;
