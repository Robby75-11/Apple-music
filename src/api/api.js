// src/api/api.js
import axios from "axios";

export const fetchDeezer = async (query) => {
  try {
    const response = await axios.get(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "6df61f6a26msh3cc3014e53c0216p1c8f57jsn2220240c89aa",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      }
    );
    return response.data.data || [];
  } catch (error) {
    console.error("❌ Errore nella fetchDeezer con Axios:", error);
    return [];
  }
};
