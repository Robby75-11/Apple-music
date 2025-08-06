// src/api/api.js
export const fetchDeezer = async (query) => {
  try {
    const response = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(
        query
      )}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "6df61f6a26msh3cc3014e53c0216p1c8f57jsn2220240c89aa",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("❌ Errore nella fetchDeezer:", error);
    return [];
  }
};
