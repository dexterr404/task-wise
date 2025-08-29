import axios from "axios";

const token = localStorage.getItem("token");

export async function fetchAllTasks(sort, filters = []) {
  const token = localStorage.getItem("token");
  const filterQuery = filters.length > 0 ? `&filter=${filters.join(",")}` : "";
  const res = await axios.get(`http://192.168.0.118:5001/api/tasks?sort=${sort}${filterQuery}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return res.data;
};

export async function createTask(title, description, deadline, priority, subtasks) {
  const res = await axios.post(
    "http://192.168.0.118:5001/api/tasks/",
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


export async function deleteTask(taskId) {
  const res = await axios.delete(
    `http://192.168.0.118:5001/api/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
}

export async function updateTask(taskId, name, description, deadline, priority, validSubtasks, status) {
  const res = await axios.put(
    `http://192.168.0.118:5001/api/tasks/${taskId}`,
    {
      title: name,
      description,
      deadline,
      priority,
      status,
      subtasks: validSubtasks,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
}

export async function unDoneTask(taskId,name,description,deadline,priority,subtasks) {
  const res = await axios.put(`http://192.168.0.118:5001/api/tasks/${taskId}`,{
    title: name,
    description,
    deadline,
    priority,
    status: "Ongoing",
    subtasks
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data
}

export async function duplicateTask(title,description,deadline,priority,subtasks) {
  const res = await axios.post("http://192.168.0.118:5001/api/tasks", {
    title,
    description,
    deadline,
    priority,
    subtasks
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data
}

export async function updateSubTask(taskId,task,status,subtasks) {
  const res = await axios.put(`http://192.168.0.118:5001/api/tasks/${taskId}`, {
    ...task,
    status,
    subtasks
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data
}

export async function updateTaskStatus(taskId,title,description,deadline,priority,subtasks) {
  const res = await axios.put(`http://192.168.0.118:5001/api/tasks/${taskId}`,{
      title,
      description,
      deadline,
      priority,
      status: "Done",
      subtasks
    },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data
}