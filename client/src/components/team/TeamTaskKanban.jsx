import { DragDropContext,Droppable } from "@hello-pangea/dnd"
import { Divider, Typography } from "@mui/material"
import { statusColors } from "../../data/status"

import TeamTaskKanbanCard from "./TeamTaskKanbanCard"

export function TeamTaskKanban({onDragEnd,columns,team}) {
    return<section className="bg-white rounded-lg shadow-md flex min-h-[80vh] pb-40 gap-4 overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(columns).map(([colName, tasks]) => (
                <Droppable key={colName} droppableId={colName}>
                {(provided) => (
                    <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-shrink-0 w-60"
                    >
                    <div className="flex items-center gap-1 pl-2">
                        <div className={`size-2 rounded-full ${statusColors[colName]}`}></div>
                        <Typography
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 500, fontSize: "1rem", letterSpacing: 0.3, color: "#374151"}}>
                        {colName}
                        </Typography>
                    </div>
                    <Divider />
                    {
                    tasks.length > 0 ? (
                        tasks
                        .filter((task) => !task.isArchived)
                        .map((task, index) => (
                        <TeamTaskKanbanCard 
                            key={task._id}
                            task={task}
                            team={team}
                            index={index}
                        />
                        ))
                    ) : (
                        <div className="text-gray-400 text-sm p-4">No task</div>
                    )}
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
            ))}
            </DragDropContext>
    </section>
}

export default TeamTaskKanban