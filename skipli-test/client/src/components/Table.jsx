import React, { memo } from "react";

import { Avatar, Pagination, Table } from "antd";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";

const CTable = memo((props) => {
  const { handleClickLike, data, loading, user } = props;
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Login",
      dataIndex: "login",
      key: "login",
    },
    {
      title: "Avatar",
      dataIndex: "avatar_url",
      key: "avatar",
      render: (text) => {
        return <Avatar src={text} />
      }
    },
    {
      title: "URL",
      dataIndex: "html_url",
      key: "html_url",
    },
    {
      title: "Public repos",
      dataIndex: "public_repos",
      key: "public_repos",
    },
    {
      title: "Followers",
      dataIndex: "followers",
      key: "followers",
    },
    {
      title: "Like",
      dataIndex: "like",
      key: "like",
      align: "center",
      render: (text, record) => {
        const { id } = record;
        const { favorite_github_users } = user;
        const isLiked = favorite_github_users.find((i) => i === id);
        // console.log("favorite_github_users", favorite_github_users);

        return (
          <div
            onClick={() => handleClickLike(record)}
            className="cursor-pointer"
          >
            {isLiked ? (
              <HeartTwoTone twoToneColor="#eb2f96" />
            ) : (
              <HeartTwoTone twoToneColor="#828583" />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 11,
        }}
        onChange={(pagination) => {
          console.log("pagination", pagination);
        }}
        loading={loading}
      />
    </>
  );
});

export default CTable;
