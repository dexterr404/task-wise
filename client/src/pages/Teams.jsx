import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";
import { getTeamsById } from "../api/teamService";
import StringAvatar from "../components/StringAvatar";
import ShareDialog from "../components/ShareDialog";
import { Toaster} from "react-hot-toast";


function Teams() {
  const { teamId } = useParams();

  const [currentTeam, setCurrentTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);

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
    <main className="lg:ml-[300px] py-2 mx-10 font-inter">
      <Toaster position="top-center" reverseOrder={false}/>
      <header className="flex gap-1 items-center justify-between font-semibold p-4">
        <div className="flex gap-1 items-center">
            <StringAvatar  name={currentTeam.name}/>
            <h1>{currentTeam.name}</h1>
            <p></p>
        </div>
        <div className="flex gap-1 items-center">
            <Button 
            onClick={() => setShareDialog(true)}
            variant="contained" sx={{fontSize: "12px", textTransform: "none", paddingY: "2px", paddingX: "6px"}}>
                <LinkIcon sx={{fontSize: "14px", marginRight: "2px"}} />Invite
            </Button>
        </div>
        <ShareDialog inviteToken={currentTeam.inviteToken} teamId={currentTeam._id} open={shareDialog} onClose={() => setShareDialog(false)}/>
      </header>
    </main>
  );
}

export default Teams;
