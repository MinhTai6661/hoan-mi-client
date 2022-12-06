import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    header: {
        contentType: "aplication/json",
    },
});

export default axiosClient;
