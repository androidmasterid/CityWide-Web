import { Button, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetUsersList } from "../../services/UserService";
import { useMemo } from "react";

const Users = () => {
  const { data: userList, isLoading } = useGetUsersList();
  const data = useMemo(() => userList?.data?.data?.user, [userList]);

  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      width: "14%",
      render: (text, record) => (
        <Link to={`/users/${record._id}`}>
          <Button type="link">{text}</Button>
        </Link>
      ),
    },
    {
      width: "10%",
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      width: "17%",
      title: "T and C",
      dataIndex: "isTandC",
      key: "isTandC",
      render: (_, record) => (
        <span>{record.isTandC === true ? <div>Yes</div> : <div>No</div>}</span>
      ),
    },
    {
      width: "17%",
      title: "Post office",
      dataIndex: "isPostOffice",
      key: "isPostOffice",
      render: (_, record) => (
        <span>
          {record.isPostOffice === true ? <div>Yes</div> : <div>No</div>}
        </span>
      ),
    },
    {
      width: "12%",
      title: "Post office number",
      dataIndex: "postOfficeNumber",
      key: "postOfficeNumber",
      render: (_, record) => (
        <span>
          {record.postOfficeNumber ? (
            <div>{record.postOfficeNumber}</div>
          ) : (
            <div>NA</div>
          )}
        </span>
      ),
    },
    {
      width: "10%",
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
    },
    {
      width: "5%",
      title: "",
      key: "action",
      render: () => {
        return (
          <div className="d-flex">
            <DeleteOutlined style={{ cursor: "pointer" }} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="mt-3">
      <div className="mb-3 fw-bold">All Users</div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 400 }}
        loading={isLoading}
      />
    </div>
  );
};

export default Users;
