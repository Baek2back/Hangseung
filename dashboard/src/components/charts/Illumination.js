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
    palette: "palette3",
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
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  grid: {
    clipMarkers: false,
  },
};

const Illumination = (props) => {
  const time = props.s1[0];
  const contents = props.s1[1].map((element) => {
    return element.illumination;
  });
  const data = time
    .map((value, index) => {
      return [...[value, contents[index]]];
    })
    .map((value) => {
      return { x: value[0], y: value[1] };
    });

  const series = [
    {
      name: "S1",
      data: data,
    },
  ];
  return <ReactApexChart options={options} series={series} height={315} />;
};
export default Illumination;
