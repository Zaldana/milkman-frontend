import axios from 'axios';

let url = "http://localhost:3001/"

const AxiosBackend = axios.create({
    baseURL: url,
    timeout: 50000,
});

export default AxiosBackend