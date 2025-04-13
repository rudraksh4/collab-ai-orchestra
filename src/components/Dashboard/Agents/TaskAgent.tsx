
import React from 'react';
import { CheckSquare, Clock, ArrowUp, CheckCircle2 } from 'lucide-react';
import AgentCard from '../AgentCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface TaskAgentProps {
  tasks: Task[];
  status?: 'idle' | 'working' | 'completed';
  notifications?: number;
}

const TaskAgent = ({ tasks, status = 'idle', notifications = 0 }: TaskAgentProps) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  
  const priorityIcons = {
    low: <ArrowUp className="h-3.5 w-3.5 rotate-180 text-gray-500" />,
    medium: <ArrowUp className="h-3.5 w-3.5 text-yellow-500" />,
    high: <ArrowUp className="h-3.5 w-3.5 text-red-500" />,
  };

  return (
    <AgentCard
      title="Task Tracker Agent"
      description="Manages your tasks and priorities"
      icon={CheckSquare}
      color="#F97316"
      status={status}
      notifications={notifications}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Today's Tasks</h3>
            <span className="text-sm text-muted-foreground">{completedTasks}/{tasks.length} completed</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div 
                key={task.id}
                className={`flex items-center justify-between p-2 rounded-md ${task.completed ? 'bg-gray-50' : 'bg-white border border-gray-200'}`}
              >
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 mr-1"
                    disabled={task.completed}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                    )}
                  </Button>
                  <span className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-gray-100 rounded flex items-center">
                    {priorityIcons[task.priority]}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {task.dueDate}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-3 text-muted-foreground text-sm">
              No tasks for today
            </div>
          )}
        </div>
      </div>
    </AgentCard>
  );
};

export default TaskAgent;
