import React, { useMemo } from "react";
import { Table, Tag } from "antd";
import { useGetBookingsList } from "../../../services/Booking";

const STATUS = {
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

const DriversBookings = () => {
  const { data: bookingList, isLoading } = useGetBookingsList();
  const data = useMemo(() => bookingList?.data?.data?.booking, [bookingList]);
  const columns = [
    {
      title: "User Name",
      dataIndex: "driverDetail",
      key: "driverDetail",
      width: "14%",
      render: (_, record) => {
        return <div>{record.driverDetail?.userName}</div>;
      },
    },
    {
      title: "Driver Name",
      dataIndex: "driverDetail",
      key: "driverDetail",
      width: "14%",
      render: (_, record) => {
        return <div>{record.driverDetail?.userName}</div>;
      },
    },
    {
      ellipsis: true,
      width: "17%",
      title: "Current Address",
      dataIndex: "currentAddress",
      key: "currentAddress",
    },
    {
      ellipsis: true,
      width: "17%",
      title: "Destination Address",
      dataIndex: "destinationAddress",
      key: "destinationAddress",
    },
    {
      width: "10%",
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return (
          <Tag color={record.status === STATUS.COMPLETED ? "green" : "red"}>
            {record.status === STATUS.COMPLETED ? "Completed" : "Cancelled"}
          </Tag>
        );
      },
    },
    {
      width: "12%",
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
    },
  ];

  return (
    <div className="mt-3">
      <div className="mb-3 fw-bold">User Bookings</div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 400 }}
        loading={isLoading}
      />
    </div>
  );
};

export default DriversBookings;
