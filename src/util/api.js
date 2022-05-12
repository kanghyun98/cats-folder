export const request = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('http Error');
    }

    return await response.json();
  } catch (e) {
    console.log(e.message);
  }
};

const BASIC_DIR_URL =
  'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/';

// root: id X, others: id O
const getDirDataAPI = async (id) => {
  try {
    const targetURL = id ? BASIC_DIR_URL + id : BASIC_DIR_URL;

    return await request(targetURL);
  } catch (error) {
    console.log(error);
  }
};

export default getDirDataAPI;
