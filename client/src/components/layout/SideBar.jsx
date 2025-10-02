import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Diversity3, Dashboard, Add, MoreVert, Person, Settings} from "@mui/icons-material";
import { getTeams, addTeam, deleteTeam, updateTeam } from "../../api/teamService";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import TeamsOptionsMenu from "../optionsMenu/TeamsOptionsMenu";
import CreateTeamModal from "../../features/team/CreateTeamModal";
import StringAvatar from "../ui/StringAvatar";
import LeftPanelCloseIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import SettingsModal from "../../features/user/SettingsModal";
import Logo from "../../assets/taskwise.svg";

function SideBar() {
  const [isNavOpen, setNavOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [createTeam, setCreateTeam] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  //Make sure to open the sidebar at large screens and can toggle in smaller screens
  const { data: teamsList = [], isLoading } = useQuery({
    queryKey: ["teamList", user.id],
    queryFn: () => getTeams(),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  //Mutate when a team is added
  const addTeamMutation = useMutation({
    mutationFn: ({ teamName, teamDescription }) =>
      addTeam(teamName, teamDescription),
    onSuccess: () => queryClient.invalidateQueries("teamList", user.id)
  })

  //Mutate when a team is deleted
  const deleteTeamMutation = useMutation({
    mutationFn: ({ teamId }) =>
      deleteTeam( teamId ),
    onSuccess: (data,variables) => {
      queryClient.invalidateQueries("teamList", user.id);
      if(variables.teamId === selectedTeam._id) {
        navigate("/dashboard");
      }
    }
  })

  //Mutate when a team is edited
  const editTeamMutation = useMutation({
    mutationFn: ({ teamId, teamName, teamDescription }) =>
      updateTeam( teamId, teamName, teamDescription ),
    onSuccess: () => queryClient.invalidateQueries("teamList", user.id)
  })

  //Set the selected team and its option menu 
  const handleClick = (event, team) => {
    setAnchorEl(event.currentTarget);
    setSelectedTeam(team);
  };

  //Close the team's option menu when user clicked elsewhere
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTeam(null);
  };

  //Make sure the sidebar is able to be toggled
  return isNavOpen ? (
    <aside className="fixed left-0 top-0 h-full w-[250px] bg-surface px-12 py-20 z-100 border-r-1 border-border">
      <div className="relative h-full flex flex-col items-center gap-8">
        <div
          className="absolute top-[-48px] right-[-24px] cursor-pointer block lg:hidden"
          onClick={() => setNavOpen(false)}
        >
        <LeftPanelCloseIcon className="text-gray-500 mx-auto" />
        </div>
        <div className="flex items-center gap-0.5">
          <img src={Logo} alt="Logo" className="size-18"/>
          <span className="text-text-primary text-xl">TaskWise</span>
        </div>
        <nav className="flex-1 flex flex-col justify-between gap-1text-sm">
          <div>
            <span className="text-xs text-text-secondary font-semibold">Menu</span>
            <ul className="flex flex-col text-sm gap-3 font-semibold">
              <Link to={`/dashboard`}>
                <li
                  className={`cursor-pointer flex text-text-primary items-center gap-2 mt-1 px-2 py-1 rounded-md transition 
                  ${
                    location.pathname === `/dashboard`
                      ? "bg-accent text-text-primary"
                      : "bg-surface hover:bg-accent"
                  }`}>
                  <Dashboard fontSize="small"/>Dashboard
                </li>
              </Link>
              <Link to={`/personal`}>
                <li
                  className={`cursor-pointer flex text-text-primary items-center gap-2 px-2 py-1 rounded-md transition 
                  ${
                    location.pathname ===  `/personal`
                      ? "bg-accent text-text-primary"
                      : "bg-surface hover:bg-accent"
                  }`}>
                  <Person fontSize="small"/>Personal
                </li>
              </Link>
              <li className="flex items-center cursor-default gap-2 px-2 py-1 rounded-md transition text-text-primary">
                <Diversity3 fontSize="small"/>Teams
              </li>
              <div className="text-xs text-gray-600">
                <ul className="flex flex-col gap-1 max-h-[200px] w-45 overflow-x-hidden overflow-y-auto scroll-hint scrollbar-auto-hide">

                  {/*Mapping out the user's joined teams*/}
                  {teamsList.map((team) => (
                    <Link to={`/teams/${team._id}`} key={team._id}>
                    <li
                      className={`cursor-pointer flex text-text-primary items-center justify-between gap-2 px-2 py-1 rounded-md transition  ${
                        location.pathname === `/teams/${team._id}`
                        ? "bg-accent text-text-primary"
                        : "bg-surface hover:bg-accent"
                      }`}>
                      <div className="flex gap-1.5 items-center ">
                        <StringAvatar fontSize="small" name={team.name} />
                        <span className="max-w-[90px] break-words line-clamp-3">
                          {team.name}
                        </span>
                      </div>
                      <div>
                        <IconButton  
                            onClick={(e) => {
                            e.preventDefault();
                            handleClick(e, team);
                          }}>
                          <MoreVert fontSize="small" sx={{ color: "var(--color-text-primary)"}}/>
                        </IconButton>
                      </div>
                    </li>
                    </Link>
                  ))}
                </ul>

                {/*Make sure that there is a team before opening team options */}
                {
                  selectedTeam && (
                    <TeamsOptionsMenu
                    onDeleteTeam={(teamId) => deleteTeamMutation.mutateAsync(teamId)}
                    onEditTeam={((teamId,teamName,teamDescription) => editTeamMutation.mutateAsync(teamId,teamName,teamDescription))}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    team={selectedTeam}
                    />
                  )
                }
                <div 
                  onClick={() => setCreateTeam(true)}
                  className="flex items-center gap-1 mt-2 pl-4 cursor-pointer text-text-primary hover:text-text-secondary">
                    <Add 
                    sx={{fontSize: "12px"}}/>Add team
                  </div>
              </div>
              
            </ul>
          </div>
          <div 
          onClick={() => setIsSettingsOpen(true)}
          className="cursor-pointer text-sm flex font-semibold items-center gap-2 mt-1 px-2 py-1 rounded-md transition hover:bg-accent bg-surface text-text-primary">
              <Settings fontSize="small"/> Settings
          </div>
        </nav>
      </div>
      <CreateTeamModal open={createTeam} onClose={() => setCreateTeam(false)} 
      onAddTeam={(teamName,teamDescription) =>
        addTeamMutation.mutateAsync(teamName,teamDescription)} 
      setSelectedTeam={setSelectedTeam}/>
      <SettingsModal open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </aside>
  ) : (
    <div
      className="fixed top-3 left-3 cursor-pointer"
      onClick={() => setNavOpen(true)}
    >
      <LeftPanelCloseIcon className="text-gray-500 rotate-180" />
    </div>
  );
}

export default SideBar;