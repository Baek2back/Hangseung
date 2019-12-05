import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import Title from "../components/Title";
import Container from "../components/Container";
import Header from "../components/Header";
import Co2 from "../components/charts/Co2";
import Humidity from "../components/charts/Humidity";
import Illumination from "../components/charts/Illumination";
import MoveDetection from "../components/charts/MoveDetection";
import Temperature from "../components/charts/Temperature";
import Tvoc from "../components/charts/Tvoc";

const OverviewPage = ({ data, loadingData }) => {
  console.log(data);
  return (
    <>
      <Header />
      <Row>
        <Col lg={8} style={styles.colStyle}>
          <Container
            loading={loadingData.includes(null)}
            title={<Title type="fire" name="온도" />}
          >
            {!data.includes(null) && <Temperature s1={data[0]} s2={data[1]} />}
          </Container>
        </Col>
        <Col lg={8} style={styles.colStyle}>
          <Container
            loading={loadingData.includes(null)}
            title={<Title type="cloud" name="습도" />}
          >
            {!data.includes(null) && <Humidity s1={data[0]} s2={data[1]} />}
          </Container>
        </Col>
        <Col lg={8} style={styles.colStyle}>
          <Container
            loading={loadingData.includes(null)}
            title={<Title type="bulb" name="조도" />}
          >
            {!data.includes(null) && <Illumination s1={data[0]} s2={data[1]} />}
          </Container>
        </Col>
      </Row>
      <Row>
        <Col lg={8} style={styles.colStyle}>
          <Container
            loading={loadingData.includes(null)}
            title={<Title type="team" name="재실 감지" />}
          >
            {!data.includes(null) && (
              <MoveDetection s1={data[0]} s2={data[1]} />
            )}
          </Container>
        </Col>
        <Col lg={8} style={styles.colStyle}>
          <Container
            loading={loadingData.includes(null)}
            title={<Title type="experiment" name="이산화탄소" />}
          >
            {!data.includes(null) && <Co2 s1={data[0]} s2={data[1]} />}
          </Container>
        </Col>
        <Col lg={8} style={styles.colStyle}>
          <Container
            loading={loadingData.includes(null)}
            title={<Title type="frown" name="유해 가스" />}
          >
            {!data.includes(null) && <Tvoc s1={data[0]} s2={data[1]} />}
          </Container>
        </Col>
      </Row>
    </>
  );
};

const styles = {
  colStyle: {
    display: "flex",
    justifyContent: "center",
  },
};
export default connect(({ firstsensor, secondsensor }) => ({
  data: [firstsensor.data, secondsensor.data],
  loadingData: [firstsensor.loading.GET_DATA, secondsensor.loading.GET_DATA],
}))(OverviewPage);
