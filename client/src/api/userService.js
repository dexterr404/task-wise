import axios from "axios"

export async function updateProfile(id, formData) {
  const token = localStorage.getItem("token");
  
  const res = await axios.put(
    `http://192.168.0.118:5001/api/users/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
}