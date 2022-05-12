export const request = async (url) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (e) {
    throw {
      message: e.message,
      status: e.status,
    };
  }
};

const BASIC_DIR_URL =
  'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/';

// root: id X, others: id O
const getDirDataAPI = async (id) => {
  try {
    const targetURL = id ? BASIC_DIR_URL + id : BASIC_DIR_URL;

    const data = await request(targetURL);
    return {
      isError: false,
      data,
    };
  } catch (error) {
    return {
      isError: true,
      data: e,
    };
  }
};

export default getDirDataAPI;
