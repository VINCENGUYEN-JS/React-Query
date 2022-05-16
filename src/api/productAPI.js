import axios from "axios";

export const getData = async ({ queryKey }) => {
  try {
    const res = await axios.get(`${queryKey[0]}`);
    return res.data;
  } catch (err) {
    if (err.response.data.msg) {
      throw new Error(err.response.data.msg);
    } else {
      throw new Error(err.message);
    }
  }
};

export const getInfiniteData = async ({ queryKey, pageParam = 1 }) => {
  try {
    const res = await axios.get(`${queryKey[0]}&page=${pageParam}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response.data.msg);
  }
};

export const createProduct = async (newData) => {
  return axios.post("/products", newData);
};

export const updateProduct = async ({ id, newData }) => {
  return axios.put(`/products/${id}`, newData);
};

export const deleteProduct = async (id) => {
  return axios.delete(`/products/${id}`);
};
