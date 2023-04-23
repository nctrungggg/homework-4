import axios from "axios";
import { API_HOST } from "../constants/constants";

const axiosClient = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
