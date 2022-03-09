import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "@material-ui/lab/Skeleton";
import * as COLORS from "../../../constants/colors";

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getRows = (data) => [
  {
    id: 1,
    measure: "Cases",
    value: data.confirmed,
    bg: COLORS.CONFIRMED,
  },
  {
    id: 2,
    measure: "Deaths",
    value: data.deaths,
    bg: COLORS.DEATHS,
  },
  {
    id: 3,
    measure: "Fully vaccinated",
    value: data.people_vaccinated,
    bg: COLORS.VACCINATED,
  },
  {
    id: 4,
    measure: "At least one dose",
    value: data.people_partially_vaccinated,
    bg: COLORS.VACCINATED,
  },
  {
    id: 5,
    measure: "Shots given",
    value: data.administered,
    bg: COLORS.VACCINATED,
  },
];

export const SummaryTable = ({ data }) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {getRows(data).map((row) => (
            <TableRow style={{ background: row.bg }} key={row.id}>
              <TableCell>{row.measure}</TableCell>
              <TableCell align="right">{numberWithCommas(row.value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const loaderMockData = {
  confirmed: -1,
  deaths: -1,
  people_vaccinated: -1,
  people_partially_vaccinated: -1,
  administered: -1,
};

export const SummaryTableLoader = () => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {getRows(loaderMockData).map((row) => (
            <TableRow style={{ background: row.bg }} key={row.id}>
              <TableCell>{row.measure}</TableCell>
              <TableCell align="right">
                <Skeleton></Skeleton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SummaryTable;
