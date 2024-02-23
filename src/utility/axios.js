import axios from "axios";

const instance = axios.create({
  baseURL: "https://rest-api-j55j.onrender.com/",
});

export default instance;
