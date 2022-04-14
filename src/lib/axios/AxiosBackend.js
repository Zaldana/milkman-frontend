import axios from 'axios';

let url = "https://milkman-store.herokuapp.com/api/"

const AxiosBackend = axios.create({
    baseURL: url,
    withCredentials: true,
});

export default AxiosBackend