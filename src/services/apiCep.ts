import axios from "axios";

const ApiCEP = axios.create({
  baseURL: "http://viacep.com.br/ws",
});

export default ApiCEP;