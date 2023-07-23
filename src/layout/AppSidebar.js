/* eslint-disable react-hooks/exhaustive-deps */
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  CarOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  DeliveredProcedureOutlined,
} from "@ant-design/icons";

import { ROOT_ROUTE, SIDEBAR_KEYS } from "../constants";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", SIDEBAR_KEYS.DASHBOARD, <PieChartOutlined />),
  getItem("Bookings", SIDEBAR_KEYS.DRIVERS_BOOKINGS, <DesktopOutlined />, [
    getItem("Driver Bookings", SIDEBAR_KEYS.DRIVERS_BOOKINGS),
    getItem("User Bookings", SIDEBAR_KEYS.USERS_BOOKINGS),
  ]),
  getItem("Drivers", SIDEBAR_KEYS.DRIVERS, <CarOutlined />),
  getItem("User", SIDEBAR_KEYS.USERS, <TeamOutlined />),
  getItem(
    "Assign a Ride",
    SIDEBAR_KEYS.ASSIGN_A_RIDE,
    <DeliveredProcedureOutlined />
  ),
  getItem("Settings", SIDEBAR_KEYS.SETTINGS, <SettingOutlined />),
  getItem("Master Data", SIDEBAR_KEYS.MASTER_DATA, <FileOutlined />, [
    getItem("Data 1", SIDEBAR_KEYS.MASTER_DATA),
    getItem("Data 2", SIDEBAR_KEYS.MASTER_DATA),
  ]),
  getItem("Role", SIDEBAR_KEYS.ROLE, <UserSwitchOutlined />),
];

const SIDEBAR_NAVIGATIONS = [
  SIDEBAR_KEYS.DASHBOARD,
  SIDEBAR_KEYS.DRIVERS_BOOKINGS,
  SIDEBAR_KEYS.USERS_BOOKINGS,
  SIDEBAR_KEYS.USERS,
  SIDEBAR_KEYS.DRIVERS,
  SIDEBAR_KEYS.ASSIGN_A_RIDE,
  SIDEBAR_KEYS.SETTINGS,
  SIDEBAR_KEYS.MASTER_DATA,
  SIDEBAR_KEYS.ROLE,
];

const AppSidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState([]);

  useEffect(() => {
    const activeIndex = SIDEBAR_NAVIGATIONS.findIndex((path) =>
      pathname.includes(path)
    );
    if (activeIndex > -1) {
      setActiveTab([SIDEBAR_NAVIGATIONS[activeIndex]]);
    } else {
      setActiveTab([SIDEBAR_KEYS.DASHBOARD]);
      navigate(ROOT_ROUTE.DASHBOARD);
    }
  }, [pathname]);

  return (
    <Layout>
      <Sider
        trigger={null}
        className="sidebar"
        theme="light"
        collapsible
        collapsed={collapsed}
      >
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={activeTab}
          defaultSelectedKeys={SIDEBAR_KEYS.DASHBOARD}
          onClick={(e) => navigate(e.key)}
          onSelect={(e) => {
            setActiveTab(e.selectedKeys);
            navigate(e.key);
          }}
        />
      </Sider>
    </Layout>
  );
};

export default AppSidebar;
