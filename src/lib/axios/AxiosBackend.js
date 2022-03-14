import axios from 'axios';

let url = "http://localhost:3001/"

const AxiosBackend = axios.create({
    baseURL: url,
    withCredentials: true,
});

export default AxiosBackend