import axiosRoot from 'axios';
const baseUrl = import.meta.env.VITE_API_URL;

export const axios = axiosRoot.create({
    baseURL: baseUrl
})

export async function getById(url) {
    const {data} = await axios.get(url);
    return data;
}