import axios from "./axios";

let DATA = {
  data: null,
  error: null,
};

export const submitPhoneAPI = async (body) => {
  try {
    const { status, data } = await axios.post("users", body);
    DATA = data;
  } catch (err) {
    console.error(err);
  }

  return DATA;
};

export const getMeAPI = async (phone) => {
  try {
    const { status, data } = await axios.get(`users/${phone}`);

    return data;
  } catch (err) {
    console.error(err);
  }
};
