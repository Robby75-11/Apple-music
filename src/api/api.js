export const fetchDeezer = async (query) => {
  try {
    const res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Errore nella fetch:", error);
    return [];
  }
};
