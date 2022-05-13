import { getAsync } from './apiUtil.js';

// id에 대한 Nodes를 반환하는 API
export const getNodesById = async (id) => {
  try {
    const BASIC_API_PATH =
      'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/';
    const path = id ? BASIC_API_PATH + id : BASIC_API_PATH;

    return await getAsync(path);
  } catch (e) {
    console.log(e.message);
  }
};
