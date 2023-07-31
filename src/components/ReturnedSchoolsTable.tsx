import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  LastPage as LastPageIcon,
} from "@mui/icons-material";
import { Theme, styled } from "@mui/material/styles";
import { Result } from "../pages/RecruitPage";

interface Column {
  id: "college" | "tags" | "state" | "division";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

// interface Data {
//   college: string;
//   tags: string;
//   state: string;
//   division: string;
// }

// function createData(
//   college: string,
//   tags: string,
//   state: string,
//   division: string
// ): Data {
//   return { college, tags, state, division };
// }

// const rows = [
//   createData("India", "IN", "1324171354", "3287263"),
//   createData("China", "CN", "1403500365", "9596961"),
//   createData("Italy", "IT", "60483973", "301340"),
//   createData("United States", "US", "327167434", "9833520"),
//   createData("Canada", "CA", "37602103", "9984670"),
//   createData("Australia", "AU", "25475400", "7692024"),
//   createData("Germany", "DE", "83019200", "357578"),
//   createData("Ireland", "IE", "4857000", "70273"),
//   createData("Mexico", "MX", "126577691", "1972550"),
//   createData("Japan", "JP", "126317000", "377973"),
//   createData("France", "FR", "67022000", "640679"),
//   createData("United Kingdom", "GB", "67545757", "242495"),
//   createData("Russia", "RU", "146793744", "17098246"),
//   createData("Nigeria", "NG", "200962417", "923768"),
//   createData("Brazil", "BR", "210147125", "8515767"),
// ];

interface Props {
  results: Result[];
}

export default function ReturnedSchoolsTable(props: Props) {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const WIDTH_NON_TAG = isSmallScreen ? 85 : 170;
  const WIDTH_TAG = isSmallScreen ? 50 : 100;

  const columns: readonly Column[] = [
    { id: "college", label: "College", minWidth: WIDTH_NON_TAG },
    { id: "tags", label: "Tags", minWidth: WIDTH_TAG },
    {
      id: "state",
      label: "State",
      minWidth: WIDTH_NON_TAG,
      align: "right",
    },
    {
      id: "division",
      label: "Division",
      minWidth: WIDTH_NON_TAG,
      align: "right",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState<keyof Result>("college");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (columnId: keyof Result) => {
    if (sortColumn === columnId) {
      // Toggle sort direction if the same column is clicked again
      setSortDirection((prevSortDirection) =>
        prevSortDirection === "asc" ? "desc" : "asc"
      );
    } else {
      // Set the new column and reset sort direction to ascending
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  const sortedRows = useMemo(() => {
    const comparator = (a: Result, b: Result) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      // For string values, use localeCompare for alphabetical sorting
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    };

    return [...props.results].sort(comparator);
  }, [props.results, sortColumn, sortDirection]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  onClick={() => handleSort(column.id)}
                >
                  {column.label}
                  {sortColumn === column.id && (
                    <Box
                      component="span"
                      sx={{
                        marginLeft: "0.5rem",
                        fontSize: "0.8rem",
                        verticalAlign: "middle",
                      }}
                    >
                      {sortDirection === "asc" ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </Box>
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          {props.results.length === 0 ? (
            <Typography>No colleges matched the given filters!</Typography>
          ) : (
            <TableBody>
              {sortedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.college}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        // Check if the current cell is the "college" column
                        if (column.id === "college") {
                          // Wrap the college name in a Link component
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Link to={`/colleges/${value}`}>{value}</Link>
                            </TableCell>
                          );
                        } else {
                          // For other columns, render normally
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                      })}
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <PaginationActions
        count={sortedRows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

// Pagination Actions Component
interface PaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add this line
}

const PaginationActions: React.FC<PaginationActionsProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onRowsPerPageChange(event);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 2,
      }}
    >
      <Typography variant="body2" sx={{ marginRight: 2 }}>
        Rows per page:
      </Typography>
      <TextField
        select
        value={rowsPerPage}
        onChange={handleRowsPerPageChange}
        variant="outlined"
        size="small"
        sx={{ marginRight: 2, minWidth: 70 }}
      >
        {[5, 10, 25, 100].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Typography variant="body2" sx={{ marginRight: 2 }}>
        Page: {page + 1} of {totalPages}
      </Typography>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
};
