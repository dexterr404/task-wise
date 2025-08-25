import { useState } from "react";
import { Tooltip } from "@mui/material"
import TodoOptionsMenu from "./TodoOptionsMenu"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LinearWithValueLabel from "./ProgressBar";
import TimeIcon from "@mui/icons-material/AccessTime";
import { statusColors } from "../data/status";
import { priorityColors } from "../data/priority";
import countRemainingDays from "../utils/countRemainingDays";

function TaskCard({task,fetchTask}){
    const [isTodoOptionOpen,setIsTodoOptionOpen] = useState(false);
    
    const closeOption = () => {
      setIsTodoOptionOpen(false)
    }

    return<div className="flex items-center gap-4 bg-white shadow-md p-4 rounded-md max-lg:flex-col max-lg:items-start relative">
        <div className="flex flex-col">
            <h3 className="font-semibold text-black lg:w-[260px]">{task.title}</h3>
            <p className="text-xs lg:w-[260px]">{task.description}</p>
        </div>
        <div className="flex items-center text-xs gap-2 min-w-[160px]">
            <div className={`px-3 py-1 text-white rounded-md
              ${statusColors[task.status] || `bg-gray-700`}`}>{task.status}</div>
            <div className={`px-3 py-1  text-white rounded-md
              ${priorityColors[task.priority] || `bg-gray-700`}`}>{task.priority}</div>
        </div>
        <div className="flex gap-2 flex-1 max-lg:w-full">
            <span className="flex items-center text-sm gap-1"><TimeIcon sx={{ fontSize: 18 }}/>
            {`${countRemainingDays(task.deadline)}`}
            </span>
            <LinearWithValueLabel className='flex-1'/>
        </div>
        <div className="max-lg:absolute max-lg:top-2 max-lg:right-2 z-10">
        <div className="relative inline-flex">
          <Tooltip title="Options">
            <MoreHorizIcon
              className="cursor-pointer"
              onClick={() => setIsTodoOptionOpen((p) => !p)}
            />
          </Tooltip>

          {isTodoOptionOpen && (
            <TodoOptionsMenu 
            task={task}
            closeOption={closeOption}
            onClose={() => setIsTodoOptionOpen(false)}
            fetchTask={() => fetchTask()}/>
          )}
        </div>
      </div>
    </div>
}

export default TaskCard