import axios from "axios";

export async function getInsights(tasks,id) {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/insights/${id}`,
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

export async function chatWithHelpBot(message) {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/chat`,
            {
                message
            }
        )
        return res.data.reply;
    } catch (error) {
        console.error("Failed to get help:", error);
    }
}