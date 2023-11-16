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

const deleteBlog = async ({ token, blog }) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
};

const likeBlog = async ({ blog }) => {
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id,
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog);
  return response.data;
};

export default { getAll, addBlog, likeBlog, deleteBlog };
