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
    palette: "palette1",
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

const Temperature = (props) => {
  const series = [
    {
      name: "S1",
      data: props.s1["m2m:cin"]["con"]["temperature"],
    },
    {
      name: "S2",
      data: props.s2["m2m:cin"]["con"]["temperature"],
    },
    {
      name: "S3",
      data: props.s3["m2m:cin"]["con"]["temperature"],
    },
  ];
  return <ReactApexChart options={options} series={series} height={315} />;
};
export default Temperature;
