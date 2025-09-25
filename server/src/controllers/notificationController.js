import Notification from "../models/Notification.js"
import { notifyUser } from "../services/notificationService.js";

//Create notification
export const sendNotification = async(req,res) => {
    try {
        const userId = req.user._id;
        const notif = await notifyUser(userId, req.body);
        res.status(201).json(notif)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log("Error in sending notification", error);
    }
}

//Fetch notifications
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { filter } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const query = { user: userId };

    // Apply filter
    if (filter === "unread") {
      query.isRead = false;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Mark notification as read
export const markAsRead = async(req,res) => {
    try {
        const { notifId } = req.params;
        const userId = req.user._id;
        if(!userId) {
            return res.status(400).json({ message:"User ID is required" });
        }
        const notif = await Notification.findOneAndUpdate(
            { _id: notifId, user: userId },
            { isRead:true },
            { new:true }
        );
        if(!notif) {
            return res.status(404).json({ message:"Notifications can't found" });
        }
        res.status(200).json(notif);
    } catch (error) {
        res.status(500).json({ message:"Internal server error" });
        console.log("Error in marking notification as read", error);
    }
}

//Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Update all unread notifications for this user
    const result = await Notification.updateMany(
      { user: userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ updatedCount: result.modifiedCount });
  } catch (error) {
    console.error("Error marking all notifications as read", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotification = async(req,res) =>{
    try {
        const notifId = req.params;
        const userId = req.user._id;
        if(!notifId) {
            return res.status(404).json({ message:"Notification not found" });
        }
        await Notification.findOneAndDelete({ _id:notifId, user:userId });
        
        res.status(200).json({ message: "Notification Deleted" });
    } catch (error) {
        res.status(500).json({ message:"Internal server error" });
        console.log("Error in deleting notification", error);
    }
}