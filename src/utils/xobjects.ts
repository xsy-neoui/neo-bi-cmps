import { message } from 'antd';
import axiosFetcher from './axiosFetcher';

// 获取业务类型列表
export const getEntityTypeList = async (
  xObjectApiKey: string,
  options?: any,
) => {
  const curOptions = options || {};
  const apiUrl = `/rest/data/v2.0/xobjects/${xObjectApiKey}/busiType`;
  try {
    const config = {
      ...curOptions,
      url: apiUrl,
      method: 'GET',
    };

    const result = await axiosFetcher(config);
    return result;
  } catch (error) {
    console.error('获取业务类型失败:', error);
    message.error('获取业务类型失败。');
    return {};
  }
};

// 获取对象列表
export const getEntityList = async (options?: any) => {
  const curOptions = options || {};
  const custom = curOptions.custom || false; // 默认获取标准对象列表
  const active = curOptions.active || true; // 仅获取有权限的对象
  const apiUrl = `/rest/metadata/v2.0/xobjects/filter?custom=${custom}&active=${active}`;
  try {
    const config = {
      ...curOptions,
      url: apiUrl,
      method: 'GET',
    };

    const result = await axiosFetcher(config);
    return result;
  } catch (error) {
    console.error('获取对象列表失败:', error);
    message.error('获取对象列表失败。');
    return {};
  }
};

// 创建业务数据
export const createXObject = async (xObjectApiKey: string, options: any) => {
  const curOptions = options || {};
  const apiUrl = `/rest/data/v2.0/xobjects/${xObjectApiKey}`;
  const formData = curOptions.data || {};
  try {
    const config = {
      ...options,
      url: apiUrl,
      method: curOptions.method || 'GET',
      data: {
        data: formData,
      },
    };

    const result = await axiosFetcher(config);
    return result;
  } catch (error) {
    console.error('创建业务数据失败:', error);
    throw error;
  }
};

// 获取业务对象描述
export const getXObjectDesc = async (xObjectApiKey: string, options?: any) => {
  const curOptions = options || {};
  const apiUrl = `/rest/data/v2.0/xobjects/${xObjectApiKey}/description`;
  try {
    const config = {
      ...options,
      url: apiUrl,
      method: curOptions.method || 'GET',
    };

    const result = await axiosFetcher(config);
    return result;
  } catch (error) {
    console.error('获取业务对象描述:', error);
    throw error;
  }
};

// 更新业务数据
export const updateXObject = async (
  xObjectApiKey: string,
  objectId: string,
  options: any,
) => {
  const curOptions = options || {};
  const apiUrl = `/rest/data/v2.0/xobjects/${xObjectApiKey}/${objectId}`;
  const formData = curOptions.data || {};
  try {
    const config = {
      ...curOptions,
      url: apiUrl,
      method: curOptions.method || 'PATCH',
      data: {
        data: formData,
      },
    };

    const result = await axiosFetcher(config);
    return result;
  } catch (error) {
    console.error('更新业务数据失败:', error);
    throw error;
  }
};

// 获取业务数据信息
export const getXObject = async (
  xObjectApiKey: string,
  objectId: string,
  options?: any,
) => {
  const curOptions = options || {};
  const apiUrl = `/rest/data/v2.0/xobjects/${xObjectApiKey}/${objectId}`;
  try {
    const config = {
      ...curOptions,
      url: apiUrl,
      method: curOptions.method || 'GET',
    };

    const result = await axiosFetcher(config);
    return result;
  } catch (error) {
    console.error('获取业务数据信息失败:', error);
    throw error;
  }
};

// 删除业务数据
export const deleteXObject = async (
  xObjectApiKey: string,
  objectId: string,
  options?: any,
) => {
  const curOptions = options || {};
  const apiUrl = `/rest/data/v2.0/xobjects/${xObjectApiKey}/${objectId}`;
  try {
    const config = {
      ...curOptions,
      url: apiUrl,
      method: curOptions.method || 'DELETE',
    };

    const result = await axiosFetcher(config);
    return result;
  } catch (error) {
    console.error('删除业务数据:', error);
    throw error;
  }
};
