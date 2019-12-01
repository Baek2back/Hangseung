import React from "react";
import { connect } from "react-redux";
import { getFirstSensor } from "../modules/firstsensor";
import { getSecondSensor } from "../modules/secondsensor";
import { getThirdSensor } from "../modules/thirdsensor";
import { Col, Row } from "antd";
import Title from "../components/Title";
import Container from "../components/Container";
import Co2 from "../components/charts/Co2";
import Humidity from "../components/charts/Humidity";
import Illumination from "../components/charts/Illumination";
import MoveDetection from "../components/charts/MoveDetection";
import Temperature from "../components/charts/Temperature";
import Tvoc from "../components/charts/Tvoc";

const OverviewPage = ({
  data,
  loadingData,
  getFirstSensor,
  getSecondSensor,
  getThirdSensor,
}) => {
  React.useEffect(() => {
    getFirstSensor();
    getSecondSensor();
    getThirdSensor();
  }, [getFirstSensor, getSecondSensor, getThirdSensor]);
  console.log(data);
  return (
    <>
      <Row>
        <Col lg={8}>
          <Container
            loading={loadingData}
            title={<Title type="fire" name="온도" />}
          >
            {!data.includes(null) && (
              <Temperature s1={data[0]} s2={data[1]} s3={data[2]} />
            )}
          </Container>
        </Col>
        <Col lg={8}>
          <Container
            loading={loadingData}
            title={<Title type="cloud" name="습도" />}
          >
            {!data.includes(null) && (
              <Humidity s1={data[0]} s2={data[1]} s3={data[2]} />
            )}
          </Container>
        </Col>
        <Col lg={8}>
          <Container
            loading={loadingData}
            title={<Title type="bulb" name="조도" />}
          >
            {!data.includes(null) && (
              <Illumination s1={data[0]} s2={data[1]} s3={data[2]} />
            )}
          </Container>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Container
            loading={loadingData}
            title={<Title type="team" name="재실 감지" />}
          >
            {!data.includes(null) && (
              <MoveDetection s1={data[0]} s2={data[1]} s3={data[2]} />
            )}
          </Container>
        </Col>
        <Col lg={8}>
          <Container
            loading={loadingData}
            title={<Title type="experiment" name="이산화탄소" />}
          >
            {!data.includes(null) && (
              <Co2 s1={data[0]} s2={data[1]} s3={data[2]} />
            )}
          </Container>
        </Col>
        <Col lg={8}>
          <Container
            loading={loadingData}
            title={<Title type="frown" name="유해 가스" />}
          >
            {!data.includes(null) && (
              <Tvoc s1={data[0]} s2={data[1]} s3={data[2]} />
            )}
          </Container>
        </Col>
      </Row>
    </>
  );
};
export default connect(
  ({ firstsensor, secondsensor, thirdsensor }) => ({
    data: [firstsensor.data, secondsensor.data, thirdsensor.data],
    loadingData: [
      thirdsensor.loading.GET_DATA,
      thirdsensor.loading.GET_DATA,
      thirdsensor.loading.GET_DATA,
    ].includes(null),
  }),
  {
    getFirstSensor,
    getSecondSensor,
    getThirdSensor,
  },
)(OverviewPage);
