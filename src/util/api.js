// fetch를 이용한 API 요청 데이터를 반환하는 API
const request = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('HTTP ERROR');
    }

    return await response.json();
  } catch (e) {
    console.log(e.message);
  }
};

// id에 대한 Nodes를 반환하는 API
export const getNodesById = async (id) => {
  try {
    const BASIC_API_PATH =
      'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/';
    const path = id ? BASIC_API_PATH + id : BASIC_API_PATH;

    return await request(path);
  } catch (e) {
    console.log(e.message);
  }
};
