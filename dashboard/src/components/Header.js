import React from "react";
import { DatePicker, message } from "antd";
import { getFirstSensor } from "../modules/firstsensor";
import secondsensor, { getSecondSensor } from "../modules/secondsensor";
import { connect } from "react-redux";

const Header = ({ data, loadingData, getFirstSensor, getSecondSensor }) => {
  const onChange = (date, dateString) => {
    console.log("selectedDate", dateString);
    getFirstSensor(dateString);
    getSecondSensor(dateString);
    /*message.error("Data does not exist. Choose other date.");
    return;*/
  };
  return (
    <div style={{ height: "50px" }}>
      <DatePicker
        size="large"
        style={{ top: "25%", left: 30 }}
        onChange={onChange}
      />
    </div>
  );
};

export default connect(
  ({ firstsensor, secondsensor }) => ({
    data: [firstsensor.data, secondsensor.data],
    loadingData: [firstsensor.loading.GET_DATA, secondsensor.loading.GET_DATA],
  }),
  {
    getFirstSensor,
    getSecondSensor,
  },
)(Header);
