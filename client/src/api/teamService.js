import axios from "axios";

//Create team
export async function addTeam(name,description) {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/teams`,{
        name,
        description
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

//Get all teams
export async function getTeams() {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/teams`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

//Get selected team's info
export async function getTeamsById(teamId) {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data.team;
}

//Delete the selected team
export async function deleteTeam(teamId) {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

//Update the selected team's name and description
export async function updateTeam(teamId,name,description) {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}`,{
        name,description
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}

//Get the team's info using its inviteToken
export async function getTeamByToken(inviteToken) {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/teams/invite/${inviteToken}`);
    return res.data;
}

//Join the team using the invite link
export async function joinTeamByToken(inviteToken) {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/teams/invite/${inviteToken}/join`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.message;
}

//Send team email invitation
export async function sendTeamInviteEmail(teamId,email) {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/teams/invite/${teamId}/invite-email`,
        {email}
    );
    return res.data.message;
}

//Remove user from team
export async function removeUserFromTeam(teamId,memberId) {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/members/${memberId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data
}

//Change user role from team
export async function changeUserRole(teamId,memberId,newRole) {
    const token = localStorage.getItem("token")
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/teams/${teamId}/members/${memberId}/role`,
        {newRole},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return res.data
}
