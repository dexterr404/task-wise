import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button,IconButton,Tooltip,Typography } from "@mui/material";
import { People,CalendarMonth,AssignmentOutlined,IosShare,Inbox } from "@mui/icons-material";
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
import TeamInbox from "../components/team/TeamInbox";
import TeamPageSkeleton from "../components/skeleton/TeamPageSkeleton";
import ProfileAndNotif from "../components/personal/ProfileAndNotif";


function Teams() {
  const { teamId } = useParams();
  const user = useSelector((state) => state.user);

  const [shareDialog, setShareDialog] = useState(false);
  const [isProfileMenuOpen,setProfileMenuOpen] = useState(false);
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

  if (isLoading) return <div className="flex w-full h-dvh"><TeamPageSkeleton/></div>;

  if (!currentTeam) return <main className="flex w-screen h-screen justify-center items-center">
                <Typography variant="body3">No team found</Typography>
            </main>;

  return (
    <main className="flex flex-col h-screen bg-gray-50 px-10 pb-2 text-gray-600 lg:ml-[250px] pl-10 font-inter max-sm:p-0">
      <Toaster position="top-center" reverseOrder={false}/>
      <header className="flex gap-1 bg-white items-center justify-between text-sm px-2 py-4 border-1 border-gray-200">
        <div className="flex gap-1 items-center">
            <StringAvatar  name={currentTeam.name}/>
            <h1>{currentTeam.name}</h1>
        </div>
        <div className="flex gap-1 items-center">
          <Tooltip title="Share">
            <IconButton onClick={() => setShareDialog(true)} sx={{ color: "gray", "&:hover": {color: colors.lighterblue}}}>
              <IosShare fontSize="small" sx={{color: colors.darkerblue}}/>
            </IconButton>
          </Tooltip>
          <ProfileAndNotif setProfileMenuOpen={setProfileMenuOpen} isProfileMenuOpen={isProfileMenuOpen}/>
        </div>
        <ShareDialog inviteToken={currentTeam.inviteToken} teamId={currentTeam._id} open={shareDialog} onClose={() => setShareDialog(false)}/>
      </header>
      <section className="flex-1 bg-white">
        <section className="flex items-center justify-between text-sm bg-white border-x-1 border-b-1 border-gray-200">
          <div className="flex">
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
          </div>
          <Button 
          onClick={() => setActiveSection("inbox")}
          sx={{ fontSize: "12px", textTransform: "none", color: "gray", mx: "4px", backgroundColor: activeSection === "inbox" ? colors.gray : "white"}}>
            <Inbox fontSize="small"/>Inbox
          </Button>
        </section>
        <section className="flex gap-4 text-gray-600 text-sm bg-white">
          {
            activeSection === "tasks" && <TeamTasks team={currentTeam}/>
          }
          {
            activeSection === "members" && <TeamMembers team={currentTeam} role={role} accUser={user}
            onRemoveUser={(userId) => removeUserMutation.mutateAsync({teamId, userId})}/>
          }
          {
            activeSection === "inbox" && <TeamInbox team={currentTeam}/>
          }
        </section>
      </section>
    </main>
  );
}

export default Teams;
