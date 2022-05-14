export const GetAsync = async (url) => {
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
