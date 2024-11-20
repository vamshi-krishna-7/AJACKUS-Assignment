import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = (page, limit) =>
  axios.get(`${API_URL}?_page=${page}&_limit=${limit}`);
export const addUser = (user) => axios.post(API_URL, user);
export const editUser = (id, user) => axios.put(`${API_URL}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
