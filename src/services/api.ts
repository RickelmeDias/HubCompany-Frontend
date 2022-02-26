import axios from "axios";

const getToken = () => {return localStorage.getItem('token')};

const Api = axios.create({
  baseURL: "https://hubcompany-backend.herokuapp.com",
  headers: {
  Authorization : `Bearer ${getToken()}`,
  }
});

export default Api;