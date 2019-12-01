import axios from "axios";

const url = "http://localhost:7579/Mobius/gisa/cnt-sensor/recent";

export const getFirstSensor = async () => {
  return await axios.get(url, {
    headers: {
      Accept: "application/json",
      "X-M2M-RI": 12345,
      "X-M2M-Origin": "SOrigin",
    },
  });
};
