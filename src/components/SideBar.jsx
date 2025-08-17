import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import LeftPanelCloseIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

function SideBar() {
  const [isNavOpen, setNavOpen] = useState(true);

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
    <aside className="fixed left-0 top-0 h-full w-[250px] bg-white px-12 py-20 z-100 lg:{setNavOpen(true)} border-r-2 border-gray-100">
      <div className="relative h-full flex flex-col gap-10">
        {/* Close button */}
        <div
          className="absolute top-[-48px] right-[-24px] cursor-pointer block lg:hidden"
          onClick={() => setNavOpen(false)}
        >
          <LeftPanelCloseIcon className="text-gray-500" />
        </div>

        {/* Logo */}
        <div className="font-bold text-4xl relative font-caveat">
          TaskWise.
          <span className="absolute top-[-8px] right-[-8px]">✏️</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1">
          <span className="text-xs text-gray-400 font-semibold">Menu</span>
          <ul className="flex flex-col gap-3 text-gray-600 font-semibold">
            <li className="cursor-pointer flex items-center gap-2">
              <DashboardIcon /> <Link to='/Dashboard'>Dashboard</Link>
            </li>
            <li className="cursor-pointer flex items-center gap-2">
              <TaskIcon /> <Link to='/Task'>Tasks</Link>
            </li>
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
