import { Button, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDeleteUser, useGetUsersList } from "../../services/UserService";
import { useMemo } from "react";

const Users = () => {
  const { data: userList, isFetching } = useGetUsersList();
  const { mutateAsync: deleteUser, isLoading } = useDeleteUser();

  const data = useMemo(() => userList?.data?.data?.user, [userList]);

  const columns = [
    {
      title: "User Name",
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
      width: "16%",
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      width: "15%",
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
      width: "22%",
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      width: "8%",
      title: "Post office",
      dataIndex: "isPostOffice",
      key: "isPostOffice",
      render: (_, record) => (
        <span>
          {record.isPostOffice === true ? <div>True</div> : <div>False</div>}
        </span>
      ),
    },
    {
      width: "5%",
      title: "",
      key: "action",
      render: (_, record) => {
        return (
          <div
            className="d-flex"
            onClick={() => deleteUser(record._id, { isDelete: true })}
          >
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
        loading={isLoading || isFetching}
      />
    </div>
  );
};

export default Users;
