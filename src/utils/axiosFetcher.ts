import axios from 'axios'; // https://www.axios-http.cn/docs/intro

// 创建基于 axios 的 fetcher 函数
const axiosFetcher = async (options: any) => {
  try {
    const config = {
      ...options,
      method: options?.method || 'GET',
      data: options?.data || {},
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      timeout: options?.timeout || 30000,
    };

    if (config?.method === 'GET') {
      config.params = options?.data || {};
    }

    const response = await axios(config);
    return response?.data || {};
  } catch (error) {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      console.error('接口请求报错 / 接口服务异常：', error.message);
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      console.error('接口请求报错 / 接口未正常响应：', error.message);
    } else {
      console.error('接口请求报错:', error, '，请求参数:', options);
    }
    throw error;
  }
};

export default axiosFetcher;
