import { useState } from "react";
import { Tooltip,IconButton } from "@mui/material"
import { statusColors } from "../../data/status";
import { priorityColors } from "../../data/priority";

import countRemainingDays from "../../utils/countRemainingDays";
import PersonalTaskMenu from "../optionsMenu/PersonalTaskOptionMenu"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LinearWithValueLabel from "../ui/ProgressBar";
import TimeIcon from "@mui/icons-material/AccessTime";

function TaskCard({task,onDelete,onEdit,onSubtaskUpdate,onDoneTask,unDoneTask,onDuplicateTask}){
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
              ${statusColors[task.status] || `bg-gray-700`}`}>{task.status}</div>
            <div className={`px-3 py-1  text-white rounded-md
              ${priorityColors[task.priority] || `bg-gray-700`}`}>{task.priority}</div>
        </div>
        <div className="flex gap-2 flex-1 max-lg:w-full">
            <span className="flex items-center text-xs gap-1"><TimeIcon sx={{ fontSize: 18 }}/>
            {`${countRemainingDays(task.deadline)}`}
            </span>
            <LinearWithValueLabel task={task} className='flex-1'/>
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
            onDelete={onDelete}
            onEdit={(updatedData) => onEdit(updatedData)}
            onSubtaskUpdate={(taskId, updatedTask) => onSubtaskUpdate(taskId, updatedTask)}
            onDoneTask={(updatedTask) => onDoneTask(updatedTask)}
            unDoneTask={(updatedTask) => unDoneTask(updatedTask)}
            onDuplicateTask={(newTask) => onDuplicateTask(newTask)}
            />
          )}
        </div>
      </div>
    </div>
}

export default TaskCard