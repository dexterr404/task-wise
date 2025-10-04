import { Menu, Person } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/taskwise.svg"

export default function WebsiteNavBar({activeSection,mobileOpen,setMobileOpen,user,scrollTo}) {
    const navigate = useNavigate();

    return(
        <nav className="sticky top-0 left-0 w-full z-50 flex justify-between px-6 md:px-14 py-2 items-center bg-white/80 backdrop-blur-md">
            <div className="flex items-center gap-0.5">
                <img src={Logo} alt="Logo" className="size-10" />
                <span className="text-gray-900 font-semibold">TaskWise</span>
            </div>
            <ul className="hidden md:flex gap-8">
              {["home", "features", "pricing", "support"].map((section) => (
                <li
                  key={section}
                  onClick={() => scrollTo(section)}
                  className={`cursor-pointer transition-colors duration-200 ${
                    activeSection === section ? "text-blue-500 font-semibold" : "text-gray-700 hover:text-blue-500"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </li>
              ))}
            </ul>
            <div className="hidden md:flex items-center gap-3 text-sm">
               {user ? (
                <Person fontSize="small" className="cursor-pointer" />
                ) : (
                <div
                    onClick={() => navigate("/login?redirect=/")}
                    className="cursor-pointer hover:opacity-70"
                >
                    Sign in
                </div>
                )}
                <motion.button
                onClick={() => navigate(user ? "/dashboard" : "/login")}
                whileHover={{ backgroundColor: "#4f46e5", scale: 1.03 }}
                className="px-4 py-1 bg-indigo-600 text-white rounded-lg cursor-pointer font-medium"
                >
                Launch app
                </motion.button>
            </div>
            <div className="block md:hidden">
                <Menu 
                onClick={() => setMobileOpen((prev) => !prev)}
                fontSize="small" />
            </div>
            {mobileOpen && (
              <ul className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg flex flex-col gap-2 p-2 z-50">
                {["home", "features", "pricing", "support"].map((section) => (
                  <li
                    key={section}
                    onClick={() => {
                      scrollTo(section);
                      setMobileOpen(false);
                      setActiveSection(section);
                    }}
                    className={`cursor-pointer px-2 py-1 rounded hover:bg-gray-100 ${
                      activeSection === section ? "text-blue-500 font-semibold" : "text-gray-900"
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </li>
                ))}

                {/* Mobile user actions */}
                <li className="mt-2">
                  {user ? (
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="w-full px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-medium"
                    >
                      Launch app
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/login?redirect=/")}
                      className="w-full px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 cursor-pointer"
                    >
                      Sign in
                    </button>
                  )}
                </li>
              </ul>
            )}
        </nav>
    )
}