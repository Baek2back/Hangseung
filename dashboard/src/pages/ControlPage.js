import React from "react";
import axios from "axios";
import { List, Avatar, Icon, Switch } from "antd";

const getLedStatus = async () => {
  try {
    return await axios.get(
      "http://localhost:7579/Mobius/gisa/cnt-sensor1/latest",
      {
        headers: {
          Accept: "application/json",
          "X-M2M-RI": 12345,
          "X-M2M-Origin": "SOrigin",
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
};

const ControlPage = () => {
  const onClick = () => {
    let body = JSON.stringify({
      "m2m:cin": {
        con: 1,
      },
    });
    axios
      .post("http://localhost:7579/Mobius/gisa/cnt-led-status?rcn=1", body, {
        headers: {
          Accept: "application/json",
          "X-M2M-RI": "12345",
          "X-M2M-Origin": "Sgisa",
          "Content-Type": "application/vnd.onem2m-res+json; ty=4",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  };
  const [status, setStatus] = React.useState("");
  React.useEffect(() => {
    const fetchStatus = async () => {
      const result = await getLedStatus();
      setStatus(result);
    };
    fetchStatus();
  }, []);

  const rooms = [
    {
      id: 0,
      name: "P405",
      description: "동국대학교 정보문화관",
      enabled: true,
      status: `${status ? 1 : 0}`,
    },
    {
      id: 1,
      name: "3182",
      description: "동국대학교 신공학관",
      enabled: false,
    },
    {
      id: 2,
      name: "3183",
      description: "동국대학교 신공학관",
      enabled: false,
    },
  ];

  console.log(rooms[0].status);
  return (
    <>
      <List
        size="large"
        dataSource={rooms}
        renderItem={(room) => (
          <List.Item key={room.id}>
            <List.Item.Meta
              avatar={
                <Avatar
                  size="large"
                  style={{ backgroundColor: "#00ff0000" }}
                  icon={<Icon type="home" />}
                />
              }
              title={room.name}
              description={room.description}
            />
            <Switch
              disabled={!room.enabled}
              defaultChecked={false}
              checked={room.status == 1 ? true : false}
              onClick={onClick}
            />
          </List.Item>
        )}
      ></List>
    </>
  );
};

export default ControlPage;
