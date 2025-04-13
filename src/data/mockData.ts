
// Mock data for the CollabAssist dashboard

export const userData = {
  name: "Alex Johnson",
  avatar: "",
  initials: "AJ",
  notifications: 3,
  lastActivity: "Email response drafted",
  systemHealth: 94,
  activeAgents: 3,
  totalAgents: 6
};

export const schedulerData = {
  status: 'idle',
  notifications: 0,
  events: [
    {
      id: "1",
      title: "Team Standup",
      time: "10:00 AM",
      type: "meeting"
    },
    {
      id: "2",
      title: "Project Review",
      time: "2:30 PM",
      type: "meeting"
    },
    {
      id: "3",
      title: "Deadline Reminder: Q2 Report",
      time: "5:00 PM",
      type: "reminder"
    }
  ]
};

export const emailData = {
  status: 'completed',
  notifications: 3,
  emails: [
    {
      id: "1",
      sender: "Sarah Parker",
      subject: "Project Timeline Update",
      preview: "Hi Alex, I wanted to discuss the updated timeline for the Q3 project. We might need to...",
      time: "11:42 AM",
      read: false,
      starred: true,
      priority: "high"
    },
    {
      id: "2",
      sender: "Marketing Team",
      subject: "New Campaign Materials",
      preview: "Please review the attached materials for the upcoming marketing campaign...",
      time: "9:15 AM",
      read: true,
      starred: false,
      priority: "medium"
    }
  ]
};

export const taskData = {
  status: 'working',
  notifications: 1,
  tasks: [
    {
      id: "1",
      title: "Complete project proposal",
      completed: true,
      dueDate: "Today",
      priority: "high"
    },
    {
      id: "2",
      title: "Review marketing materials",
      completed: false,
      dueDate: "Today",
      priority: "medium"
    },
    {
      id: "3",
      title: "Schedule team meeting",
      completed: false,
      dueDate: "Tomorrow",
      priority: "low"
    },
    {
      id: "4",
      title: "Send weekly report",
      completed: false,
      dueDate: "Today",
      priority: "high"
    }
  ]
};

export const reminderData = {
  status: 'idle',
  notifications: 0,
  reminders: [
    {
      id: "1",
      title: "Call with Client",
      time: "3:00 PM",
      date: "Today",
      category: "Work",
      recurring: false
    },
    {
      id: "2",
      title: "Team lunch",
      time: "12:30 PM",
      date: "Tomorrow",
      category: "Social",
      recurring: false
    },
    {
      id: "3",
      title: "Weekly team standup",
      time: "10:00 AM",
      date: "Every Monday",
      category: "Work",
      recurring: true
    }
  ]
};

export const coordinatorData = {
  status: 'working',
  notifications: 0,
  agents: [
    {
      name: "Scheduler Agent",
      status: "idle",
      load: 15,
      lastAction: "Updated calendar"
    },
    {
      name: "Email Handler Agent",
      status: "completed",
      load: 45,
      lastAction: "Processed 5 emails"
    },
    {
      name: "Task Tracker Agent",
      status: "working",
      load: 70,
      lastAction: "Prioritizing tasks"
    },
    {
      name: "Reminder Agent",
      status: "idle",
      load: 10,
      lastAction: "Added reminder"
    },
    {
      name: "User Preferences Agent",
      status: "working",
      load: 35,
      lastAction: "Learning patterns"
    }
  ]
};

export const preferencesData = {
  status: 'working',
  notifications: 0,
  preferences: [
    {
      id: "1",
      category: "Meetings",
      title: "Prefers morning meetings",
      learned: 92,
      recentActivity: "Scheduled 3 meetings in the morning"
    },
    {
      id: "2",
      category: "Email",
      title: "Important sender list",
      learned: 78,
      recentActivity: "Added Sarah Parker to important senders"
    },
    {
      id: "3",
      category: "Tasks",
      title: "Task categorization",
      learned: 45,
      recentActivity: "Learning work vs personal task patterns"
    }
  ]
};
