import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";

import * as ROUTES from "../../../constants/routes";
import * as styles from "./styles";

const columns = [
  { field: "id", hide: true },
  {
    field: "country",
    headerName: "Country",
    minWidth: 150,
    flex: 1,
    cellClassName: "country--cell",
    renderCell: (params) => (
      <Link to={`${ROUTES.HOME_BASE}/${params.value}`}>
        <Button style={{ color: "white" }}>{params.value}</Button>
      </Link>
    ),
    sortComparator: (v1, v2, row1, row2) => {
      return row1.value.localeCompare(row2.value);
    },
  },
  {
    field: "confirmed",
    headerName: "Cases",
    minWidth: 130,
    flex: 1,
    cellClassName: "confirmed--cell",
  },
  {
    field: "deaths",
    headerName: "Deaths",
    minWidth: 130,
    flex: 1,
    cellClassName: "deaths--cell",
  },
  {
    headerName: "Vaccinations",
    field: "people_vaccinated",
    minWidth: 180,
    flex: 1,
    cellClassName: "vaccines--cell",
  },
];

const getRows = (data) => {
  return Object.keys(data).map((item, index) => ({
    id: index,
    country: item,
    confirmed: data[item].confirmed,
    deaths: data[item].deaths,
    people_vaccinated: data[item].people_vaccinated,
  }));
};

export const SummaryTableCountry = ({ data }) => {
  const classes = styles.useStyles();

  return (
    <div style={{ height: 520, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }} className={classes.root}>
          <DataGrid rows={getRows(data)} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export const SummaryTableCountryLoader = () => {
  return (
    <>
      <Skeleton height={52} variant="rectangular"></Skeleton>
      {[...new Array(8)].map((el, idx) => (
        <Skeleton height={52} key={idx}></Skeleton>
      ))}

      <Skeleton height={52} variant="rectangular"></Skeleton>
    </>
  );
};

export default SummaryTableCountry;
