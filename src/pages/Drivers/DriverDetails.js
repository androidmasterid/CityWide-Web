import { Button, Col, Form, Input, Row, Spin } from "antd";
import TopBar from "../../common-components/TopBar";
import Footer from "../../common-components/Footer";
import { useMemo, useState } from "react";
import {
  useGetDriverDetail,
  // useUpdateDriver,
} from "../../services/DriverService";
import { useParams } from "react-router";

const DriverDetails = () => {
  const { driverId } = useParams();
  const [isEditable, setIsEditable] = useState(true);
  const { data: driverDetail, isLoading } = useGetDriverDetail(driverId);
  const data = useMemo(() => driverDetail?.data?.data?.driver, [driverDetail]);

  // const [name, setName] = useState(data?.userName);
  // const [alias, setAlias] = useState(data?.alias);
  // const [email, setEmail] = useState(data?.email);
  // const [serviceType, setServiceType] = useState(data?.serviceType);

  // const { mutateAsync: updateDriver } = useUpdateDriver(driverId);

  // const handleSaveDriverDetail = () => {
  //   const payload = {
  //     userName: name,
  //     email: email,
  //     alias: alias,
  //     serviceType: serviceType,
  //   };
  //   updateDriver(payload);
  // };

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
          <div className="fw-bold">Driver Details</div>
          <Button type="primary" onClick={() => setIsEditable(false)} ghost>
            Edit
          </Button>
        </div>
      </TopBar>
      <div className="card">
        <Form>
          <Row className="justify-content-center">
            <Col span={10}>
              <Form.Item
                label="Name"
                required
                tooltip="This is a required field"
              >
                <Input
                  placeholder="Enter Name"
                  disabled={isEditable}
                  value={data?.userName}
                  // onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Alias" className="ms-3">
                <Input
                  placeholder="Enter Alias"
                  disabled={isEditable}
                  value={data?.alias}
                  // onChange={(e) => setAlias(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col span={10}>
              <Form.Item label="Email" required>
                <Input
                  placeholder="Enter Email"
                  type="email"
                  disabled={isEditable}
                  value={data?.email}
                  // onChange={(e) => setEmail(e.target.email)}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="phone"
                label="Mobile"
                className="ms-3"
                rules={[
                  { required: true, message: "Please input your mobile!" },
                ]}
              >
                <Input
                  addonBefore="+91"
                  disabled={isEditable}
                  value={data?.mobile}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col span={10}>
              <Form.Item label="Service Type" required>
                <Input
                  placeholder="Enter service type"
                  disabled={isEditable}
                  value={data?.serviceType}
                  // onChange={(e) => setServiceType(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={10}></Col>
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

export default DriverDetails;
