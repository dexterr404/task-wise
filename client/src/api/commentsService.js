import axios from 'axios'

//Fetch comment function for the comments router
export async function fetchComments(taskId,teamId) {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks/${taskId}/comments`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data
}

//Fetch number of comments
export async function fetchCommentsCount(taskId,teamId) {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks/${taskId}/comments/count`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data.count
}

//Add comment function for the comments router
export async function addComment(taskId, teamId, formData) {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/teams/${teamId}/tasks/${taskId}/comments`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return res.data;
}
