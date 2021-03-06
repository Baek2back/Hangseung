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
const Temperature = (props) => {
  const time = props.s1[0];
  const contents = props.s1[1].map((element) => {
    return element.temperature;
  });
  const data = time
    .map((value, index) => {
      return [...[value, contents[index]]];
    })
    .map((value) => {
      return { x: value[0], y: value[1] };
    });

  const time2 = props.s2[0];
  const contents2 = props.s2[1].map((element) => {
    return element.temperature;
  });
  const data2 = time2
    .map((value, index) => {
      return [...[value, contents2[index]]];
    })
    .map((value) => {
      return { x: value[0], y: value[1] };
    });

  const series = [
    {
      name: "S1",
      data: data,
    },
    {
      name: "S2",
      data: data2,
    },
  ];
  return <ReactApexChart options={options} series={series} height={315} />;
};
export default Temperature;
