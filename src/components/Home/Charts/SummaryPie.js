import { Pie } from "react-chartjs-2";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import * as COLORS from "../../../constants/colors";

const percentage = (x, y) => ((x / y) * 100).toFixed(2);

const getData = (data) => {
  let vaccinated = percentage(data.people_vaccinated, data.population);
  let partially_vaccinated = percentage(
    data.people_partially_vaccinated - data.people_vaccinated,
    data.population
  );
  let non_vaccinated = percentage(
    data.population - data.people_partially_vaccinated,
    data.population
  );

  return {
    labels: ["Fully vaccinated", "Partially vaccinated", "Non vaccinated"],
    datasets: [
      {
        data: [vaccinated, partially_vaccinated, non_vaccinated],
        backgroundColor: [
          COLORS.VACCINATED,
          COLORS.PARTIALLY_VACCINATED,
          COLORS.NON_VACCINATED,
        ],
      },
    ],
  };
};

export const SummaryPie = ({ data }) => {
  return <Pie data={getData(data)} />;
};

const useSkeletonStyles = makeStyles((theme) => ({
  avatarSkeletonContainer: {
    height: 0,
    overflow: "hidden",
    paddingTop: "46%",
    position: "relative",
  },
  avatarLoader: {
    position: "absolute",
    top: 0,
    left: "28%",
    width: "46%",
    height: "92%",
  },
  headerLoader: {
    marginTop: theme.spacing(1),
    width: "80%",
    margin: "12px auto",
    height: "7%",
  },
}));

export const SummaryPieLoader = () => {
  const classes = useSkeletonStyles();

  return (
    <>
      <Skeleton className={classes.headerLoader} />
      <div className={classes.avatarSkeletonContainer}>
        <Skeleton variant="circle" className={classes.avatarLoader} />
      </div>
    </>
  );
};

export default SummaryPie;
