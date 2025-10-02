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
        },
        withCredentials: true
    });
    return res.data
}

export async function getUserTeamTasks() {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/teams/user/tasks`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        }
    )
    return res.data
}

export async function getTeamTasks(teamId, searchQuery="", filters=[], sort) {
    const token = localStorage.getItem("token");
    const filterQuery = filters.length ? `&filter=${filters.join(",")}` : "";
    const searchParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : "";
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks?sort=${sort}${searchParam}${filterQuery}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        }
    );
    return res.data
}

export async function updateTeamTask(teamId,taskId,updatedTask) {
    const token = localStorage.getItem("token");
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks/${taskId}`,
        updatedTask,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        }
    )
    return res.data.task
}

export async function deleteTeamTask(teamId,taskId) {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks/${taskId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        }
    )
    return res.data
}

export async function toggleSubtaskStatus(teamId,taskId,subtaskId,status) {
    const token = localStorage.getItem("token");
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks/${taskId}/subtask/${subtaskId}`,
        {
            status
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        }
    )
    return res.data
}

export async function archiveTeamTask(teamId,taskId) {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks/${taskId}/archive`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        }
    )
    return res.data
}

export async function unArchiveTeamTask(teamId,taskId) {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks/${taskId}/unArchive`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        }
    )
    return res.data
}

export async function updateDoneTeamTask(teamId,taskId,updatedTask) {
    const token = localStorage.getItem("token");
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks/${taskId}`,
        updatedTask,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        }
    )
    return res.data.task
}

export async function updateUndoneTeamTask(teamId,taskId,updatedTask) {
    const token = localStorage.getItem("token");
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks/${taskId}`,
        updatedTask,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        }
    )
    return res.data.task
}

export async function duplicatTeamTask(teamId,duplicateTask) {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks`,
        duplicateTask,
        {
            headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    });
    return res.data
}

export async function updateTeamSubtask(teamId,taskId,updatedTask) {
    const token = localStorage.getItem("token");
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks/${taskId}`,
        updatedTask,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        }
    )
    return res.data.task
}

