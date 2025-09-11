import axios from "axios"

export async function registerUser(name,email,password) {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,{
        name,
        email,
        password
    });
    return res.data;
}

export async function loginUser(email,password) {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password
    });
    return res.data
}