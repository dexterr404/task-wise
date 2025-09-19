import { useState } from "react";
import { Tooltip,IconButton, Avatar, AvatarGroup } from "@mui/material"
import { statusColors } from "../../data/status";
import { priorityColors } from "../../data/priority";

import countRemainingDays from "../../utils/countRemainingDays";
import PersonalTaskMenu from "../optionsMenu/PersonalTaskOptionMenu"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LinearWithValueLabel from "../ui/ProgressBar";
import TimeIcon from "@mui/icons-material/AccessTime";
import { useLocation } from "react-router-dom";

function TaskCard({task,team}){
    const { pathname } = useLocation();
    const isTeamsPage = pathname.includes("teams");

    const [isTodoOptionOpen,setIsTodoOptionOpen] = useState(false);
    
    const closeOption = () => {
      setIsTodoOptionOpen(false)
    }

    return<div className="flex items-center gap-4 bg-white cursor-pointer hover:bg-gray-50 hover:-translate-y-1 transform transition-transform ease-in-out duration-200 shadow-md p-4 rounded-md max-lg:flex-col max-lg:items-start relative">
        <div className="flex flex-col">
            <h1 className="text-black lg:w-[260px] text-sm break-words">{task.title}</h1>
            <p className="text-xs lg:w-[260px]">{task.description}</p>
        </div>
        <div className="flex items-center text-xs gap-2 min-w-[160px]">
            <div className={`px-3 py-1 text-white rounded-md
              ${statusColors[task.status] || statusColors[task.column]}`}>{task.status || task.column}</div>
            <div className={`px-3 py-1  text-white rounded-md
              ${priorityColors[task.priority] || `bg-gray-700`}`}>{task.priority}</div>
        </div>
        <div className="flex gap-2 flex-1 max-lg:w-full">
            <span className="flex items-center text-xs gap-1"><TimeIcon sx={{ fontSize: 18 }}/>
            {`${countRemainingDays(task.deadline)}`}
            </span>
            <LinearWithValueLabel task={task} className='flex-1'/>
        </div>
        <div className="absolute bottom-14 right-4 lg:top-0">
          {isTeamsPage && (
            <AvatarGroup max={4}>
              {task.assignedTo?.map((user) => (
                <Tooltip key={user._id} title={user.name}>
                  <Avatar
                    src={user.profileImage}
                    alt={user.name}
                    sx={{ width: 24, height: 24, fontSize: 14 }}
                  >
                    {user.name?.[0]}
                  </Avatar>
                </Tooltip>
              ))}
            </AvatarGroup>
          )}
        </div>
        <div className="max-lg:absolute max-lg:top-2 max-lg:right-2 z-10">
          <div className="relative inline-flex">
            <Tooltip title="Options">
              <IconButton sx={{ padding: "1px"}}>
                <MoreHorizIcon
                  className="cursor-pointer"
                  onClick={() => setIsTodoOptionOpen((p) => !p)}
                />
              </IconButton>
            </Tooltip>
            {/*Show option when toggled*/}
            {isTodoOptionOpen && (
              <PersonalTaskMenu 
              task={task}
              closeOption={closeOption}
              onClose={() => setIsTodoOptionOpen(false)}
              team={team}
              />
            )}
          </div>
        </div>
    </div>
}

export default TaskCard