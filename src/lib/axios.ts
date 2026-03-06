import axios from "axios";
// import { cookies } from "next/headers";


export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
})

// axiosInstance.interceptors.request.use(
//     async (config) => {
//         const cookieStore = await cookies(); 
//         const token: string = cookieStore.get("authToken");
//         let accessToken = `Bearer ${token}`;
//         accessToken = JSON.parse(accessToken);

//         if(token) {
//             if(config.headers) config.headers.token = accessToken;
//         }
//         return config;
//     },
//     (error) => {

//         return Promise.reject(error);
//     }
// )