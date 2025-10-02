import axios from "axios"

export async function getTeamInbox(teamId,searchQuery="") {
    const token = localStorage.getItem("token");
    const queryParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : "";
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/inbox?${queryParam}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true,
        }
    )
    return res.data;
}