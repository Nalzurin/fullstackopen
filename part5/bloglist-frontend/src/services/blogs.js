import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const addBlog = async ({ Token, newBlog }) => {
  const config = { headers: { Authorization: `Bearer ${Token}` } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

export default { getAll, addBlog };
