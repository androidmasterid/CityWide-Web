/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Dropdown, theme } from "antd";
import { Header } from "antd/es/layout/layout";

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Logo from "../assets/icons/logo";
import { useMemo } from "react";
import { useIsLoggedIn } from "../stores/useIsLoggedIn";

const { useToken } = theme;

const AppHeader = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorPrimary },
  } = useToken();
  const { setIsLoggedIn } = useIsLoggedIn();

  const userItems = useMemo(() => {
    return [
      {
        key: "1",
        label: "Logout",
        onClick: () => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        },
      },
    ];
  }, []);

  return (
    <Header className="header">
      <div>
        <Button
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined style={{ color: colorPrimary }} />
            ) : (
              <MenuFoldOutlined style={{ color: colorPrimary }} />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: "16px" }}
        />
        <Logo width="120px" height="30px" className="ms-2" />
      </div>
      <Dropdown
        menu={{ items: userItems }}
        trigger={["click"]}
        placement="topLeft"
      >
        <div>
          <Avatar
            style={{ verticalAlign: "middle", cursor: "pointer" }}
            size="large"
          >
            A
          </Avatar>
        </div>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
