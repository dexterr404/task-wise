import axios from "axios";

export async function fetchAllTasks(sort, filters = []) {
  const filterQuery = filters.length > 0 ? `&filter=${filters.join(",")}` : "";
  const res = await axios.get(
    `http://192.168.0.118:5001/api/tasks?sort=${sort}${filterQuery}`
  );
  return res.data;
};

export async function createTask(title,description,deadline,priority,subtasks) {
  const res  = await axios.post("http://192.168.0.118:5001/api/tasks/", {
                  title,
                  description,
                  deadline,
                  priority,
                  status: "Not Started",
                  subtasks
                })
  return res.data;
}

export async function deleteTask(taskId) {
  const res = await axios.delete(`http://192.168.0.118:5001/api/tasks/${taskId}`);
  return res.data
}

export async function updateTask(taskId,name,description,deadline,priority,validSubtasks,status) {
  const res = await axios.put(`http://192.168.0.118:5001/api/tasks/${taskId}`,{
                title: name,
                description,
                deadline,
                priority,
                status,
                subtasks: validSubtasks
              });
  return res.data
}

export async function unDoneTask(taskId,name,description,deadline,priority,subtasks) {
  const res = await axios.put(`http://192.168.0.118:5001/api/tasks/${taskId}`,{
                title: name,
                description,
                deadline,
                priority,
                status: "Ongoing",
                subtasks
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
              });
  return res.data
}

export async function updateSubTask(taskId,task,status,subtasks) {
  const res = await axios.put(`http://192.168.0.118:5001/api/tasks/${taskId}`, {
                ...task,
                status,
                subtasks
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
              });
  return res.data
}