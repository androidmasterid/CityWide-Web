import { Button, Modal, Select, Table, Tag, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  useAssignRide,
  useDeleteDriver,
  useGetDriversList,
  useVerifyDriver,
} from "../../services/DriverService";
import { useMemo, useState } from "react";
import { useGetUserLocation } from "../../services/UserService";
import useDebounce from "../../hooks/useDebounce";

const STATUS = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
  OCCUPIED: "OCCUPIED",
};

const STATUS_COLOR = {
  [STATUS.ONLINE]: "green",
  [STATUS.OFFLINE]: "red",
  [STATUS.OCCUPIED]: "orange",
};

const SearchAddress = ({
  selectedlocationValue,
  setSelectedLocationValue,
  setLocationDetails,
  isFromLoc = true,
}) => {
  const [search, setSearch] = useState("");

  const debouncedValue = useDebounce(search);

  const { data: locationData = [], isFetching } = useGetUserLocation(
    { search: debouncedValue },
    { enabled: !!debouncedValue }
  );

  return (
    <Select
      showSearch
      className="w-100"
      placeholder="Search"
      loading={isFetching}
      optionFilterProp="children"
      value={selectedlocationValue}
      onSelect={(e) => console.log(e)}
      onSearch={(value) => setSearch(value)}
      onChange={(value) => {
        setSelectedLocationValue(value);
        const selectedlocationOption = locationData?.data?.data.find(
          (option) => option.place_id === value
        );
        setLocationDetails((prev) => ({
          ...prev,
          ...(isFromLoc
            ? { from: selectedlocationOption }
            : { to: selectedlocationOption }),
        }));
      }}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={locationData?.data?.data?.map((locObj) => ({
        label: locObj.description,
        value: locObj.place_id,
      }))}
    />
  );
};

const Drivers = () => {
  const [showAssignRideModal, setShowAssignRideModal] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState(undefined);
  const [selectedTolocation, setSelectedToLocation] = useState(undefined);
  const [selectedFromlocation, setSelectedFromLocation] = useState(undefined);
  const [currentDetails, setCurrentDetails] = useState({});
  const [locationDetails, setLocationDetails] = useState({ from: {}, to: {} });

  const { data: driversListData, isFetching } = useGetDriversList({});
  const { mutateAsync: deleteDriver, isLoading } = useDeleteDriver();
  const { mutateAsync: verifyDriver, isLoading: isVerifyDriverLoading } =
    useVerifyDriver();
  const { mutateAsync: assignRide, isLoading: assignRideLoading } =
    useAssignRide();

  const data = useMemo(
    () => driversListData?.data?.data?.driver,
    [driversListData]
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      width: "14%",
      render: (text, record) => (
        <Link to={`/drivers/${record._id}`}>
          <Button type="link">{text}</Button>
        </Link>
      ),
    },
    {
      width: "10%",
      title: "Alias",
      dataIndex: "alias",
      key: "alias",
    },
    {
      width: "17%",
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      width: "17%",
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      render: (_, record) => (
        <span>
          {record.country_code} {record.mobile}
        </span>
      ),
    },
    {
      width: "12%",
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
    },
    {
      width: "10%",
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, record) => {
        return <Tag color={STATUS_COLOR[record.status]}>{record.status}</Tag>;
      },
    },
    {
      width: "18%",
      title: "",
      align: "right",
      key: "action",
      render: (_, record) => {
        return (
          <div className="d-flex align-items-center justify-content-end">
            {!record.isVerified && (
              <Button
                type="link"
                onClick={() =>
                  verifyDriver({ driverId: record._id, isVerified: true })
                }
              >
                Verify Driver
              </Button>
            )}
            <Tag
              color="blue"
              className="ms-1"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowAssignRideModal(true);
                setCurrentDetails(record);
              }}
            >
              Assign Ride
            </Tag>
            <DeleteOutlined
              className="me-2"
              style={{ cursor: "pointer" }}
              onClick={() => deleteDriver(record._id, { isDelete: true })}
            />
          </div>
        );
      },
    },
  ];

  const handleSelectChange = (selectedOption) => {
    setSelectedServiceType(selectedOption);
  };

  const serviceTypeOptions = [
    {
      value: "suv",
      label: "SUV",
    },
    {
      value: "sedan",
      label: "Sedan",
    },
  ];

  const handleOnClose = () => {
    setShowAssignRideModal(false);
    setSelectedServiceType(undefined);
    setSelectedToLocation(undefined);
    setSelectedFromLocation(undefined);
    setCurrentDetails({});
  };

  return (
    <div className="mt-3">
      <div className="mb-3 fw-bold">All Drivers</div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 400 }}
        loading={isLoading || isFetching || isVerifyDriverLoading}
      />
      <Modal
        okText="Submit"
        cancelText="close"
        title="Assign Ride"
        okButtonProps={{
          disabled:
            !selectedServiceType ||
            !selectedFromlocation ||
            !selectedTolocation,
        }}
        open={showAssignRideModal}
        onOk={() => {
          const { user: userId, _id: driverId } = currentDetails || {};
          const { to, from } = locationDetails || {};

          const payload = {
            userId,
            driverId,
            price: "0",
            currentAddress: selectedFromlocation,
            destinationAddress: selectedTolocation,
            serviceType: selectedServiceType,
            distance: "0",
            radius: 0,
            currentLocation: {
              longitude: from?.location?.long,
              latitude: from?.location?.lat,
            },
            destinationLocation: {
              longitude: to?.location?.long,
              latitude: to?.location?.lat,
            },
          };

          assignRide(payload)
            .then(() => {
              handleOnClose();
              message.success("Ride assigned successfully!");
            })
            .catch((err) => {
              message.error(err?.response?.data?.message);
            });
        }}
        confirmLoading={assignRideLoading}
        onCancel={handleOnClose}
      >
        <div className="fw-medium mb-2">Service Type</div>
        <Select
          className="w-100 mb-2"
          defaultValue="Select service type"
          value={selectedServiceType}
          onChange={handleSelectChange}
          options={serviceTypeOptions}
        />
        <div className="fw-medium mb-2">From Address</div>
        <SearchAddress
          setLocationDetails={setLocationDetails}
          selectedlocationValue={selectedFromlocation}
          setSelectedLocationValue={setSelectedFromLocation}
        />
        <div className="fw-medium mt-2 mb-2">To Address</div>
        <SearchAddress
          isFromLoc={false}
          setLocationDetails={setLocationDetails}
          selectedlocationValue={selectedTolocation}
          setSelectedLocationValue={setSelectedToLocation}
        />
      </Modal>
    </div>
  );
};

export default Drivers;
