
import { Notification } from "@/types";

// Notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    user_id: "user-1",
    title: "Application Status Update",
    message: "Your application for Product Manager at DataFlow Systems has been accepted!",
    is_read: false,
    created_at: "2023-05-25T14:30:00Z",
    link: "/applications"
  },
  {
    id: "notif-2",
    user_id: "user-1",
    title: "New Job Match",
    message: "We found a new Frontend Developer position that matches your profile!",
    is_read: true,
    created_at: "2023-06-10T09:45:00Z",
    link: "/jobs/job-new"
  },
  {
    id: "notif-3",
    user_id: "user-1",
    title: "Profile Reminder",
    message: "Complete your profile to improve your job matches.",
    is_read: false,
    created_at: "2023-06-18T16:20:00Z",
    link: "/profile"
  }
];
