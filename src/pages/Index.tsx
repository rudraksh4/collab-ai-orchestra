
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";
import { userData, schedulerData, emailData, taskData, reminderData } from "@/data/mockData";
import SchedulerAgent from "@/components/Dashboard/Agents/SchedulerAgent";
import EmailAgent from "@/components/Dashboard/Agents/EmailAgent";
import TaskAgent from "@/components/Dashboard/Agents/TaskAgent";
import ReminderAgent from "@/components/Dashboard/Agents/ReminderAgent";

const Index = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState("dashboard");
  const [updatedSchedulerData, setUpdatedSchedulerData] = useState(schedulerData);
  const [updatedReminderData, setUpdatedReminderData] = useState(reminderData);
  const [updatedEmailData, setUpdatedEmailData] = useState(emailData);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to render active agent content
  const renderAgentContent = () => {
    switch (activeAgent) {
      case "dashboard":
        return (
          <DashboardOverview
            userData={userData}
            schedulerData={updatedSchedulerData}
            emailData={updatedEmailData}
            taskData={taskData}
            reminderData={updatedReminderData}
          />
        );
      case "scheduler":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Scheduler Agent</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <SchedulerAgent
                events={updatedSchedulerData.events}
                status={updatedSchedulerData.status as 'idle' | 'working' | 'completed'}
                notifications={updatedSchedulerData.notifications}
              />
            </div>
          </div>
        );
      case "email":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Email Handler Agent</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <EmailAgent
                emails={updatedEmailData.emails}
                status={updatedEmailData.status as 'idle' | 'working' | 'completed'}
                notifications={updatedEmailData.notifications}
              />
            </div>
          </div>
        );
      case "task":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Task Tracker Agent</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <TaskAgent
                tasks={taskData.tasks}
                status={taskData.status as 'idle' | 'working' | 'completed'}
                notifications={taskData.notifications}
              />
            </div>
          </div>
        );
      case "reminder":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Reminder Agent</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ReminderAgent
                reminders={updatedReminderData.reminders}
                status={updatedReminderData.status as 'idle' | 'working' | 'completed'}
                notifications={updatedReminderData.notifications}
              />
            </div>
          </div>
        );
      default:
        return <DashboardOverview 
          userData={userData}
          schedulerData={updatedSchedulerData}
          emailData={updatedEmailData}
          taskData={taskData}
          reminderData={updatedReminderData}
        />;
    }
  };

  // Effect to simulate agent activity
  React.useEffect(() => {
    // Simulate notifications after component mounts
    const timer = setTimeout(() => {
      toast({
        title: "New email received",
        description: "Sarah Parker sent a high priority email about the project deadline",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeAgent={activeAgent}
        setActiveAgent={setActiveAgent}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header
          toggleSidebar={toggleSidebar}
          userInfo={userData}
        />

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {renderAgentContent()}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Index;
