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
  const res = await axios.post("/products", newData);
  return res.data;
};

export const updateProduct = async ({ id, newData }) => {
  const res = await axios.put(`/products/${id}`, newData);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`/products/${id}`);
  return res.data;
};
