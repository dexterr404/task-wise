import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Link as LinkIcon,People,CalendarMonth,AssignmentOutlined } from "@mui/icons-material";
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getUserRole } from "../hooks/useUserRole";
import { Toaster} from "react-hot-toast";
import { getTeamsById, removeUserFromTeam } from "../api/teamService";
import { colors } from "../data/colors";

import StringAvatar from "../components/ui/StringAvatar";
import ShareDialog from "../components/team/ShareDialog";
import TeamTasks from "../components/team/TeamTasks";
import TeamMembers from "../components/team/TeamMembers";


function Teams() {
  const { teamId } = useParams();
  const user = useSelector((state) => state.user);

  const [shareDialog, setShareDialog] = useState(false);
  const [activeSection, setActiveSection] = useState("tasks");
  const [role, setRole] = useState("Guest");

  const queryClient = useQueryClient();

  //Get current team and its data using the url
  const { data:currentTeam, isLoading } = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => getTeamsById(teamId),
    retry: (failureCount, error) => {
      if (error?.response?.status === 429) return false;
      return failureCount < 3;
    },
  })

  useEffect(() => {
    if (currentTeam && user) {
      const teamRole = getUserRole(user, currentTeam);
      setRole(teamRole);
    }
  },[currentTeam,user]);

  const removeUserMutation = useMutation({
    mutationFn: ({teamId, userId}) => 
      removeUserFromTeam(teamId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['team', teamId]);
      queryClient.invalidateQueries(["teamTasks", teamId]);
      queryClient.invalidateQueries(["teamList", user.id])
    }
  })

  if (isLoading) return <div className="lg:ml-[300px]">Loading...</div>;

  if (!currentTeam) return <div className="lg:ml-[300px]">No team found</div>;

  return (
    <main className="flex flex-col h-screen bg-gray-50 px-10 pb-2 text-gray-600 lg:ml-[250px] pl-10 font-inter max-sm:p-0">
      <Toaster position="top-center" reverseOrder={false}/>
      <header className="flex gap-1 bg-white items-center justify-between text-sm px-2 py-4 border-1 border-gray-200">
        <div className="flex gap-1 items-center">
            <StringAvatar  name={currentTeam.name}/>
            <h1>{currentTeam.name}</h1>
        </div>
        <div className="flex gap-1 items-center">
            <Button 
            onClick={() => setShareDialog(true)}
            variant="contained" sx={{fontSize: "12px", textTransform: "none", paddingY: "2px", paddingX: "6px"}}>
                <LinkIcon sx={{fontSize: "14px", marginRight: "2px"}} /><span className="max-sm:hidden">Invite</span>
            </Button>
        </div>
        <ShareDialog inviteToken={currentTeam.inviteToken} teamId={currentTeam._id} open={shareDialog} onClose={() => setShareDialog(false)}/>
      </header>
      <section className="flex-1 bg-white">
        <section className="flex items-center text-sm bg-white border-x-1 border-b-1 border-gray-200">
          <Button 
          onClick={() => setActiveSection("tasks")}
          sx={{ fontSize: "12px", textTransform: "none", color: "gray", backgroundColor: activeSection === "tasks" ? colors.gray : "white"}}>
            <AssignmentOutlined fontSize="small"/>Task
          </Button>
          <Button 
          onClick={() => setActiveSection("members")}
          sx={{ fontSize: "12px", textTransform: "none", color: "gray", backgroundColor: activeSection === "members" ? colors.gray : "white"}}>
            <People fontSize="small"/>Team
          </Button>
          <Button  sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
            <CalendarMonth fontSize="small"/>Calendar
          </Button>
        </section>
        <section className="flex flex-1 gap-4 text-gray-600 text-sm bg-white">
          {
            activeSection === "tasks" && <TeamTasks team={currentTeam}/>
          }
          {
            activeSection === "members" && <TeamMembers team={currentTeam} role={role} accUser={user}
            onRemoveUser={(userId) => removeUserMutation.mutateAsync({teamId, userId})}/>
          }
        </section>
      </section>
    </main>
  );
}

export default Teams;
