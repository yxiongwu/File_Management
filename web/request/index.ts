import axios from "axios";
import { message } from "antd";

const http = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做一些处理，例如添加认证信息等
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    const { data } = response;
    // 对响应数据进行处理，例如提取有效数据等
    if (data.code === 0 && data.success) {
      return response.data;
    }
  },
  (error) => {
    const { msg } = error.response.data;
    message.error(msg);
    // 处理响应错误
    return Promise.reject(error);
  }
);

export default http;
