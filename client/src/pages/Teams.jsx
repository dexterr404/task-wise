import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Link as LinkIcon,People,CalendarMonth,AssignmentOutlined } from "@mui/icons-material";
import { getTeamsById } from "../api/teamService";
import StringAvatar from "../components/ui/StringAvatar";
import ShareDialog from "../components/team/ShareDialog";
import { Toaster} from "react-hot-toast";
import TeamTasks from "../components/team/TeamTasks";
import TeamMembers from "../components/team/TeamMembers";


function Teams() {
  const { teamId } = useParams();

  const [currentTeam, setCurrentTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);
  const [activeSection, setActiveSection] = useState("tasks");

  useEffect(() => {
    const getCurrentTeam = async () => {
      setIsLoading(true);
      try {
        const team = await getTeamsById(teamId);
        setCurrentTeam(team);
      } catch (error) {
        console.error("Failed to fetch team:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (teamId) getCurrentTeam();
  }, [teamId]);

  if (isLoading) return <div className="lg:ml-[300px]">Loading...</div>;

  if (!currentTeam) return <div className="lg:ml-[300px]">No team found</div>;

  return (
    <main className="flex flex-col h-dvh bg-gray-50 px-10 py-2 text-gray-600 lg:ml-[250px] pl-10 gap-2 font-inter max-sm:p-0">
      <Toaster position="top-center" reverseOrder={false}/>
      <header className="flex gap-1 items-center justify-between text-sm p-2">
        <div className="flex gap-1 items-center">
            <StringAvatar  name={currentTeam.name}/>
            <h1>{currentTeam.name}</h1>
            <p></p>
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
          activeSection === "members" && <TeamMembers />
        }
      </section>
    </main>
  );
}

export default Teams;
