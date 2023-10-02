import axios from "axios";

export const baseURL = "http://localhost:5000";
// export const baseURL = "https://trading-client-backend.onrender.com";

const Axios = axios.create({ baseURL });

export default Axios;
