import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import LeftPanelCloseIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

function SideBar() {
  const [isNavOpen, setNavOpen] = useState(true);
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

        <nav className="flex-1 flex flex-col gap-1">
          <span className="text-xs text-gray-400 font-semibold mb-4">Menu</span>
          <ul className="flex flex-col gap-3 font-semibold">
            <Link to="/Dashboard">
              <li
                className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md transition 
                ${
                  location.pathname === "/Dashboard"
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}>
                <DashboardIcon />Dashboard
              </li>
            </Link>
            <Link to="/Task">
              <li
                className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded-md transition 
                ${
                  location.pathname === "/Task"
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}>
                <TaskIcon />Tasks
              </li>
            </Link>
          </ul>
        </nav>
      </div>
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