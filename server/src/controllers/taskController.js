import Task from "../models/Task.js";
import { deleteTaskVector, embedTask } from "../services/taskEmbeddingService.js";

export const getAllTasks = async (req, res) => {
  try {
    const { filter, sort , search } = req.query;
    let filterOption = { user: req.user._id };
    let sortOption = {};

    // Handle filtering by status
    if (filter) {
      const statuses = filter.split(","); // e.g. "In Progress,Done"
      filterOption.status = { $in: statuses };
    }

    // Handle search by title, description, or subtasks
    if (search) {
      const searchRegex = new RegExp(search, "i"); // case-insensitive
      filterOption.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { "subtasks.title": searchRegex }
      ];
    }

    // Handle sorting
    if (sort === "alphabetical") sortOption.title = 1;
    else if (sort === "status") sortOption.status = 1;
    else if (sort === "deadline") sortOption.deadline = 1;
    else sortOption.createdAt = -1;

    const tasks = await Task.find(filterOption)
      .collation({ locale: "en" })
      .sort(sortOption);

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in getAllTasks controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async(req,res) => {
    try {
        const task = await Task.findById({ _id: req.params.id, user: req.user._id });
        if(!task) return res.status(404).json({message: "Task not found"});

        res.status(200).json(task);
    } catch (error) {
        console.error("Error in searchNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const createTask = async(req,res) => {
    try {
        const {title, description, deadline, status, priority, subtasks} = req.body;
        const newTask = new Task({title, description, deadline, status, priority, isArchived:false, subtasks, user: req.user._id})

        await newTask.save();

        console.log(newTask.title);
        await embedTask(newTask, [req.user._id]);
        res.status(201).json({message: "Task created successfully"})
    }
    catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateTask = async (req, res) => {
  try {
    const { title, description, deadline, status, priority, subtasks } = req.body;
  
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, deadline, status, priority, subtasks },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });
    await embedTask(updatedTask, [req.user._id]);

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error in updateTask controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });
    await deleteTaskVector(deletedTask._id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTask controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



//Archive Task
export const archiveTask = async(req,res) => {
  try {
    const { userId, taskId } = req.params;
    const task = await Task.findByIdAndUpdate(
      { _id: taskId, user: userId},
      { isArchived: true, archivedAt: Date.now() },
      { new: true }
    );
    if(!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await deleteTaskVector(task._id);
    res.status(200).json({ task });
  } catch (error) {
    console.log("Error archiving task", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

//Archive Task
export const unArchiveTask = async(req,res) => {
  try {
    const { userId, taskId } = req.params;
    const task = await Task.findByIdAndUpdate(
      { _id: taskId, user: userId},
      { isArchived: false},
      { new: true }
    );
    if(!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    embedTask(task, [req.user._id]);
    res.status(200).json({ task });
  } catch (error) {
    console.log("Error archiving task", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
