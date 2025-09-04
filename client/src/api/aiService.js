import axios from "axios";

export async function getInsights(tasks,id) {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.post(`http://192.168.0.118:5001/api/ai/insights/${id}`,
            {tasks},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data;

    } catch (error) {
        console.error("Failed to get AI insights:", error);
    }
}