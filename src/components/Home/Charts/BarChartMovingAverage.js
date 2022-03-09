import { Bar } from "react-chartjs-2";
import Skeleton from "@material-ui/lab/Skeleton";

/**
 * returns an array with moving average of the input array
 * @param array - the input array
 * @param count - the number of elements to include in the moving average calculation
 *  value to determine whether it should be used
 */
function movingAvg(array, count) {
  var avg = function (array) {
    var sum = 0,
      count = 0,
      val;
    for (var i in array) {
      val = array[i];
      sum += val;
      count++;
    }

    return sum / count;
  };

  let result = [];

  // pad beginning of result with null values
  for (let i = 0; i < count - 1; i++) {
    let val = avg(array.slice(0, i + 1));
    if (isNaN(val)) result.push(null);
    else result.push(parseInt(val));
  }
  // calculate average for each subarray and add to result
  for (let i = 0, len = array.length - count; i <= len; i++) {
    let val = avg(array.slice(i, i + count));
    if (isNaN(val)) result.push(null);
    else result.push(parseInt(val));
  }

  return result;
}

const getData = (data, labels, lineColor, barColor) => {
  let moving_average = movingAvg(data, 7);

  return {
    labels: labels,
    datasets: [
      {
        type: "line",
        label: "7 days moving average",
        borderColor: lineColor,
        backgroundColor: lineColor,
        borderWidth: 1,
        fill: false,
        data: moving_average,
      },
      {
        type: "bar",
        label: "Daily",
        backgroundColor: barColor,
        data: data,
      },
    ],
  };
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
        },
      },
    ],
  },
};

export function BarChartMovingAverage({ data, labels, barColor, lineColor }) {
  return (
    <Bar data={getData(data, labels, lineColor, barColor)} options={options} />
  );
}

const loaderMockData = {
  labels: [1],
  datasets: [
    {
      data: [1],
    },
  ],
};

export const BarChartLoader = () => {
  return (
    <Skeleton width={"100%"} variant="rectangular">
      <Bar data={loaderMockData} />;
    </Skeleton>
  );
};

export default BarChartMovingAverage;
