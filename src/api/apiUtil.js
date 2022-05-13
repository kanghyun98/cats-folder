// fetch를 이용한 API 요청 데이터를 반환하는 API
export const getAsync = async (url) => {
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
