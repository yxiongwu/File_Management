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
      message: "操作成功",
    });
  } catch (error) {
    res.send({
      code: 500,
      success: false,
      message: error,
    });
  }
});

app.listen(port, () => {
  console.log("现在正在监听端口:" + port);
});
