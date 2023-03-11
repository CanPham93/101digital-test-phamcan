import { SetStateAction, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import Pagination from "@mui/material/Pagination";
import TableRow from "@mui/material/TableRow";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateRange, DateRangePicker } from "@mui/x-date-pickers-pro";
import SearchIcon from "@mui/icons-material/Search";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";

import apiUser from "../request/user";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledInputSearch = styled("input")(() => ({
  width: 200,
  height: 56,
  padding: "16.5px 14px",
  borderRadius: 4,
  fontSize: "1rem",
  letterSpacing: "0.00938em",
  color: "rgba(0, 0, 0, 0.87)",
  border: "1px solid #c4c4c4",
  "&:hover": {
    borderColor: "#212121",
  },
  "&:focus": {
    outline: "none",
    border: "2px solid #1976d2",
  },
}));

const StyledHeadInvoice = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<any>([]);
  const [totalRecords, setPotalRecords] = useState<any>(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState<DateRange<Dayjs>>([
    dayjs(""),
    dayjs(""),
  ]);
  const [inputSearch, setInputSearch] = useState("");

  const getUserProfile = async () => {
    const params = {
      pageNum: page,
      pageSize: rowsPerPage,
      dateType: "INVOICE_DATE",
      sortBy: "CREATED_DATE",
      ordering: "DESCENDING",
      fromDate: "",
      toDate: "",
      keyword: inputSearch,
    };
    const res = await apiUser.getInvoices(params);
    if (res) {
      setPotalRecords(res.paging.totalRecords || 0);
      setPage(res.paging.pageNumber || 0);
      setRowsPerPage(res.paging.pageSize || 0);
      setInvoices(res.data || []);
    }
  };

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, page]);

  const emptyRows =
    page > 0 ? Math.max(0, page * rowsPerPage - totalRecords) : 0;

  const handleChange = (event: any, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  useEffect(() => {
    console.log("start date", dayjs(dateFilter[0], "YYYY-MM-DD").toDate());
    console.log("end date", dayjs(dateFilter[1], "YYYY-MM-DD").toDate());
  }, [dateFilter]);

  const handleSubmitSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    getUserProfile();
  };

  const handleChangeSearch = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputSearch(event.target.value);
  };

  return (
    <TableContainer style={{ marginTop: 80 }}>
      <StyledHeadInvoice>
        <form onSubmit={handleSubmitSearch} style={{ marginTop: 8 }}>
          <StyledInputSearch
            id="search"
            placeholder="Search"
            value={inputSearch}
            onChange={handleChangeSearch}
          />
          <Button type="submit" sx={{ height: 56 }}>
            <SearchIcon />
          </Button>
        </form>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DateRangePicker", "DateRangePicker"]}
            sx={{ maxWidth: "auto" }}
          >
            <DateRangePicker
              format="YYYY-MM-DD"
              value={dateFilter}
              localeText={{ start: "From Date", end: "To Date" }}
              onChange={(newValue) => setDateFilter(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </StyledHeadInvoice>

      <Table sx={{ minWidth: 500, mt: 2 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Invoice Id</StyledTableCell>
            <StyledTableCell align="right">Balance Amount</StyledTableCell>
            <StyledTableCell align="right">Invoice Date</StyledTableCell>
            <StyledTableCell align="right">Created At</StyledTableCell>
            <StyledTableCell align="right">Currency</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((row: any) => (
            <TableRow key={row.invoiceId}>
              <TableCell component="th" scope="row">
                {row.invoiceId}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.balanceAmount}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.invoiceDate}
              </TableCell>
              <TableCell style={{ width: 300 }} align="right">
                {row.createdAt}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.currency}
              </TableCell>
              <TableCell style={{ width: 300 }} align="right">
                {row.status[0]?.key}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} align="center">No data</TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={12}>
              <Pagination
                showFirstButton
                showLastButton
                count={Math.round(totalRecords / rowsPerPage)}
                page={page}
                onChange={handleChange}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
