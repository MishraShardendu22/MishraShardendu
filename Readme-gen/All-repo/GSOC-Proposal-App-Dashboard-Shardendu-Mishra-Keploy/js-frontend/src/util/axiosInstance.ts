import axios from 'axios';

const axiosInstance = axios.create(
    {
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    }
)

export {
    axiosInstance
}