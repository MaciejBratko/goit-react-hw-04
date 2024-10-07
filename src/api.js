const UNSPLASH_ACCESS_KEY = "j2RH6xCQ8puTYT4DQHSWpUT7PBLesgl_fywRmF5a3OQ";
const BASE_URL = "https://api.unsplash.com";

export const fetchImages = async (query, page = 1, perPage = 12) => {
  const url = `${BASE_URL}/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.log("Failed to fetch images");
    throw new Error("Failed to fetch images");
  }

  const data = await response.json();
  return data.results;
};
