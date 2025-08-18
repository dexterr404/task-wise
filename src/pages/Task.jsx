import { useState } from "react";
import ProfileAndNotif from "../components/ProfileAndNotif";
import SearchTask from "../components/inputs/SearchTask";
import Recommended from "../components/Recommended";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import TimeIcon from "@mui/icons-material/AccessTime";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LinearWithValueLabel from "../components/ProgressBar";
import AddTask from "../components/inputs/CreateTaskForm";

function Task() {
    const [isCreateTaskOpen,setIsCreateTaskOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isProfileMenuOpen,setProfileMenuOpen] = useState(false);

    return<div className="flex flex-col h-100% bg-gray-50 py-2 text-gray-600 lg:ml-[200px] gap-4">
        <div className="flex items-center justify-between lg:ml-[100px] p-4 mx-10 relative">
            <h1 className="font-semibold text-xl">My Task</h1>
            <SearchTask className="relative lg:block max-md:hidden w-[300px]"/>
            <ProfileAndNotif setProfileMenuOpen={setProfileMenuOpen} isProfileMenuOpen={isProfileMenuOpen}/>
        </div>
        <div className="flex justify-center">
            <SearchTask className="relative md:hidden max-md:block w-[300px] mt-2 z-0"/>
        </div>
        <Recommended setIsCreateTaskOpen={setIsCreateTaskOpen} setSelectedCategory={setSelectedCategory}/>
        <div className="flex justify-between items-center mx-10 lg:ml-[100px] max-sm:flex-col-reverse max-sm:gap-2">
            <div className="flex gap-2">
                <button className=" bg-white border-gray-400 px-3 py-1 border-1 rounded-md text-sm font-semibold cursor-pointer hover:bg-gray-50 flex items-center"><FilterListIcon/>Filter</button>
                <button className=" bg-white border-gray-400 px-3 py-1 border-1 rounded-md text-sm font-semibold cursor-pointer hover:bg-gray-50 flex items-center"><SortIcon/>Sort</button>
                <button className=" bg-white border-gray-400 px-3 py-1 border-1 rounded-md text-sm font-semibold cursor-pointer hover:bg-gray-50">...</button>
            </div>
            <div>
                <button className="bg-green-900 text-white font-semibold px-3 py-1 rounded-md text-sm cursor-pointer hover:opacity-80"
                onClick={() => {
                    setSelectedCategory("");   // clear category
                    setIsCreateTaskOpen(true); // open modal
                }}>+New Project</button>
            </div>
            {
                isCreateTaskOpen && <AddTask categoryName={selectedCategory} onClose={() => setIsCreateTaskOpen(false)} />
            }
        </div>
        <div className="flex flex-col mx-10 lg:ml-[100px]">
            <h1 className="font-semibold text-xs text-black mb-4">TODO</h1>
            <div className="flex justify-end flex-col gap-4">
                <div className="flex items-center gap-4 bg-white p-4 rounded-md max-lg:flex-col max-lg:items-start relative">
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-black lg:w-[260px]">Schedule Me an Appointment With My Endocrine...</h3>
                        <p className="text-xs">Appointment</p>
                    </div>
                    <div className="flex items-center text-xs gap-2 min-w-[160px]">
                        <div className="px-3 py-1 bg-cyan-700 text-white rounded-md">In Review</div>
                        <div className="px-3 py-1 bg-red-700 text-white rounded-md">High</div>
                    </div>
                    <div className="flex gap-2 flex-1 max-lg:w-full">
                        <span className="flex items-center text-sm gap-1"><TimeIcon sx={{ fontSize: 18 }}/>15 days left</span>
                        <LinearWithValueLabel className='flex-1'/>
                    </div>
                    <div>
                        <MoreHorizIcon className="cursor-pointer max-lg:absolute max-lg:top-2 max-lg:right-2"/>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-md max-lg:flex-col max-lg:items-start relative">
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-black lg:w-[260px]">
                        Track Medicine Delivery
                        </h3>
                        <p className="text-xs">Appointment</p>
                    </div>

                    <div className="flex items-center text-xs gap-2 min-w-[160px]">
                        <div className="px-3 py-1 bg-gray-700 text-white rounded-md">Drafts</div>
                        <div className="px-3 py-1 bg-orange-700 text-white rounded-md">Medium</div>
                    </div>
                    <div className="flex gap-2 flex-1 max-lg:w-full">
                        <span className="flex items-center text-sm gap-1">
                        <TimeIcon sx={{ fontSize: 18 }} />
                        12 days left
                        </span>
                        <LinearWithValueLabel className="flex-1" />
                    </div>
                    <div>
                        <MoreHorizIcon className="cursor-pointer max-lg:absolute max-lg:top-2 max-lg:right-2" />
                    </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-4 rounded-md max-lg:flex-col max-lg:items-start relative">
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-black lg:w-[260px]">
                        Plan an event
                        </h3>
                        <p className="text-xs">Delivery</p>
                    </div>

                    <div className="flex items-center text-xs gap-2 min-w-[160px]">
                        <div className="px-3 py-1 bg-yellow-700 text-white rounded-md">
                        In Progress
                        </div>
                        <div className="px-3 py-1 bg-orange-700 text-white rounded-md">Medium</div>
                    </div>
                    <div className="flex gap-2 flex-1 max-lg:w-full">
                        <span className="flex items-center text-sm gap-1">
                        <TimeIcon sx={{ fontSize: 18 }} />
                        32 days left
                        </span>
                        <LinearWithValueLabel className="flex-1" />
                    </div>
                    <div>
                        <MoreHorizIcon className="cursor-pointer max-lg:absolute max-lg:top-2 max-lg:right-2" />
                    </div>
                </div>

            </div>
        </div>
    </div>
}

export default Task