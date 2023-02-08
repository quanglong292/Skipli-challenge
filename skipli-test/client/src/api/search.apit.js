import axios from "./axios";

export const searchGithubAPI = async (params) => {
  try {
    const { status, data } = await axios.get(`github/search`, { params });
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const likeGithubAPI = async (body) => {
  try {
    const { status, data } = await axios.post("github/user/like", body);
    return data;
  } catch (err) {
    console.error(err);
  }
};
