import axios from "axios";

const firstUrl = "http://localhost:7579/Mobius/gisa/cnt-sensor1/recent";
const secondUrl = "http://localhost:7579/Mobius/gisa/cnt-sensor2/recent";
const thirdUrl = "http://localhost:7579/Mobius/gisa/cnt-sensor3/recent";

export const getFirstSensor = async () => {
  return await axios.get(firstUrl, {
    headers: {
      Accept: "application/json",
      "X-M2M-RI": 12345,
      "X-M2M-Origin": "SOrigin",
    },
  });
};

export const getSecondSensor = async () => {
  return await axios.get(secondUrl, {
    headers: {
      Accept: "application/json",
      "X-M2M-RI": 12345,
      "X-M2M-Origin": "SOrigin",
    },
  });
};

export const getThirdSensor = async () => {
  return await axios.get(thirdUrl, {
    headers: {
      Accept: "application/json",
      "X-M2M-RI": 12345,
      "X-M2M-Origin": "SOrigin",
    },
  });
};
