import { useState, useMemo } from "react";
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
} from "@mui/material";
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  LastPage as LastPageIcon,
} from "@mui/icons-material";

interface Column {
  id: "name" | "code" | "population" | "size";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
  },
];

interface Data {
  name: string;
  code: string;
  population: string;
  size: string;
}

function createData(
  name: string,
  code: string,
  population: string,
  size: string
): Data {
  return { name, code, population, size };
}

const rows = [
  createData("India", "IN", "1324171354", "3287263"),
  createData("China", "CN", "1403500365", "9596961"),
  createData("Italy", "IT", "60483973", "301340"),
  createData("United States", "US", "327167434", "9833520"),
  createData("Canada", "CA", "37602103", "9984670"),
  createData("Australia", "AU", "25475400", "7692024"),
  createData("Germany", "DE", "83019200", "357578"),
  createData("Ireland", "IE", "4857000", "70273"),
  createData("Mexico", "MX", "126577691", "1972550"),
  createData("Japan", "JP", "126317000", "377973"),
  createData("France", "FR", "67022000", "640679"),
  createData("United Kingdom", "GB", "67545757", "242495"),
  createData("Russia", "RU", "146793744", "17098246"),
  createData("Nigeria", "NG", "200962417", "923768"),
  createData("Brazil", "BR", "210147125", "8515767"),
];

export default function ReturnedSchoolsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState<keyof Data>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (columnId: keyof Data) => {
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
    const comparator = (a: Data, b: Data) => {
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

    return [...rows].sort(comparator);
  }, [rows, sortColumn, sortDirection]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
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
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
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
        Page: {page + 1}
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
