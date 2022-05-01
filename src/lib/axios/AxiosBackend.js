import axios from 'axios';

let url =
    (process.env.NODE_ENV === "development")
        ? "http://localhost.localdomain:3001/api/"
        : "/api/";

const AxiosBackend = axios.create({
    baseURL: url,
    withCredentials: true,
});

export default AxiosBackend