import { useState } from "react";
import { Tooltip } from "@mui/material"
import TodoOptionsMenu from "./TodoOptionsMenu"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LinearWithValueLabel from "./ProgressBar";
import TimeIcon from "@mui/icons-material/AccessTime";

function TaskCard(){
    const [isTodoOptionOpen,setIsTodoOptionOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    return<div className="flex items-center gap-4 bg-white shadow-md p-4 rounded-md max-lg:flex-col max-lg:items-start relative">
        <div className="flex flex-col">
            <h3 className="font-semibold text-black lg:w-[260px]">Schedule Me an Appointment With My Clients</h3>
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
        <div className="relative">
        <Tooltip title="Options">
            <MoreHorizIcon
                className="cursor-pointer max-lg:absolute max-lg:top-2 max-lg:right-2"
                onClick={(e) => setIsTodoOptionOpen((prev) => !prev)}
                ref={(el) => setAnchorEl(el)} // store the icon DOM element
            />
        </Tooltip>
        {isTodoOptionOpen && (
            <TodoOptionsMenu
            anchorEl={anchorEl} // attach menu to icon
            onClose={() => setIsTodoOptionOpen(false)}
            />
        )}
        </div>
    </div>
}
export default TaskCard