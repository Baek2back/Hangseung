import React from "react";
import ReactApexChart from "react-apexcharts";

const options = {
  chart: {
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  theme: {
    mode: "dark",
    palette: "palette6",
  },
  dataLabel: {
    enabled: false,
  },
  toolbar: {
    tools: {
      selection: false,
    },
  },
  stroke: {
    curve: "straight",
  },
  xaxis: {
    type: "numeric",
  },
  grid: {
    clipMarkers: false,
  },
};

const Tvoc = (props) => {
  const series = [
    {
      name: "S1",
      data: props.s1["m2m:cin"]["con"]["tvoc"],
    },
    {
      name: "S2",
      data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    },
    {
      name: "S3",
      data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    },
  ];
  return <ReactApexChart options={options} series={series} height={315} />;
};
export default Tvoc;
