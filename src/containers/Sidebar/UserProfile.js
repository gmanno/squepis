import React from "react";
import { Popover } from "antd";
import { useAuth } from "../../authentication";
import { useHistory } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";

const UserProfile = () => {
  const { userSignOut, authUser } = useAuth();
  const history = useHistory();

  const onLogoutClick = () => {
    userSignOut(() => {
      history.push("/");
    });
  };

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>
        <IntlMessages id="sidebar.account" />
      </li>
      <li onClick={onLogoutClick}>Logout</li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <Popover
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <span className="gx-avatar-name">
          {authUser.name}
          <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
        </span>
      </Popover>
    </div>
  );
};

export default UserProfile;
