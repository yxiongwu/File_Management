import React, { useState } from "react";
import { Table, Input } from "antd";
import {
  FolderAddOutlined,
  FileOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import http from "./request";
import dayjs from "dayjs";

const App = () => {
  const [searchPath, setSearchPath] = useState("");

  const onSearch = (value?: string) => {
    http.get(`/file/fileList?path=${value || ""}`).then((res) => {
      setTableData(res.data);
    });
  };

  // 文件夹直接搜索
  const folderSearch = (record) => {
    const { absolutePath } = record;
    onSearch(absolutePath);
    setSearchPath(absolutePath);
  };

  const columns = [
    {
      title: "是否是文件夹",
      dataIndex: "isDirectory",
      key: "isDirectory",
      render: (value, record) =>
        value ? (
          <FolderAddOutlined
            onClick={() => folderSearch(record)}
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
      <Input
        placeholder="按Enter可搜索文件路径,例如:"
        onChange={(e) => {
          setSearchPath(e.target.value);
        }}
        value={searchPath}
        onKeyDown={(e) => {
          e.key === "Enter" && onSearch(searchPath);
        }}
        style={{ marginBottom: "20px" }}
      />
      <Table columns={columns} key="id" dataSource={tableData} />
    </div>
  );
};

export default App;
