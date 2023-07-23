import { Button, Table, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  useDeleteDriver,
  useGetDriversList,
  useVerifyDriver,
} from "../../services/DriverService";
import { useMemo } from "react";

const STATUS = {
  ONLINE: true,
  OFFLINE: false,
};

const Drivers = () => {
  const { data: driversListData, isFetching } = useGetDriversList({});
  const { mutateAsync: deleteDriver, isLoading } = useDeleteDriver();
  const { mutateAsync: verifyDriver, isLoading: isVerifyDriverLoading } =
    useVerifyDriver();

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
        return (
          <Tag color={record.status === STATUS.ONLINE ? "green" : "default"}>
            {record.status === STATUS.ONLINE ? "ONLINE" : "OFFLINE"}
          </Tag>
        );
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
            <Tag color="blue" className="ms-1">
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

  return (
    <div className="mt-3">
      <div className="mb-3 fw-bold">All Drivers</div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 400 }}
        loading={isLoading || isFetching || isVerifyDriverLoading}
      />
    </div>
  );
};

export default Drivers;
