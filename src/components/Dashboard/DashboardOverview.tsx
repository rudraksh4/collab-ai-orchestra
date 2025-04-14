
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchedulerAgent from './Agents/SchedulerAgent';
import EmailAgent from './Agents/EmailAgent';
import TaskAgent from './Agents/TaskAgent';
import ReminderAgent from './Agents/ReminderAgent';
import { Activity, CpuIcon, MessagesSquare, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DashboardOverviewProps {
  userData: {
    name: string;
    lastActivity: string;
    systemHealth: number;
    activeAgents: number;
    totalAgents: number;
  };
  schedulerData: any;
  emailData: any;
  taskData: any;
  reminderData: any;
}

const DashboardOverview = ({ 
  userData,
  schedulerData,
  emailData,
  taskData,
  reminderData
}: DashboardOverviewProps) => {
  const [localSchedulerData, setLocalSchedulerData] = useState(schedulerData);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{userData.systemHealth}%</div>
            <Progress value={userData.systemHealth} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              All systems operational
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <CpuIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.activeAgents}/{userData.totalAgents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {userData.activeAgents === userData.totalAgents 
                ? "All agents are active" 
                : `${userData.totalAgents - userData.activeAgents} agents idle`}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agent Activity</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tasks completed today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Interaction</CardTitle>
            <MessagesSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m ago</div>
            <p className="text-xs text-muted-foreground mt-1">
              {userData.lastActivity}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Agents</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <SchedulerAgent 
              events={localSchedulerData.events}
              status={localSchedulerData.status}
              notifications={localSchedulerData.notifications}
            />
            
            <EmailAgent 
              emails={emailData.emails}
              status={emailData.status}
              notifications={emailData.notifications}
            />
            
            <TaskAgent 
              tasks={taskData.tasks}
              status={taskData.status}
              notifications={taskData.notifications}
            />
            
            <ReminderAgent 
              reminders={reminderData.reminders}
              status={reminderData.status}
              notifications={reminderData.notifications}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Only show active agents here */}
            <TaskAgent 
              tasks={taskData.tasks}
              status="working"
              notifications={2}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Only show pending agents here */}
            <EmailAgent 
              emails={emailData.emails}
              status="idle"
              notifications={0}
            />
            
            <SchedulerAgent 
              events={localSchedulerData.events}
              status="idle"
              notifications={0}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardOverview;
