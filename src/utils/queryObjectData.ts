import axiosFetcher from '$utils/axiosFetcher';

/**
 * 这里存放通用查询类 Open API
 */

// 获取业务对象数据列表
export const queryXObjectData = async (options?: any) => {
  const apiUrl = '/rest/data/v2/query';
  const curOptions = options || {};
  const xObjectApiKey = curOptions.xObjectApiKey || '';
  const fields = curOptions.fields || [];
  const page = curOptions.page || 1;
  const pageSize = curOptions.pageSize || 10;

  // 自动添加 objectId 字段
  if (!fields.includes('id')) {
    fields.push('id');
  }

  // 计算分页偏移量
  const offset = (page - 1) * pageSize;

  // 构建 SQL 查询
  let querySql = `select ${fields.join(',')} from ${xObjectApiKey}`;

  // 添加排序条件（如果有的话）
  if (curOptions.orderBy) {
    querySql += ` order by ${curOptions.orderBy}`;
  }

  if (curOptions.page || curOptions.pageSize) {
    // 添加分页限制
    querySql += ` limit ${pageSize} offset ${offset}`;
  }

  try {
    const config = {
      url: apiUrl,
      method: 'GET',
      data: {
        q: querySql,
      },
    };

    const resultData = await axiosFetcher(config);

    if (resultData.code === 200) {
      const { records, totalSize } = resultData.result || {};
      return {
        status: true,
        code: resultData.code,
        msg: resultData.msg || '获取业务对象数据列表成功',
        totalSize,
        data: records || [],
      };
    }

    return {
      status: false,
      code: resultData.code,
      msg: resultData.msg || '获取业务对象数据列表失败',
      data: [],
    };
  } catch (error) {
    console.error('获取业务对象数据列表失败:', error);

    return {
      status: false,
      msg: error.msg || error.message || '获取业务对象数据列表失败',
      data: [],
    };
  }
};

export default queryXObjectData;
