const express = require("express");
const { searchFileData } = require("./app/index.js");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/file/fileList", async (req, res, next) => {
  try {
    const path = req.query.path;
    const status = await searchFileData(path);
    res.send({
      code: 0,
      data: status,
      success: true,
      msg: "操作成功",
    });
  } catch (error) {
    next("检索失败,请检查文件路径是否正确");
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  // 设置状态码为 500
  if (err) {
    res.status(500);
    res.setHeader("Content-Type", "application/json");
    // 返回自定义的错误响应给客户端
    res.json({
      code: 500,
      msg: err,
      success: false,
    });
  }
});

app.listen(port, () => {
  console.log("现在正在监听端口:" + port);
});
