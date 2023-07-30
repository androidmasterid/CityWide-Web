import { Button, Col, Form, Input, Row, Spin } from "antd";
import TopBar from "../../common-components/TopBar";
import Footer from "../../common-components/Footer";
import { useMemo, useState } from "react";
import { useGetUserDetail } from "../../services/UserService";
import { useParams } from "react-router";

const UserDetails = () => {
  const { userId } = useParams();
  const [isEditable, setIsEditable] = useState(true);

  const { data: userDetail, isLoading } = useGetUserDetail(userId);
  const data = useMemo(() => userDetail?.data?.data?.user, [userDetail]);

  if (isLoading)
    return (
      <div
        className="d-flex align-center justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <Spin size="large" />
      </div>
    );

  return (
    <div>
      <TopBar>
        <div className="d-flex align-center justify-content-between">
          <div className="fw-bold">User Details</div>
          <Button type="primary" onClick={() => setIsEditable(false)} ghost>
            Edit
          </Button>
        </div>
      </TopBar>
      <div className="card">
        <Form>
          <Row className="justify-content-center">
            <Col span={12}>
              <Form.Item
                label="Name"
                required
                tooltip="This is a required field"
              >
                <Input
                  size="large"
                  placeholder="Enter Name"
                  disabled={isEditable}
                  value={data?.userName}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Address" className="ms-3">
                <Input
                  size="large"
                  placeholder="Enter Address"
                  disabled={isEditable}
                  value={data?.address}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col span={12}>
              <Form.Item label="Email" required>
                <Input
                  size="large"
                  placeholder="Enter Email"
                  type="email"
                  disabled={isEditable}
                  value={data?.email}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Mobile"
                className="ms-3"
                rules={[
                  { required: true, message: "Please input your mobile!" },
                ]}
              >
                <Input
                  size="large"
                  addonBefore="+91"
                  disabled={isEditable}
                  value={data?.mobile}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col span={12}>
              <Form.Item label="Role" required>
                <Input
                  size="large"
                  placeholder="Enter role"
                  disabled={isEditable}
                  value={data?.role}
                />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>
        </Form>
      </div>
      <Footer>
        <div className="d-flex align-center justify-content-end">
          <Button type="primary" size="medium">
            Save
          </Button>
        </div>
      </Footer>
    </div>
  );
};

export default UserDetails;
