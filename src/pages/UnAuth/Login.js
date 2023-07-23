import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import Logo from "../../assets/icons/logo";
import { useIsLoggedIn } from "../../stores/useIsLoggedIn";
import { useLogin } from "../../services/LoginService";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const { mutateAsync: triggerLogin, isLoading } = useLogin(loginDetails);

  const handleLogin = () => {
    triggerLogin(loginDetails).then((res) => onFinish(res));
  };

  const { setIsLoggedIn } = useIsLoggedIn();

  const onFinish = (values) => {
    localStorage.setItem("token", values.data.data.token);
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target || {};
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Row className="login">
      <Col span={8} className="left-portion">
        <div className="inner-left shadow-lg">
          <Logo width="70%" />
        </div>
      </Col>
      <Col span={16} className="right-portion">
        <div className="inner-right shadow-lg">
          <Form
            className="login-form"
            // onFinish={onFinish}
            initialValues={{
              remember: true,
            }}
          >
            <div className="text-center mb-3 fs-5 fw-bold">Login</div>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                name="email"
                type="email"
                placeholder="Enter your email!"
                value={loginDetails.email}
                onChange={handleDetailsChange}
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={loginDetails.email}
                onChange={handleDetailsChange}
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item> */}
            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={!loginDetails.email || !loginDetails.password}
                onClick={handleLogin}
                loading={isLoading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
