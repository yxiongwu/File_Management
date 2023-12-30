const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/readFileList", (req, res) => {
  const path = "./test";
  fs.readdir(path, (err, files) => {
    if (err) {
      res.send({
        code: 500,
        success: false,
        message: "服务异常",
      });
      return;
    }
    res.send({
      code: 0,
      data: files,
      success: true,
      message: "操作成功",
    });
  });
});

app.listen(port, () => {
  console.log("现在正在监听端口:" + port);
});
