import { Draggable } from "@hello-pangea/dnd";
import { IconButton } from "@mui/material";
import { MoreHoriz,PersonAdd,Chat } from "@mui/icons-material";
import { priorityColors } from "../../data/priority";

import TeamTaskOptionsMenu from "../optionsMenu/TeamTaskOptionsMenu";

export default function TeamTaskKanbanCard({ team, task, index, openMenuId, setOpenMenuId, handleEdit, handleDelete}) {
  let isMenuOpen = openMenuId === task._id;

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-col gap-2 relative px-5 pt-12 pb-3 bg-white rounded-2xl border-gray-200 shadow-xl mb-2"
        >
          {/* menu button */}
          <div className="absolute top-2 right-2">
            <IconButton
              onClick={() =>
                setOpenMenuId(isMenuOpen ? null : task._id)
              }
              sx={{ width: 28, height: 28 }}
            >
              <MoreHoriz fontSize="small" />
            </IconButton>
            {isMenuOpen && <TeamTaskOptionsMenu task={task} team={team} handleDelete={handleDelete}
            handleEdit={handleEdit} closeMenu={() => setOpenMenuId(null)}/>}
          </div>

          {/* task content */}
          <div className="absolute top-3 left-4">
            <span className={`${priorityColors[task.priority]} px-3 py-1 rounded-md text-[8px] text-white`}>{task.priority}
            </span>
          </div>
          <div className="flex flex-col gap-2">
              <p className="font-medium">{task.title}</p>
              <p className="text-xs text-gray-500">{task.description}</p>
          </div>
          <div className="text-xs">
            {new Date(task.deadline).toLocaleDateString()}
          </div>
          <div className="flex justify-between items-center">
            <IconButton>
              <Chat fontSize="small"/>
            </IconButton>
            <IconButton>
              <PersonAdd fontSize="small"/>
            </IconButton>
          </div>
        </div>
      )}
    </Draggable>
  );
}
