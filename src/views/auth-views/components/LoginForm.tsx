import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { GoogleSVG, FacebookSVG } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import {
  showLoading,
  showAuthMessage,
  hideAuthMessage,
  authenticated,
  authorizeUser,
} from "redux/actions/Auth";
import { getProfileInfo, updateSettings } from "redux/actions/Account";
import { motion } from "framer-motion";
import { NavLink, useHistory } from "react-router-dom";
import { hideLoading } from "redux/actions/Auth";
import IntlMessage from "components/util-components/IntlMessage";
import { IState } from "redux/reducers";
import { IAuth } from "redux/reducers/Auth";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import Utils from "utils";
import { EnErrorCode } from "api";
import { API_PUBLIC_KEY } from "constants/ApiConstant";

type OnLogin = { email: string; password: string };
const LoginForm = ({
  showForgetPassword,
  hideAuthMessage,
  onForgetPasswordClick,
  showLoading,
  extra,
  loading,
  showMessage,
  message,
  authorizeUser,
  isAuth,
  redirect,
}: any) => {
  const history = useHistory();
  const onLogin = ({ email, password }: OnLogin) => {
    showLoading();
    setTimeout(async () => {
      const response = await authorizeUser(
        email,
        Utils.encryptInput(password, API_PUBLIC_KEY)
      );
    }, 1000);
  };

  useEffect(() => {
    if (isAuth) history.push(redirect);
  }, [isAuth]);
  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  }, [showMessage]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message} />
      </motion.div>
      <Form layout="vertical" name="login-form" onFinish={onLogin}>
        <Form.Item
          name="email"
          label={<IntlMessage id={"auth.Email"} />}
          rules={[
            {
              required: true,
              message: <IntlMessage id={"auth.MessageInsertEmail"} />,
            },
            {
              type: "email",
              message: <IntlMessage id={"auth.MessageInsertValidEmail"} />,
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div
              className={`${
                showForgetPassword
                  ? "d-flex justify-content-between w-100 align-items-center"
                  : ""
              }`}
            >
              <span>
                <IntlMessage id={"auth.Password"} />
              </span>
              {showForgetPassword && (
                <span
                  onClick={() => onForgetPasswordClick}
                  className="cursor-pointer font-size-sm font-weight-normal text-muted"
                >
                  Forget Password?
                </span>
              )}
            </div>
          }
          rules={[
            {
              required: true,
              message: <IntlMessage id={"auth.MessageInsertPassword"} />,
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {" "}
            <IntlMessage id={"auth.SignIn"} />
          </Button>
        </Form.Item>
        <NavLink to={"/auth/forgot-password"} className={"text-right"}>
          <IntlMessage id={"auth.ForgotPassword"} />
        </NavLink>
        {/*{otherSignIn ? renderOtherSignIn : null}*/}
        {extra}
      </Form>
    </>
  );
};

const mapStateToProps = ({ auth }: IState) => {
  const {
    loading,
    message,
    showMessage,
    redirect,
    userActivated,
    isAuth,
  } = auth as IAuth;
  return {
    loading,
    isAuth,
    message,
    showMessage,
    redirect,
    userActivated,
  };
};

const mapDispatchToProps = {
  showAuthMessage,
  authorizeUser,
  showLoading,
  hideAuthMessage,
  authenticated,
  updateSettings,
  hideLoading,
  getProfileInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
