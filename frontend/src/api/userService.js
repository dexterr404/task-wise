import axios from "axios"

export async function updateProfile(name,image,id){
    const token = localStorage.getItem("token"); 
    const res = await axios.put(`http://192.168.0.118:5001/api/users/${id}`, 
        { name,image},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    return res.data;
}