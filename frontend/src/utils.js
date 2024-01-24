import axios from 'axios';

// export const publicApi = axios.create({
//     baseURL: 'https://real-estate-backend-mocha.vercel.app'
// });
export const publicApi = axios.create({
    baseURL: 'http://localhost:8000'
});