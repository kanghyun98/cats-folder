import { GetAsync } from './api.js';

const BASIC_API_PATH =
  'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/';

// id에 대한 Nodes를 반환하는 API
export const getNodesById = async (id) => {
  const path = id ? BASIC_API_PATH + id : BASIC_API_PATH;
  const data = await GetAsync(path);
  return data;
};
