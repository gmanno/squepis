import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  let { navStyle, themeType } = useSelector(({ settings }) => settings);
  let { pathname } = useSelector(({ common }) => common);

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];
  return (
    <>
      <SidebarLogo
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >
          <UserProfile />
          <AppsNavigation />
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            <Menu.Item key="home">
              <Link to="/home">
                <i className="icon icon-widgets" />
                <span>
                  <IntlMessages id="sidebar.dashboard" />
                </span>
              </Link>
            </Menu.Item>

            <Menu.Item key="clients">
              <Link to="/clients">
                <i className="icon icon-user-o" />
                <span>
                  <IntlMessages id="sidebar.clients" />
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="services">
              <Link to="/services">
                <i className="icon icon-extra-components" />
                <span>
                  <IntlMessages id="sidebar.services" />
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="vehicles_categories">
              <Link to="/vehicles_categories">
                <i className="icon icon-map-clustering" />
                <span>
                  <IntlMessages id="sidebar.vehicles_categories" />
                </span>
              </Link>
            </Menu.Item>

            <Menu.Item key="scheduling">
              <Link to="/scheduling">
                <i className="icon icon-hotel-booking" />
                <span>
                  <IntlMessages id="sidebar.scheduling" />
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="scheduling_status">
              <Link to="/scheduling_status">
                <i className="icon icon-icon" />
                <span>
                  <IntlMessages id="sidebar.scheduling_status" />
                </span>
              </Link>
            </Menu.Item>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;
