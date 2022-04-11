import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  Box,
  IconButton,
  TableFooter,
  TablePagination,
  useTheme
} from "@mui/material";
import {
  Paper, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material/";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import nextId from "react-id-generator";


function TablePaginationActions(props: {
  count: any;
  page: any;
  rowsPerPage: any;
  onPageChange: any;
}) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

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

export default function CustomTable(props: {
  columnsData: any[];
  rowsData: any[];
  rowsPerPage: number;
  totalRows: number;
  page: number;
  handleChangePage: (event: any, page: number) => void;
}) {
  const dataToRow = (
    data: (
      | boolean
      | ReactChild
      | ReactFragment
      | ReactPortal
      | null
      | undefined
      | string
    )[]
  ) => {
    return (
      <StyledTableRow key={nextId()}>
        {props.columnsData.map((column, index: number) => {
          //   console.log(column.width, column.align)
          return (
            <StyledTableCell
              key={index}
              width={column.width}
              align={column.align}
              component={column.component}
            >
              {data[index]}
            </StyledTableCell>
          );
        })}
      </StyledTableRow>
    );
  };
  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: "2em",
      }}
    >
      <Table
        sx={{
          minWidth: 500,
        }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            {props.columnsData.map((column) => {
              // console.log(column)
              return (
                <StyledTableCell
                  key={column.name}
                  width={column.width ? column.width : ""}
                  align={column.align ? column.align : "left"}
                >
                  {column.name}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* //component="th" scope="row" */}
          {props.rowsData.map((row, index) => dataToRow(row))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[props.rowsPerPage]} // [5, 10, 25{ label: "All", value: -1 }]
              colSpan={3}
              count={props.totalRows}
              rowsPerPage={props.rowsPerPage}
              page={props.page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={props.handleChangePage} // onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
