const express = require("express");
const { searchFileData } = require("./app/index.js");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/file/fileList", async (req, res) => {
  try {
    const path = req.query.path;
    const status = await searchFileData(path || __dirname);
    res.send({
      code: 0,
      data: status,
      success: true,
      msg: "操作成功",
    });
  } catch (error) {
    res.status = 400;
    res.send({
      code: 400,
      success: false,
      data: error,
      msg: "无效路径",
    });
  }
});

app.listen(port, () => {
  console.log("现在正在监听端口:" + port);
});
