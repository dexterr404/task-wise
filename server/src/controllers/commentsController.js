import Comment from "../models/Comment.js";
import cloudinary from "../config/cloudinary.js"

export const fetchComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const comments = await Comment.find({ task: taskId })
    .populate("author", "name profileImage")
    .sort({ createdAt: 1 });;

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error in fetchComments controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchNumberOfComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    // Count only comments that match BOTH task & team
    const count = await Comment.countDocuments({ task: taskId});

    res.status(200).json({ count });
  } catch (error) {
    console.error("Error in fetchComments controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addComment = async(req,res) => {
    try {
        const { taskId } = req.params;
        const { message } = req.body;
        const authorId = req.user._id;

        let imageUrls = [];

        if (req.files && req.files.length > 0) {
          const uploadPromises = req.files.map((file) =>
            cloudinary.uploader.upload(file.path, {
              folder: "task-comments"
            })
          );
          const results = await Promise.all(uploadPromises);
          imageUrls = results.map((r) => r.secure_url);
        }

        if (!message && imageUrls.length === 0) {
          return res.status(400).json({ message: "Message or at least one image is required" });
        }

        const newComment = new Comment({
            message,
            images: imageUrls,
            author: authorId,
            task: taskId,
        });

        await newComment.save();
        return res.status(201).json(newComment);
    } catch (error) {
        console.log("Error in comments controller", error);
        res.status(500).json({ message: "Internal server error "});
    }
}