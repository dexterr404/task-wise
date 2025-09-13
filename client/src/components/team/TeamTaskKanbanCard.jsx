import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useMutation, useQueryClient,useQuery } from "@tanstack/react-query";
import { IconButton,Checkbox, AvatarGroup, Avatar } from "@mui/material";
import { MoreHoriz,PersonAdd,Chat,CheckCircle,RadioButtonUnchecked } from "@mui/icons-material";
import { priorityColors } from "../../data/priority";
import { toggleSubtaskStatus } from "../../api/teamTaskService";

import { addComment,fetchComments,fetchCommentsCount } from "../../api/commentsService";

import countRemainingDays from "../../utils/countRemainingDays";
import TeamTaskOptionsMenu from "../optionsMenu/TeamTaskOptionsMenu";
import AssignTaskModal from "../../features/task/AssignTaskModal";
import CommentsModal from "../../features/task/CommentsModal";

export default function TeamTaskKanbanCard({ team, task, index, setOpenMenuId, handleEdit, handleDelete}) {
  const[option,setOption] = useState(false);
  const [assignTask, setAssignTask] = useState(false);
  const [isTaskComments, setIsTaskComments] = useState(false);

  const queryClient = useQueryClient();

  //Fetch comments
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", task._id],
    queryFn: () => fetchComments(task._id,team._id),
    enabled: isTaskComments,
  });

  //Fetch comments count
  const { data: commentsCount = 0 } = useQuery({
    queryKey: ["comments-count", task._id],
    queryFn: () => fetchCommentsCount(task._id,team._id)
  })

  //Mutate to add comment
  const addCommentMutation = useMutation({
    mutationFn: ({ taskId, teamId, formData }) =>
      addComment(taskId, teamId, formData),
    onSuccess: () => queryClient.invalidateQueries(["comments", task._id])
  });

  const toggleSubtaskMutation = useMutation({
    mutationFn: ({ teamId, taskId, subtaskId, status }) =>
      toggleSubtaskStatus(teamId, taskId, subtaskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["teamTasks", team._id]);
    },
  });

  const handleToggleSubtask = (taskId, subtaskId, currentStatus) => {
    const newStatus = currentStatus === "Done" ? "Not Started" : "Done";

    // Update backend
    toggleSubtaskMutation.mutate({
      teamId: team._id,
      taskId,
      subtaskId,
      status: newStatus,
    });
  };

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
                setOption((prev) => !prev)
              }
              sx={{ width: 28, height: 28, padding: "0px" }}
            >
              <MoreHoriz fontSize="small" />
            </IconButton>
            {option && <TeamTaskOptionsMenu task={task} team={team} handleDelete={handleDelete}
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
          <div className="text-xs font-semibold text-gray-500">
            {countRemainingDays(new Date(task.deadline).toLocaleDateString())}
          </div>
          <div>
            {task.subtasks.map((subtask) => (
              <div
                key={subtask._id}
                className="text-xs text-gray-600 flex items-center gap-2"
              >
                <Checkbox
                  checked={subtask.status === "Done"}
                  onChange={() =>
                    handleToggleSubtask(task._id, subtask._id, subtask.status)
                  }
                  icon={<RadioButtonUnchecked sx={{ fontSize: 20, color: "gray" }} />}
                  checkedIcon={<CheckCircle sx={{ fontSize: 20, color: "green" }} />}
                  sx={{
                    padding: 0,
                    "& .MuiSvgIcon-root": { fontSize: 16 },
                  }}
                />
                <span
                  className={
                    subtask.status === "Done"
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }
                >
                  {subtask.title}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <IconButton onClick={() => setIsTaskComments(true)} sx={{ position:"relative"}}>
              <Chat sx={{fontSize: "16px"}}/>
              {commentsCount > 0 && (
                <div className="absolute -top-0.5 -right-1 flex items-center justify-center pt-0.5 px-1.5
                                 rounded-full bg-red-500 text-white text-[10px] font-medium">
                  {commentsCount}
                </div>
              )}
            </IconButton>
            <div className="flex items-center text-xs">
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 18, height: 18, fontSize: 11,backgroundColor: "gray", marginLeft: '-4px'}}}>
              {task.assignedTo.map((user) => (
                  <Avatar
                    key={user._id}
                    alt={user.name}
                    src={user.profileImage}
                    sx={{ width: 18, height: 18, }}
                  />
              ))}
              </AvatarGroup>
              <IconButton onClick={() => setAssignTask(true)}>
                <PersonAdd sx={{fontSize: "16px"}}/>
              </IconButton>
            </div>
          </div>
          <CommentsModal open={isTaskComments} onClose={() => setIsTaskComments(false)} addCommentMutation={addCommentMutation}
          comments={comments} task={task} team={team} isLoading={isLoading}/>
          <AssignTaskModal handleEdit={handleEdit} task={task} team={team} open={assignTask} onClose={() => setAssignTask(false)}/>
        </div>
      )}
    </Draggable>
  );
}
