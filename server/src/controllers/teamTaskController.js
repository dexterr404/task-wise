import TeamTask from "../models/TeamTask.js";

//Get team's tasks
export const getTeamTasks = async (req, res) => {
  try {
    const { teamId } = req.params;

    if (!teamId) {
      return res.status(400).json({ message: "Team ID is required" });
    }

    //Fetch all tasks for this team
    const tasks = await TeamTask.find({ team: teamId })
      .populate("assignedTo", "name profileImage email")
      .sort({ order: 1 });

      //Define the order
      const columnOrder = ["Backlog", "To Do", "Doing", "Review", "Done"];
      
      //Group tasks by column
      const grouped = columnOrder.reduce((acc, col) => {
        acc[col] = tasks.filter((task) => task.column === col);
        return acc
      }, {});

    return res.status(200).json({
        teamId,
        columns: grouped
    });
  } catch (error) {
    console.error("Error fetching team tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Create team task
export const createTeamTask = async(req,res) => {
    try {
        const { title,description,priority,subtasks,deadline } = req.body;
        const { teamId } = req.params;

        if(!title || !description || !teamId) {
            return res.status(400).json({ message: "Title, description and team are required" });
        }

        const newTask = new TeamTask({
            title,
            description,
            priority: priority || "medium",
            team: teamId,
            subtasks: subtasks || [],
            deadline
        });

        await newTask.save();

        return res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating new team task:", error);
        return res.status(500).json({ message: "Internal server error"});
    }
}

//Update team task
export const updateTeamTask = async(req,res) => {
  try {
    const { teamId, taskId } = req.params;
    const { title, description, priority, deadline, column, order, subtasks, assignedTo } = req.body;

    if(!teamId || !taskId) {
      return res.status(400).json({ message: "Team ID and Task ID are required" });
    }

    const task = await TeamTask.findOne({ _id: taskId, team: teamId});
    if(!task) return res.status(404).json({ message: "Task not found" });

    //Update the fields provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (deadline !== undefined) task.deadline = deadline;
    if(subtasks !== undefined && subtasks.length > 0) task.subtasks = subtasks;
    if (assignedTo !== undefined) task.assignedTo = assignedTo;

    //Update the column and order for drag and drop
    if (column !== undefined) task.column = column;
    if (order !== undefined) task.order = order;

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.log("Error updating team task", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//Delete team task
export const deleteTeamTask = async(req,res) => {
  try {
    const { teamId,taskId } = req.params;

    if(!teamId || !taskId) {
      return res.status(400).json({ message: "Team ID and Task ID are required" });
    }

    const task = await TeamTask.findOneAndDelete({_id:taskId, team:teamId});

    if(!task) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(task);
  } catch (error) {
    console.log("Error deleting team task", error);
    res.status(500).json({ message: "Internal server error"});
  }
}

//Toggle subtask
export const toggleSubtaskStatus = async (req, res) => {
  const { teamId, taskId, subtaskId } = req.params;
  const { status } = req.body;

  try {
    const task = await TeamTask.findOne({ _id: taskId, team: teamId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    const subtask = task.subtasks.id(subtaskId);
    if (!subtask) return res.status(404).json({ message: "Subtask not found" });

    subtask.status = status;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle subtask status" });
  }
};
