import * as React from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { createData } from "./Standards";
import { TableHead } from "@mui/material";

// an event group row that is collapsible
function CollapsibleRow(props: {
  name: string;
  eventRows: ReturnType<typeof createData>[];
}) {
  const { eventRows } = props;
  const { name } = props;
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Typography onClick={() => setOpen(!open)} variant="h6">
            {name}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 50 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                    <TableCell align="center">Walk-on</TableCell>
                    <TableCell align="center">Soft Recruit</TableCell>
                    <TableCell align="center">Hard Recruit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eventRows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell sx={{ width: "300px" }}>{row.name}</TableCell>
                      <TableCell align="center">{row.walkon}</TableCell>
                      <TableCell align="center">{row.soft}</TableCell>
                      <TableCell align="center">{row.hard}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default CollapsibleRow;
