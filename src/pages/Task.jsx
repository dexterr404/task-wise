import NotificationsIcon from "@mui/icons-material/Notifications"
import MyPicture from "../assets/me.jpg"
import SearchTask from "../components/inputs/SearchTask";
import Recommended from "../components/Recommended";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import TimeIcon from "@mui/icons-material/AccessTime";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LinearWithValueLabel from "../components/ProgressBar";

function Task() {
    return<div className="flex flex-col h-100% bg-gray-50 py-2 text-gray-600 lg:ml-[200px] gap-4">
        <div className="flex items-center justify-between lg:ml-[100px] p-4 mx-10">
            <h1 className="font-semibold text-xl">My Task</h1>
           <SearchTask className="relative lg:block max-md:hidden w-[300px]"/>
            <div className="flex gap-3 items-center">
                <NotificationsIcon className="cursor-pointer"/>
                <img src={MyPicture} className="w-10 h-10 rounded-full cursor-pointer"/>
            </div>
        </div>
        <div className="flex justify-center">
            <SearchTask className="relative md:hidden max-md:block w-[300px] mt-2"/>
        </div>
        <Recommended />
        <div className="flex justify-between items-center mx-10 lg:ml-[100px] max-sm:flex-col-reverse max-sm:gap-2">
            <div className="flex gap-2">
                <button className=" bg-white border-gray-400 px-3 py-1 border-1 rounded-md text-sm font-semibold cursor-pointer hover:bg-gray-50 flex items-center"><FilterListIcon/>Filter</button>
                <button className=" bg-white border-gray-400 px-3 py-1 border-1 rounded-md text-sm font-semibold cursor-pointer hover:bg-gray-50 flex items-center"><SortIcon/>Sort</button>
                <button className=" bg-white border-gray-400 px-3 py-1 border-1 rounded-md text-sm font-semibold cursor-pointer hover:bg-gray-50">...</button>
            </div>
            <div>
                <button className="bg-black text-white font-semibold px-3 py-1 rounded-md text-sm cursor-pointer hover:opacity-80">+New Project</button>
            </div>
        </div>
        <div className="flex flex-col mx-10 lg:ml-[100px]">
            <h1 className="font-semibold text-xs text-black mb-4">TODO</h1>
            <div className="flex justify-end flex-col gap-4">
                <div className="flex items-center gap-4 bg-white p-4 rounded-md max-sm:flex-col max-sm:items-start relative">
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-black md:min-w-[300px] lg:min-w-[370px]">Schedule Me an Appointment With My Endocrine...</h3>
                        <p className="text-xs">Appointment</p>
                    </div>
                    <div className="flex items-center text-xs gap-2 min-w-[160px]">
                        <div className="px-3 py-1 bg-cyan-700 text-white rounded-md">In Review</div>
                        <div className="px-3 py-1 bg-red-700 text-white rounded-md">High</div>
                    </div>
                    <div className="flex gap-2 flex-1 max-sm:w-full">
                        <span className="flex items-center text-sm gap-1"><TimeIcon sx={{ fontSize: 18 }}/>15 days left</span>
                        <LinearWithValueLabel className='flex-1'/>
                    </div>
                    <div>
                        <MoreHorizIcon className="cursor-pointer max-sm:absolute max-sm:top-2 max-sm:right-2"/>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-md max-sm:flex-col max-sm:items-start relative">
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-black md:min-w-[300px] lg:min-w-[370px]">
                        Track Medicine Delivery...
                        </h3>
                        <p className="text-xs">Appointment</p>
                    </div>

                    <div className="flex items-center text-xs gap-2 min-w-[160px]">
                        <div className="px-3 py-1 bg-gray-700 text-white rounded-md">Drafts</div>
                        <div className="px-3 py-1 bg-orange-700 text-white rounded-md">Medium</div>
                    </div>
                    <div className="flex gap-2 flex-1 max-sm:w-full">
                        <span className="flex items-center text-sm gap-1">
                        <TimeIcon sx={{ fontSize: 18 }} />
                        12 days left
                        </span>
                        <LinearWithValueLabel className="flex-1" />
                    </div>
                    <div>
                        <MoreHorizIcon className="cursor-pointer max-sm:absolute max-sm:top-2 max-sm:right-2" />
                    </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-4 rounded-md max-sm:flex-col max-sm:items-start relative">
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-black md:min-w-[300px] lg:min-w-[370px]">
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
                    <div className="flex gap-2 flex-1 max-sm:w-full">
                        <span className="flex items-center text-sm gap-1">
                        <TimeIcon sx={{ fontSize: 18 }} />
                        32 days left
                        </span>
                        <LinearWithValueLabel className="flex-1" />
                    </div>
                    <div>
                        <MoreHorizIcon className="cursor-pointer max-sm:absolute max-sm:top-2 max-sm:right-2" />
                    </div>
                </div>

            </div>
        </div>
    </div>
}

export default Task