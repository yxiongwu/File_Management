const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

function formatFileSize(size) {
  if (size < 1024) {
    return size + "B";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + "KB";
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + "MB";
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }
}

function getFileInfo(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        const extname = path.extname(filePath);
        const type = extname ? extname.slice(1) : "directory";
        resolve({
          key: uuidv4(),
          name: path.basename(filePath),
          size: formatFileSize(stats.size),
          type,
          isDirectory: stats.isDirectory(),
          absolutePath: stats.isDirectory() ? path.resolve(filePath) : null,
          mtime: stats.mtime.getTime(),
        });
      }
    });
  });
}

async function searchFileData(dirPath) {
  const files = await fs.promises.readdir(dirPath);
  const fileData = [];

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const fileInfo = await getFileInfo(filePath);
    fileData.push(fileInfo);
  }
  return fileData;
}

module.exports = {
  getFileInfo,
  searchFileData,
};
