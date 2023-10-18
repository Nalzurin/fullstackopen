import axios from "axios";

const URL = "http://localhost:3001/persons";

const getBook = () => {
  const request = axios.get(URL);
  return request.then((response) => response.data);
};

const addNum = (newObject) => {
  const request = axios.post(URL, newObject);
  return request.then((response) => response.data);
};

const editNum = (id, newObject) => {
  const request = axios.put(`${URL}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteNum = (id) => {
  const request = axios.delete(`${URL}/${id}`);
  return request.then((response) => response.data);
};

export default {
  getBook,
  addNum,
  editNum,
  deleteNum,
};
