import axios from "axios";

const getToken = () => {return localStorage.getItem('token')};

const Api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
  Authorization : `Bearer ${getToken()}`,
  }
});

export default Api;