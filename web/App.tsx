import React, { useState } from "react";
import { Table, Input } from "antd";
import { FolderAddOutlined, FileOutlined } from "@ant-design/icons";
import http from "./request";
import dayjs from "dayjs";

const Search = Input.Search;

const App = () => {
  const onSearch = (value) => {
    http.get(`/file/fileList?path=${value}`).then((res) => {
      setTableData(res.data);
    });
  };

  const columns = [
    {
      title: "是否是文件夹",
      dataIndex: "isDirectory",
      key: "isDirectory",
      render: (value) =>
        value ? (
          <FolderAddOutlined
            style={{ fontSize: 25, color: "rgb(5, 144, 223)" }}
          />
        ) : (
          <FileOutlined style={{ fontSize: 25, color: "rgb(84, 195, 241)" }} />
        ),
    },
    {
      title: "文件名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "最新更新时间",
      dataIndex: "mtime",
      key: "mtime",
      render: (value) => dayjs(value).format("YYYY-MM-DD HH:ss:mm"),
    },
    {
      title: "文件类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "文件大小",
      dataIndex: "size",
      key: "size",
    },
  ];

  const [tableData, setTableData] = useState([]);

  return (
    <div>
      <Search
        placeholder="搜索文件路径,例如:"
        onSearch={onSearch}
        style={{ marginBottom: "20px" }}
      />
      <Table columns={columns} key="id" dataSource={tableData} />
    </div>
  );
};

export default App;
