import React from "react";
import { Icon } from "antd";

const Title = (props) => {
  return (
    <>
      <Icon type={props.type} />
      <span style={{ padding: "10px" }}>{props.name}</span>
    </>
  );
};
export default Title;
