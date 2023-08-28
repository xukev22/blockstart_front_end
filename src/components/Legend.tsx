import { Chip, Stack } from "@mui/material";

const legendData = [
  { color: "#2f78e6", tag: "HARD RECRUIT", description: "Hard Recruit" },
  { color: "yellowgreen", tag: "SOFT RECRUIT", description: "Soft Recruit" },
  { color: "darkorange", tag: "WALK ON", description: "Walk On" },
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
