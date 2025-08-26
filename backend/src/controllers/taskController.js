import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  try {
    const { filter, sort } = req.query;
    let filterOption = {};
    let sortOption = {};

    // Handle filtering by status
    if (filter) {
      const statuses = filter.split(","); // e.g. "In Progress,Done"
      filterOption.status = { $in: statuses };
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
        const task = await Task.findById(req.params.id);
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
        const newTask = new Task({title, description, deadline, status, priority, subtasks})

        await newTask.save();
        res.status(201).json({message: "Note created successfully"})
    }
    catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateTask = async(req,res) => {
    try{
        const {title, description, deadline, status, priority, subtasks} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id,
            {title, description, deadline, status, priority, subtasks},
            {new: true}
        );
        if(!updatedTask) return res.status(404).json({message: "Task not found"});

        res.status(200).json({message: "Task updated successfully"});
    }
    catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteTask = async(req,res) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask) return res.status(404).json({message: "Task not found"});
        res.status(200).json({message: "Task deleted successfully"});
    }
    catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}