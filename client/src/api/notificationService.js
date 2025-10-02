import axios from "axios"

export async function fetchNotification( filter="unread" ) {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/notifications?filter=${filter}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true,
        }
    )
    return res.data;
}

export async function markAsRead(notifId) {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/notifications/${notifId}/read`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true,
        }
    )
    return res.data
}

export async function markAllAsRead() {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/notifications/read/all`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true,
        }
    )
    return res.data
}