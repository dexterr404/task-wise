import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// Get user by ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    let imageUrl;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profiles",
      });
      imageUrl = result.secure_url;
    } else {
      console.log("No file uploaded");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, ...(imageUrl && { profileImage: imageUrl }) },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      console.warn("User not found for id:", req.params.id);
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("UpdateUser error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message, 
      stack: error.stack, 
    });
  }
};

export const updateFocus = async(req,res) => {
  try {
    const { focus } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      { focus },
      { new: true },
    ).select("-password");

    if(!updatedUser){
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      focus: updatedUser.focus
    });

  } catch (error) {
    res.status(500).json({ message: "Server error"})
  }
}


// Delete user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
