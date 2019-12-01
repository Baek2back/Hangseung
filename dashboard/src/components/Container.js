import React from "react";
import { Card } from "antd";

const Container = (props) => {
  return (
    <Card
      loading={props.loading}
      bodyStyle={{ padding: 0 }}
      style={{ width: "90%", marginTop: 16 }}
      title={props.title}
    >
      {props.children}
    </Card>
  );
};

export default Container;
