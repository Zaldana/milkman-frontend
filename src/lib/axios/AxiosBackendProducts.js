import axios from 'axios';

let url = "http://localhost:3001/api/product/"

const AxiosBackendProducts = axios.create({
    baseURL: url,
    timeout: 50000,
});

export default AxiosBackendProducts