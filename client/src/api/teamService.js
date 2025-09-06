import axios from "axios";

export async function addTeam(name,description) {
    const token = localStorage.getItem("token");
    const res = await axios.post("http://192.168.0.118:5001/api/teams",{
        name,
        description
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

export async function getTeams() {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://192.168.0.118:5001/api/teams",{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

export async function deleteTeam(teamId) {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`http://192.168.0.118:5001/api/teams/${teamId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

export async function updateTeam(teamId,name,description) {
    const token = localStorage.getItem("token");
    const res = await axios.put(`http://192.168.0.118:5001/api/teams/${teamId}`,{
        name,description
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}