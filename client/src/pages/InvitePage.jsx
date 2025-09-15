import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Avatar, AvatarGroup } from "@mui/material";
import { toast, Toaster} from "react-hot-toast";
import { getTeamByToken,joinTeamByToken } from "../api/teamService";

import StringAvatar from "../components/ui/StringAvatar.jsx";
import Background from "../assets/Backgrounds/login_bg.jpg";
import InviteSkeleton from "../components/skeleton/InviteSkeleton.jsx";

export function InvitePage() {
  const { inviteToken } = useParams();
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  
  //Show team's info in dialog
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await getTeamByToken(inviteToken);
        setTeam(res.team);
      } catch {
        console.log("Invalid invite link");
      }
    };
    fetchTeam();
  }, [inviteToken]);

  // Add user to the team if applicable
  const handleAccept = async () => {
    setIsLoading(true);
    try {
      const res = await joinTeamByToken(inviteToken);
      if (res === "Joined team!") {
        toast.success("🎉 You joined the team!");
      } else if (res === "Already a member") {
        toast("✅ You're already in this team");
      } else if (res === "You're already the owner") {
        toast("👑 You're the team owner");
      }
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("Failed to join the team");
      console.log("Error:", error);
      setIsLoading(false);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  //Go back to home page
  const handleDecline = () => {
    navigate("/");
  }

  if (!team) return <InviteSkeleton/>
  return (
  <main
    className="relative h-screen w-screen bg-cover bg-center flex items-center justify-center"
    style={{ backgroundImage: `url(${Background})` }}
  >
    <Toaster position="top-center" reverseOrder={false}/>
    <Dialog
      open={true}
      PaperProps={{
        sx: {
          borderRadius: 3,
          px: 2,
          py: 1,
          fontFamily: "Inter, sans-serif",
          textAlign: "center",
        },
      }}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ fontSize: "16px", fontWeight: 600 }}>
        You’ve been invited to join
      </DialogTitle>

      <DialogContent>
        <div className="flex justify-center mb-2">
        <StringAvatar name={team.name}/>
        </div>
        {/* Team Name */}
        <DialogContentText
          sx={{
            fontWeight: 700,
            color: "black",
            fontSize: "20px",
            mb: 1,
          }}
        >
          {team.name}
        </DialogContentText>

        {/* Members preview */}
        <div className="flex items-center justify-center gap-2 my-2">
          <AvatarGroup max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: 14,
              marginLeft: '-14px',
              border: '2px solid white',
            },
          }}>
            {team.members.map((member) => (
              <Avatar
                key={member.user._id}
                alt={member.user.name}
                src={member.user.profileImage}
                sx={{ width: 32, height: 32 }}
              />
            ))}
          </AvatarGroup>
          <span className="text-sm text-gray-600">
            {team.members.length} {team.members.length === 1 ? "member" : "members" }
          </span>
        </div>
      </DialogContent>

      <DialogActions
        sx={{
          px: 2,
          pb: 2,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={handleDecline}
          variant="contained"
          sx={{
            backgroundColor: "red",
            color: "white",
            fontSize: "12px",
            px: 2,
            py: 0.5,
            textTransform: "none",
          }}
        >
          Decline
        </Button>
        {!user.id ? (
        <Button
            variant="contained"
            sx={{
                backgroundColor: "green",
                color: "white",
                fontSize: "12px",
                px: 2,
                py: 0.5,
                textTransform: "none",
            }}
            onClick={() => navigate(`/login?redirect=/teams/invite/${inviteToken}`)}
        >
            Login to join
        </Button>
        ) : (
        <Button
            variant="contained"
            sx={{
                backgroundColor: "green",
                color: "white",
                fontSize: "12px",
                px: 2,
                py: 0.5,
                textTransform: "none",
            }}
            disabled={isLoading}
            onClick={handleAccept}
        >
            {isLoading ? "Joining..." : "Accept"}
        </Button>
        )}
      </DialogActions>
    </Dialog>
  </main>
);
}

export default InvitePage