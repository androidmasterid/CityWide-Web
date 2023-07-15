import { Table, Tag } from "antd";

const data = [
  {
    key: "1",
    name: "John Brown",
    allias: "John",
    email: "John@gmail.com",
    country_code: "+91",
    mobile: "9393493493",
    status: 1,
    deck_no: 32,
    car_type: "CarVan",
    idle_time: 20,
  },
  {
    key: "2",
    name: "Jim Green",
    allias: "John",
    email: "John@gmail.com",
    country_code: "+91",
    mobile: "9393493493",
    status: 2,
    deck_no: 42,
    car_type: "Normal Car",
    idle_time: 30,
  },
  {
    key: "3",
    name: "Joe Black",
    allias: "John",
    email: "John@gmail.com",
    country_code: "+91",
    mobile: "9393493493",
    status: 1,
    deck_no: 32,
    car_type: "Normal Car",
    idle_time: 21,
  },
  {
    key: "3",
    name: "Joe Black",
    allias: "John",
    email: "John@gmail.com",
    country_code: "+91",
    mobile: "9393493493",
    status: 2,
    deck_no: 32,
    car_type: "Normal Car",
    idle_time: 21,
  },
  {
    key: "3",
    name: "Joe Black",
    allias: "John",
    email: "John@gmail.com",
    country_code: "+91",
    mobile: "9393493493",
    status: 1,
    deck_no: 32,
    car_type: "Normal Car",
    idle_time: 21,
  },
  {
    key: "3",
    name: "Joe Black",
    allias: "John",
    email: "John@gmail.com",
    country_code: "+91",
    mobile: "9393493493",
    status: 1,
    deck_no: 32,
    car_type: "Normal Car",
    idle_time: 21,
  },
  {
    key: "3",
    name: "Joe Black",
    allias: "John",
    email: "John@gmail.com",
    country_code: "+91",
    mobile: "9393493493",
    status: 1,
    deck_no: 32,
    car_type: "Normal Car",
    idle_time: 21,
  },
  {
    key: "3",
    name: "Joe Black",
    allias: "John",
    email: "John@gmail.com",
    country_code: "+91",
    mobile: "9393493493",
    status: 1,
    deck_no: 32,
    car_type: "Normal Car",
    idle_time: 21,
  },
  {
    key: "3",
    name: "Joe Black",
    allias: "John",
    email: "John@gmail.com",
    country_code: "+91",
    mobile: "9393493493",
    status: 1,
    deck_no: 32,
    car_type: "Normal Car",
    idle_time: 21,
  },
  {
    key: "3",
    name: "Joe Black",
    allias: "John",
    email: "John@gmail.com",
    country_code: "+91",
    mobile: "9393493493",
    status: 1,
    deck_no: 32,
    car_type: "Normal Car",
    idle_time: 21,
  },
];

const STATUS = {
  ONLINE: 1,
  OFFLINE: 2,
};

const ActiveDriversList = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "14%",
      render: (text) => <a>{text}</a>,
    },
    {
      width: "10%",
      title: "Allias",
      dataIndex: "allias",
      key: "allias",
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
      dataIndex: "car_type",
      key: "car_type",
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
      key: "action",
      render: () => {
        return (
          <div className="d-flex">
            <Tag color="green">Verify Driver</Tag>
            <Tag color="blue" className="ms-1">
              Assign Ride
            </Tag>
          </div>
        );
      },
    },
  ];

  return (
    <div className="mt-3">
      <Table columns={columns} dataSource={data} scroll={{ y: 400 }} />
    </div>
  );
};

export default ActiveDriversList;
