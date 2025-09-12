import axios from "axios";

const token = localStorage.getItem("token");

export async function fetchAllTasks(userId,sort, filters = []) {
  const token = localStorage.getItem("token");
  const filterQuery = filters.length > 0 ? `&filter=${filters.join(",")}` : "";
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/personal/${userId}?sort=${sort}${filterQuery}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return res.data;
};

export async function createTask(userId, title, description, deadline, priority, subtasks) {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/personal/${userId}`,
    {
      title,
      description,
      deadline,
      priority,
      status: "Not Started",
      subtasks,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
}


export async function deleteTask(userId,taskId) {
  const res = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/personal/${userId}/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
}

export async function editTask(userId,taskId, title, description, deadline, priority, subtasks, status) {
  const res = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/personal/${userId}/${taskId}`,
    {
      title,
      description,
      deadline,
      priority,
      status,
      subtasks
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
}

export async function updateUndoneTask(userId,taskId,updatedTask) {
  const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/personal/${userId}/${taskId}`,
    updatedTask
    ,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data
}

export async function duplicateTask(userId,duplicateTask) {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/personal/${userId}`, 
    duplicateTask,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data
}

export async function updateSubTask(userId, taskId, updatedTask) {
  const res = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/personal/${userId}/${taskId}`,
    updatedTask,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
}


export async function updateDoneTask(userId,taskId,updatedTask) {
  const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/personal/${userId}/${taskId}`,
    updatedTask,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data
}