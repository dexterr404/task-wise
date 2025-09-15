import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Link as LinkIcon,People,CalendarMonth,AssignmentOutlined } from "@mui/icons-material";
import { getTeamsById, removeUserFromTeam } from "../api/teamService";
import StringAvatar from "../components/ui/StringAvatar";
import ShareDialog from "../components/team/ShareDialog";
import { Toaster} from "react-hot-toast";
import TeamTasks from "../components/team/TeamTasks";
import TeamMembers from "../components/team/TeamMembers";
import RateLimitedUI from "../components/ui/RateLimitedUI";
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getUserRole } from "../hooks/useUserRole";

function Teams() {
  const { teamId } = useParams();
  const user = useSelector((state) => state.user);

  const [shareDialog, setShareDialog] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [activeSection, setActiveSection] = useState("tasks");
  const [role, setRole] = useState("Guest");

  const queryClient = useQueryClient();

  const { data:currentTeam, isLoading } = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => getTeamsById(teamId),
    retry: (failureCount, error) => {
      if (error?.response?.status === 429) return false;
      return failureCount < 3;
    },
    onError: (error) => {
      if (error?.response?.status === 429) {
        console.log(error.message);
        setIsRateLimited(true);
      }
    }
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
    <main className="flex flex-col h-dvh bg-gray-50 px-10 py-2 text-gray-600 lg:ml-[250px] pl-10 gap-2 font-inter max-sm:p-0">
      <Toaster position="top-center" reverseOrder={false}/>
      <header className="flex gap-1 items-center justify-between text-sm p-2">
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
      <section className="flex items-center gap-5 text-sm">
        <Button 
         onClick={() => setActiveSection("tasks")}
         sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
          <AssignmentOutlined fontSize="small"/>Task
        </Button>
        <Button 
        onClick={() => setActiveSection("members")}
        sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
          <People fontSize="small"/>Team
        </Button>
        <Button  sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>
          <CalendarMonth fontSize="small"/>Calendar
        </Button>
      </section>
      <section className="flex gap-4 p-1 text-gray-600 text-sm">
        {
          activeSection === "tasks" && <TeamTasks team={currentTeam}/>
        }
        {
          activeSection === "members" && <TeamMembers team={currentTeam} role={role} accUser={user}
          onRemoveUser={(userId) => removeUserMutation.mutateAsync({teamId, userId})}/>
        }
      </section>
      {
        isRateLimited && <RateLimitedUI/>
      }
    </main>
  );
}

export default Teams;
