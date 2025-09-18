import { DragDropContext,Droppable } from "@hello-pangea/dnd"
import { Typography } from "@mui/material"

import TeamTaskKanbanCard from "./TeamTaskKanbanCard"

export function TeamTaskKanban({onDragEnd,columns,team}) {
    return<section className="bg-white rounded-lg shadow-md flex min-h-[80vh] gap-4 p-4 overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(columns).map(([colName, tasks]) => (
                <Droppable key={colName} droppableId={colName}>
                {(provided) => (
                    <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-shrink-0 w-60"
                    >
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            color: "#111827",
                            textTransform: "uppercase",
                            mb: 1,
                        }}
                        >
                        {colName}
                        </Typography>

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
                        <div className="text-gray-400 text-sm">No task</div>
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