import axios from "axios"

export async function getUser(id) {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    }
  );
  return res.data
}

export async function updateProfile(id, formData) {
  const token = localStorage.getItem("token");
  
  const res = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/users/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true
    }
  );
  return res.data;
}

export async function updateFocus(id, focus) {
  const token = localStorage.getItem("token");

  const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/focus/${id}`,
    { focus },
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    }
  );
  return res.data;
}