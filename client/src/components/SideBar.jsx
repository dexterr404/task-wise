import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Diversity3, Dashboard, Task, Add, MoreVert} from "@mui/icons-material";
import StringAvatar from "../components/StringAvatar";
import LeftPanelCloseIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CreateTeamModal from "../features/team/CreateTeamModal";
import { getTeams } from "../api/teamService";
import TeamsOptionsMenu from "./TeamsOptionsMenu";

function SideBar() {
  const [isNavOpen, setNavOpen] = useState(true);
  const [createTeam, setCreateTeam] = useState(false);
  const [teams, setTeams] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setNavOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchTeams = async() => {
      try {
        const res = await getTeams();
        setTeams(res);
      } catch (error) {
        console.log("Failed to fetch teams", error);
      }
    }
    fetchTeams();
  },[])

  const handleClick = (event, team) => {
    setAnchorEl(event.currentTarget);
    setSelectedTeam(team);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTeam(null);
  };

  return isNavOpen ? (
    <aside className="fixed left-0 top-0 h-full w-[250px] bg-white px-12 py-20 z-100 border-r-2 border-gray-100">
      <div className="relative h-full flex flex-col gap-10">
        <div
          className="absolute top-[-48px] right-[-24px] cursor-pointer block lg:hidden"
          onClick={() => setNavOpen(false)}
        >
          <LeftPanelCloseIcon className="text-gray-500" />
        </div>
        <div className="font-bold text-4xl relative font-caveat">
          TaskWise.
          <span className="absolute top-[-8px] right-[-8px]">✏️</span>
        </div>

        <nav className="flex-1 flex flex-col gap-1 text-sm">
          <span className="text-xs text-gray-400 font-semibold mb-4">Menu</span>
          <ul className="flex flex-col gap-3 font-semibold">
            <Link to="/Dashboard">
              <li
                className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md transition 
                ${
                  location.pathname === "/Dashboard"
                    ? "bg-gray-200 text-black"
                    : "text-gray-600 hover:bg-gray-100"
                }`}>
                <Dashboard fontSize="small"/>Dashboard
              </li>
            </Link>
            <Link to="/Task">
              <li
                className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md transition 
                ${
                  location.pathname === "/Task"
                    ? "bg-gray-200 text-black"
                    : "text-gray-600 hover:bg-gray-100"
                }`}>
                <Task fontSize="small"/>Tasks
              </li>
            </Link>
            <li className="flex items-center cursor-default gap-2 px-2 py-1 rounded-md transition text-gray-600">
              <Diversity3 fontSize="small"/>Teams
            </li>
            <div className="text-xs text-gray-600">
              <ul className="flex flex-col gap-1 justify-center">
                {teams.map((team) => (
                  <Link to={`/teams/${team._id}`} key={team._id}>
                  <li
                    className={`cursor-pointer flex items-center justify-between gap-2 px-2 py-1 rounded-md transition  ${
                      location.pathname === `/teams/${team._id}`
                        ? "bg-gray-200 text-black"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}>
                    <div className="flex gap-1.5 items-center">
                      <StringAvatar fontSize="small" name={team.name} />{team.name}
                    </div>
                    <div>
                      <MoreVert 
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(e, team);
                      }} fontSize="small" />
                    </div>
                  </li>
                  </Link>
                ))}
              </ul>
              <TeamsOptionsMenu 
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                team={selectedTeam}
                />
              <div 
                onClick={() => setCreateTeam(true)}
                className="flex items-center gap-1 mt-2 pl-4 cursor-pointer hover:text-gray-400">
                  <Add 
                  sx={{fontSize: "12px"}}/>Add team
                </div>
            </div>
          </ul>
        </nav>
      </div>
      <CreateTeamModal open={createTeam} onClose={() => setCreateTeam(false)}/>
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