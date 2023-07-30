import { useParams } from "react-router";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Upload,
  message,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import TopBar from "../../common-components/TopBar";
import Footer from "../../common-components/Footer";
import {
  useGetDriverDetail,
  useUpdateDriver,
} from "../../services/DriverService";
import { areObjectsEqual } from "../../utils/helpers";

const DriverDetails = () => {
  const { driverId } = useParams();
  const [isEditable, setIsEditable] = useState(true);
  const [driverDetails, setDriverDetails] = useState({
    userName: "",
    email: "",
    profileImage: "",
    address: "",
    alias: "",
    gender: "",
    serviceType: "",
    model: "",
    brand: "",
    deckNumber: "",
    numberPlate: "",
    color: "",
    licenseNumber: "",
    isVerified: true,
    mobile: "",
  });

  const {
    data: driverDetail,
    isLoading,
    isFetching,
  } = useGetDriverDetail(driverId);
  const { mutateAsync: updateDriver, isLoading: updateDriverLoading } =
    useUpdateDriver(driverId);

  const data = useMemo(() => driverDetail?.data?.data?.driver, [driverDetail]);

  useEffect(() => {
    if (!data) return;

    const {
      userName,
      email,
      address,
      alias,
      serviceType,
      model,
      brand,
      deckNumber,
      numberPlate,
      color,
      licenseNumber,
      isVerified,
      mobile,
    } = data || {};

    setDriverDetails((prev) => ({
      ...prev,
      userName,
      email,
      address,
      alias,
      serviceType,
      model,
      brand,
      deckNumber,
      numberPlate,
      color,
      licenseNumber,
      isVerified,
      mobile,
    }));
  }, [data]);

  const handleFieldsChange = (event) => {
    const { value, name } = event.target || {};

    setDriverDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDriverDetail = () => {
    updateDriver(driverDetails)
      .then(() => {
        message.success("Driver details updated successfully!");
      })
      .catch((err) => {
        message.error(err?.response?.data?.message);
      });
  };

  if (isLoading || isFetching)
    return (
      <div
        className="d-flex align-center justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <Spin size="large" />
      </div>
    );

  return (
    <>
      <TopBar>
        <div className="d-flex align-center justify-content-between">
          <div className="fw-bold">Driver Details</div>
          <Button type="primary" onClick={() => setIsEditable(false)} ghost>
            Edit
          </Button>
        </div>
      </TopBar>
      <div className="driver-details">
        <div className="card">
          <Form>
            <div className="fw-bold mb-4">Image</div>
            <Row>
              <Col span={12}>
                <Upload
                  name="licence"
                  listType="picture-card"
                  className="w-100 upload mb-2"
                  showUploadList={false}
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={(e) => console.log(e)}
                  onChange={(e) => console.log(e)}
                >
                  <div className="w-100">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload Lisence</div>
                  </div>
                </Upload>
              </Col>
              <Col span={12}>
                <Upload
                  name="licence"
                  listType="picture-card"
                  className="w-100 upload mb-2 ps-3"
                  showUploadList={false}
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={(e) => console.log(e)}
                  onChange={(e) => console.log(e)}
                >
                  <div className="w-100">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload Profile Image</div>
                  </div>
                </Upload>
              </Col>
            </Row>
            <div className="fw-bold mb-4">Driver Info</div>
            <Row className="justify-content-center">
              <Col span={12}>
                <Form.Item label="Name" required>
                  <Input
                    name="userName"
                    size="large"
                    placeholder="Enter Name"
                    disabled={isEditable}
                    value={driverDetails.userName}
                    onChange={handleFieldsChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Alias" className="ms-3">
                  <Input
                    name="alias"
                    size="large"
                    placeholder="Enter Alias"
                    disabled={isEditable}
                    value={driverDetails.alias}
                    onChange={handleFieldsChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col span={12}>
                <Form.Item label="Email" required>
                  <Input
                    disabled
                    size="large"
                    type="email"
                    name="email"
                    value={data?.email}
                    placeholder="Enter Email"
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
                    disabled
                    name="mobile"
                    size="large"
                    addonBefore={`${data?.countryCode} ${data?.mobile}`}
                    value={`${data?.mobile}`}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col span={12}>
                <Form.Item label="Address" required>
                  <Input
                    size="large"
                    name="address"
                    disabled={isEditable}
                    placeholder="Enter Address"
                    value={driverDetails.address}
                    onChange={handleFieldsChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Licence Number" required className="ms-3">
                  <Input
                    size="large"
                    name="licenseNumber"
                    disabled={isEditable}
                    placeholder="Enter Licence Number"
                    value={driverDetails.licenseNumber}
                    onChange={handleFieldsChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="fw-bold mb-4">Vehicle Details</div>
            <Row className="justify-content-center">
              <Col span={12}>
                <Form.Item label="Brand" required>
                  <Input
                    size="large"
                    name="brand"
                    disabled={isEditable}
                    placeholder="Enter Brand"
                    value={driverDetails.brand}
                    onChange={handleFieldsChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Form.Item label="Model Number" required className="m-0 ms-3">
                    <Input
                      size="large"
                      name="model"
                      disabled={isEditable}
                      placeholder="Enter Model"
                      value={driverDetails.model}
                      onChange={handleFieldsChange}
                    />
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col span={12}>
                <Form.Item label="Deck Number" required>
                  <Input
                    size="large"
                    name="deckNumber"
                    disabled={isEditable}
                    placeholder="Enter Deck Number"
                    value={driverDetails.deckNumber}
                    onChange={handleFieldsChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Vehicle Number Plate"
                  required
                  className="ms-3"
                >
                  <Input
                    size="large"
                    name="numberPlate"
                    disabled={isEditable}
                    placeholder="Enter Vehicle Number Plate"
                    value={driverDetails.numberPlate}
                    onChange={handleFieldsChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="Service Type" required className="m-0">
                  <Select
                    disabled={isEditable}
                    className="w-100 mb-2"
                    defaultValue="Select service type"
                    value={driverDetails.serviceType}
                    onChange={(value) =>
                      setDriverDetails((prev) => ({
                        ...prev,
                        serviceType: value,
                      }))
                    }
                    options={[
                      {
                        value: "suv",
                        label: "SUV",
                      },
                      {
                        value: "sedan",
                        label: "Sedan",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
          </Form>
        </div>
      </div>
      <Footer>
        <div className="d-flex align-center justify-content-end">
          <Button
            type="primary"
            size="medium"
            disabled={isEditable}
            loading={updateDriverLoading}
            onClick={handleSaveDriverDetail}
          >
            Save
          </Button>
        </div>
      </Footer>
    </>
  );
};

export default DriverDetails;
