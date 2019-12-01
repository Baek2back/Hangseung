import React from "react";
import { connect } from "react-redux";
import { getFirstSensor } from "../modules/firstsensor";
import { Col, Row } from "antd";
import Title from "../components/Title";
import Container from "../components/Container";
import Co2 from "../components/charts/Co2";
import Humidity from "../components/charts/Humidity";
import Illumination from "../components/charts/Illumination";
import MoveDetection from "../components/charts/MoveDetection";
import Temperature from "../components/charts/Temperature";
import Tvoc from "../components/charts/Tvoc";

const OverviewPage = ({ data, loadingData, getFirstSensor }) => {
  React.useEffect(() => {
    getFirstSensor();
  }, [getFirstSensor]);
  console.log(data);
  return (
    <>
      <Row>
        <Col lg={8}>
          <Container
            loading={loadingData}
            title={<Title type="fire" name="온도" />}
          >
            {data && <Temperature s1={data} />}
          </Container>
        </Col>
        <Col lg={8}>
          <Container
            loading={loadingData}
            title={<Title type="cloud" name="습도" />}
          >
            {data && <Humidity s1={data} />}
          </Container>
        </Col>
        <Col lg={8}>
          <Container
            loading={loadingData}
            title={<Title type="bulb" name="조도" />}
          >
            {data && <Illumination s1={data} />}
          </Container>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Container
            loading={loadingData}
            title={<Title type="team" name="재실 감지" />}
          >
            {data && <MoveDetection s1={data} />}
          </Container>
        </Col>
        <Col lg={8}>
          <Container
            loading={loadingData}
            title={<Title type="experiment" name="이산화탄소" />}
          >
            {data && <Co2 s1={data} />}
          </Container>
        </Col>
        <Col lg={8}>
          <Container
            loading={loadingData}
            title={<Title type="frown" name="유해 가스" />}
          >
            {data && <Tvoc s1={data} />}
          </Container>
        </Col>
      </Row>
    </>
  );
};
export default connect(
  ({ firstsensor }) => ({
    data: firstsensor.data,
    loadingData: firstsensor.loading.GET_DATA,
  }),
  {
    getFirstSensor,
  },
)(OverviewPage);
