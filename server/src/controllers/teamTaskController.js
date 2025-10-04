import TeamTask from "../models/TeamTask.js";
import User from "../models/User.js"
import Team from "../models/Team.js"
import mongoose from "mongoose";
import { inboxSubtaskUpdate, inboxTaskAdd, inboxTaskArchive, inboxTaskDeletes, inboxTaskUnarchive, inboxTaskUpdates, inboxTaskAssignment } from "../services/teamTaskService.js";
import { notifyTaskCreation, notifyTaskStatusUpdate, notifyUsersAssignment, notifyUsersUnassignment } from "../services/notificationService.js";
import { normalizeUserId } from "../utils/normalizeUserId.js";


export const getUserTeamTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userTeamTasks = await TeamTask.find({
      assignedTo: userId,
    });

    res.status(200).json(userTeamTasks);
  } catch (error) {
    console.error("Error in fetching user team tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTeamTasks = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { search, filter, sort } = req.query;
    let sortOption = {};

    if (!teamId) {
      return res.status(400).json({ message: "Team ID is required" });
    }

    // base filter
    let filterOption = { team: new mongoose.Types.ObjectId(teamId) };

    // apply status filter
    if (filter) {
      const statuses = filter.split(",");
      filterOption.status = { $in: statuses };
    }

    const pipeline = [
      { $match: filterOption },
      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignedTo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      { $unwind: { path: "$createdBy", preserveNullAndEmptyArrays: true } },
    ];

    // apply search *after* lookup
    if (search) {
      const searchRegex = new RegExp(search, "i");
      pipeline.push({
        $match: {
          $or: [
            { title: searchRegex },
            { description: searchRegex },
            { "subtasks.title": searchRegex },
            { "assignedTo.name": searchRegex },
            { "assignedTo.email": searchRegex },
          ],
        },
      });
    }

     // Handle sorting
    if (sort === "alphabetical") sortOption.title = 1;
    else if (sort === "status") sortOption.status = 1;
    else if (sort === "deadline") sortOption.deadline = 1;
    else if (sort === "none" || !sort) sortOption.order = 1;
    else sortOption.createdAt = -1;

    pipeline.push({ $sort: sortOption ? sortOption : { order: 1 } });

    const tasks = await TeamTask.aggregate(pipeline);

    const columnOrder = ["Backlog", "To Do", "Doing", "Review", "Done"];
    const grouped = columnOrder.reduce((acc, col) => {
      acc[col] = tasks.filter((task) => task.status === col);
      return acc;
    }, {});

    return res.status(200).json({ teamId, columns: grouped, tasks });
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
        const userId = req.user._id;

        if(!title || !description || !teamId) {
            return res.status(400).json({ message: "Title, description and team are required" });
        }

        const newTask = new TeamTask({
            title,
            description,
            priority: priority || "medium",
            team: teamId,
            subtasks: subtasks || [],
            isArchived: false,
            deadline,
            createdBy: userId,
        });

        await newTask.save();
        const team = await Team.findById(teamId);
        const user = await User.findById(userId);

        await inboxTaskAdd(newTask,user);
        await notifyTaskCreation(team, newTask);

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
    const { title, description, priority, deadline, subtasks, assignedTo } = req.body;
    const userId = req.user._id;

    if(!teamId || !taskId) {
      return res.status(400).json({ message: "Team ID and Task ID are required" });
    }

    const task = await TeamTask.findOne({ _id: taskId, team: teamId});
    if(!task) return res.status(404).json({ message: "Task not found" });

    const previousStatus = task.status;
    const prevAssigned = task.assignedTo.map(id => id.toString());

    //Update the fields provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (deadline !== undefined) task.deadline = deadline;
    if(subtasks !== undefined && subtasks.length > 0) task.subtasks = subtasks;
    if (assignedTo !== undefined) task.assignedTo = assignedTo;


    await task.save();

    // populate assignedTo with name and profileImage
    await task.populate("assignedTo", "name profileImage");
    
    // then notify
    const user = await User.findById(userId);
    const team = await Team.findById(teamId);

    //Only run notify and inbox when task assignment changed
    if (assignedTo !== undefined) {
      const newAssigned = assignedTo.map(u => normalizeUserId(u));

      // Who got newly assigned
      const addedUsers = newAssigned.filter(id => !prevAssigned.includes(id));
      const addedExcludingActor = addedUsers.filter(id => id !== normalizeUserId(user._id));

      // Who got unassigned
      const removedUsers = prevAssigned.filter(id => !newAssigned.includes(id));
      const removedExcludingActor = removedUsers.filter(id => id !== normalizeUserId(user._id));

      // Notify added users
      if (addedExcludingActor.length > 0) {
        await notifyUsersAssignment(task, team, user, addedExcludingActor);
        await inboxTaskAssignment(task, user, addedUsers);
      }

      // Notify removed users
      if (removedExcludingActor.length > 0) {
        await notifyUsersUnassignment(task, team, user, removedExcludingActor);
        //await notifyTaskUnassignment(task, user, removedUsers);
      }
    }
    await inboxTaskUpdates(task, previousStatus, user);
    await notifyTaskStatusUpdate(task, previousStatus, team, user);

    return res.status(200).json(task);
  } catch (error) {
    console.log("Error updating team task", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//Update team task status and order from dragging
export const updateMultipleTasks = async (req, res) => {
  const { tasks } = req.body;
  const results = [];
  for (const t of tasks) {
    const task = await TeamTask.findOne({ _id: t.taskId, team: req.params.teamId });
    if (!task) continue;
    task.status = t.status;
    task.order = t.order;
    await task.save();
    results.push(task);
  }
  return res.status(200).json(results);
};

//Delete team task
export const deleteTeamTask = async(req,res) => {
  try {
    const { teamId,taskId } = req.params;
    const userId = req.user._id;

    if(!teamId || !taskId) {
      return res.status(400).json({ message: "Team ID and Task ID are required" });
    }

    const task = await TeamTask.findOneAndDelete({_id:taskId, team:teamId});
    const user = await User.findById(userId);

    if(!task) return res.status(404).json({ message: "Task not found" });

    await inboxTaskDeletes(task,user);

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
  const userId = req.user._id;

  try {
    const task = await TeamTask.findOne({ _id: taskId, team: teamId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    const subtask = task.subtasks.id(subtaskId);
    if (!subtask) return res.status(404).json({ message: "Subtask not found" });

    subtask.status = status;
    await task.save();

    const user = await User.findById(userId);

    await inboxSubtaskUpdate(task,subtask.title,subtask.status,user);

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle subtask status" });
  }
};


//Archive Task
export const archiveTeamTask = async(req,res) => {
  try {
    const { teamId, taskId } = req.params;
    const userId = req.user._id;

    const task = await TeamTask.findByIdAndUpdate(
      { _id: taskId, team: teamId},
      { isArchived: true, archivedAt: Date.now() },
      { new: true }
    );
    if(!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const user = await User.findById(userId);

    await inboxTaskArchive(task,user);

    res.status(200).json({ task });
  } catch (error) {
    console.log("Error archiving task", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//Unarchive Task
export const unArchiveTeamTask = async(req,res) => {
  try {
    const { teamId, taskId } = req.params;
    const userId = req.user._id;

    const task = await TeamTask.findByIdAndUpdate(
      { _id: taskId, team: teamId},
      { isArchived: false },
      { new: true }
    );
    if(!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const user = await User.findById(userId);

    await inboxTaskUnarchive(task,user);
    
    res.status(200).json({ task });
  } catch (error) {
    console.log("Error unArchiving task", error);
    res.status(500).json({ message: "Internal server error" });
  }
}