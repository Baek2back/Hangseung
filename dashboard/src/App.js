import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import OverviewPage from "./pages/OverviewPage";
import ControlPage from "./pages/ControlPage";

const { Header, Content } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <Menu
            // 완성됬을 때, dark or light 중에 잘 어울리는 것으로 하자.
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="0" disabled>
              <Icon type="robot" />
            </Menu.Item>
            <Menu.Item key="1">
              <Link to="/overview">
                <Icon type="wifi" />
                센서 데이터
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/control">
                <Icon type="poweroff" />
                전원 제어
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Route exact path="/" component={OverviewPage} />
          <Route path="/overview" component={OverviewPage} />
          <Route path="/control" component={ControlPage} />
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
