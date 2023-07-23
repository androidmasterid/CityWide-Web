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
      title: "Name",
      dataIndex: "driverDetail",
      key: "driverDetail",
      width: "14%",
      render: (_, record) => {
        return <div>{record.driverDetail.alias}</div>;
      },
    },
    {
      width: "10%",
      title: "From location",
      dataIndex: "location",
      key: "location",
      render: (_, record) => {
        return (
          <div>
            {record.location.longitude}, {record.location.latitude}
          </div>
        );
      },
    },
    {
      width: "17%",
      title: "To location",
      dataIndex: "destinationLocation",
      key: "destinationLocation",
      render: (_, record) => {
        return (
          <div>
            {record.destinationLocation.longitude},{" "}
            {record.destinationLocation.latitude}
          </div>
        );
      },
    },
    {
      width: "17%",
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
      <div className="mb-3 fw-bold">Driver Bookings</div>
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
