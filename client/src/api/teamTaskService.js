import axios from "axios";

export async function createTeamTask(teamId,title,description,deadline,priority,subtasks) {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks`,
        {
            title, description, deadline, priority, subtasks
        },
        {
            headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data
}

export async function getTeamTasks(teamId) {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data
}

export async function updateTeamTask(teamId,taskId,title,description,priority,deadline,column,order) {
    const token = localStorage.getItem("token");
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks/${taskId}`,
        {
            title, description, priority, deadline, column, order
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data
}

export async function deleteTeamTask(teamId,taskId) {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks/${taskId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data
}