import { Button, Table, Tag } from "antd";
import {
  useGetDriversList,
  useVerifyDriver,
} from "../../services/DriverService";
import { useMemo } from "react";

const STATUS = {
  ONLINE: true,
  OFFLINE: false,
};

const ActiveDriversList = () => {
  const { data: driversListData, isFetching } = useGetDriversList({});
  const { mutateAsync: verifyDriver, isLoading: isVerifyDriverLoading } =
    useVerifyDriver();

  const data = useMemo(
    () => driversListData?.data?.data?.driver,
    [driversListData]
  );

  const filteredData = useMemo(
    () => data?.filter((ele) => ele.status === true),
    [data]
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      width: "14%",
      render: (text) => <span>{text}</span>,
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
    // {
    //   width: "18%",
    //   title: "",
    //   key: "action",
    //   render: (_, record) => {
    //     return (
    //       !record.isVerified && (
    //         <div
    //           className="d-flex"
    //           onClick={() =>
    //             verifyDriver({ driverId: record._id, isVerified: true })
    //           }
    //         >
    //           <Button type="link">Verify Ride</Button>
    //         </div>
    //       )
    //     );
    //   },
    // },
  ];

  return (
    <div className="mt-3">
      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ y: 400 }}
        loading={isFetching || isVerifyDriverLoading}
      />
    </div>
  );
};

export default ActiveDriversList;
