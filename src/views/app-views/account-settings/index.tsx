import React, { Component } from "react";
import {
  UserOutlined,
  LockOutlined,
  CreditCardOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import InnerAppLayout from "layouts/inner-app-layout";
import ChangePassword from "./ChangePassword";
import Billing from "./Billing";
import Notification from "./Notification";
import IntlMessage from "components/util-components/IntlMessage";
import { useSelector } from "react-redux";
import { IState } from "redux/reducers";
import Loading from "components/shared-components/Loading";

interface ISettingOption {
  match?: any;
  location?: any;
  children?: any;
}

const SettingOption = ({ match, location }: ISettingOption) => {
  return (
    <Menu
      defaultSelectedKeys={[`${match.url}/edit-profile`]}
      mode="inline"
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key={`${match.url}/change-password`}>
        <LockOutlined />
        <span>
          <IntlMessage id={"account.sidenav.ChangePassword"} />
        </span>
        <Link to={"change-password"} />
      </Menu.Item>
      <Menu.Item key={`${match.url}/billing`}>
        <CreditCardOutlined />
        <span>
          <IntlMessage id={"account.sidenav.Billing"} />
        </span>
        <Link to={`billing`} />
      </Menu.Item>
      <Menu.Item key={`${match.url}/notification`}>
        <BellOutlined />
        <span>
          <IntlMessage id={"account.sidenav.Notification"} />
        </span>
        <Link to={`notification`} />
      </Menu.Item>
    </Menu>
  );
};

const SettingContent = ({ match }: ISettingOption) => {
  const loading = useSelector((state: IState) => state.auth?.loading);
  if (loading) return <Loading />;
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/change-password`}
      />
      <Route path={`${match.url}/change-password`} component={ChangePassword} />
      <Route path={`${match.url}/billing`} component={Billing} />
      <Route path={`${match.url}/notification`} component={Notification} />
    </Switch>
  );
};

class Setting extends Component {
  render() {
    return (
      <InnerAppLayout
        sideContentWidth={320}
        sideContent={<SettingOption {...this.props} />}
        mainContent={<SettingContent {...this.props} />}
      />
    );
  }
}

export default Setting;
