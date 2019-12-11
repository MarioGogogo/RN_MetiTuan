import axios from "axios";
import {Actions, Scene, Router} from 'react-native-router-flux'
// qs 是一个增加了一些安全性的查询字符串解析和序列化字符串的库。
import qs from "qs";

// 在config.js文件中统一存放一些公共常量，方便之后维护
import { baseURL } from "./config.js";

axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded"
};

axios.defaults.withCredentials = true;
// 添加请求拦截器，在发送请求之前做些什么
axios.interceptors.request.use(
  function(config) {
    // 显示loading
    if (config.method === "post" || config.method === "get") {
      if (false) {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `bbs ${$token}`;
      }
    }
    return config;
  },
  function(error) {
    // 请求错误时弹框提示，或做些其他事
    return Promise.reject(error);
  }
);

// 添加响应拦截器(**具体查看axios文档**)----------------------------------------------------------------
axios.interceptors.response.use(
  function(response) {
    console.log("response.data", response);
    if (response.data.code === 10010 || response.data.code === 10011) {
      //delete("userToken"); // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
      console.log('123')
      Actions.profile()
      console.log('456')

    }
    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    console.log('对响应错误做点什么')
    return Promise.reject(error);
  }
);

// 封装数据返回失败提示函数---------------------------------------------------------------------------
function errorState(response) {
  // 隐藏loading
  // 如果http状态码正常，则直接返回数据
  if (
    response &&
    (response.status === 200 ||
      response.status === 304 ||
      response.status === 400)
  ) {
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response;
  } else {
    console.log("数据获取错误");
  }
}

// 封装数据返回成功提示函数---------------------------------------------------------------------------
function successState(res) {
  // 隐藏loading
  // 统一判断后端返回的错误码(错误码与后台协商而定)
  if (res.success) {
    return res;
  }
}

// 封装axios--------------------------------------------------------------------------------------
function apiAxios(method, url, params) {
  let httpDefault = {
    method: method,
    baseURL: baseURL,
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === "GET" || method === "DELETE" ? params : null,
    data: method === "POST" || method === "PUT" ? qs.stringify(params) : null,
    timeout: 10000
  };

  return new Promise((resolve, reject) => {
    axios(httpDefault)
    // 此处的.then属于axios
      .then(res => {
        successState(res);
        resolve(res);
      })
      .catch(response => {
        errorState(response);
        reject(response);
      });
  });
}

// 输出函数getAxios、postAxios、
export const getAxios = (url, params) => apiAxios("GET", url, params);
export const postAxios = (url, params) => apiAxios("POST", url, params);
