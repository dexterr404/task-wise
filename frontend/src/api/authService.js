import axios from "axios"

export async function registerUser(name,email,password) {
    const res = await axios.post("http://192.168.0.118:5001/api/auth/register",{
        name,
        email,
        password
    });
    return res.data;
}

export async function loginUser(email,password) {
    const res = await axios.post("http://192.168.0.118:5001/api/auth/login", {
        email,
        password
    });
    return res.data
}