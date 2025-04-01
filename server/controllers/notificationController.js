import Notification from "../model/notification-model.js";

export const getAllNotifications = async (req, res) => {
  try {
    const allNotifications = await Notification.find();
    if (!allNotifications) {
      return res.status(401).json({
        message: "Their is no notifications currently",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Notifications reterive successfully",
      success: true,
      notification: allNotifications,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while getting notifications",
      success: false,
    });
  }
};
