import axios from "axios";

const axiosInstance = axios.create({
  timeout: 20000,
  headers: {
    "User-Agent": "Mozilla/5.0"
  }
});

export default axiosInstance;
