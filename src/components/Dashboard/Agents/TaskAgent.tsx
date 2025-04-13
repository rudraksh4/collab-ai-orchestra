
import React, { useState } from 'react';
import { CheckSquare, Clock, ArrowUp, CheckCircle2, Edit, Trash } from 'lucide-react';
import AgentCard from '../AgentCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

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

const TaskAgent = ({ tasks: initialTasks, status = 'idle', notifications = 0 }: TaskAgentProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const { toast } = useToast();
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  
  const priorityIcons = {
    low: <ArrowUp className="h-3.5 w-3.5 rotate-180 text-gray-500" />,
    medium: <ArrowUp className="h-3.5 w-3.5 text-yellow-500" />,
    high: <ArrowUp className="h-3.5 w-3.5 text-red-500" />,
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed } 
        : task
    ));
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: task.completed ? "Task marked as incomplete" : "Task completed",
        description: task.title,
      });
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task.id);
    setEditedTitle(task.title);
  };

  const saveEdit = (taskId: string) => {
    if (editedTitle.trim() === '') return;
    
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, title: editedTitle } 
        : task
    ));
    
    setEditingTask(null);
    toast({
      title: "Task updated",
      description: editedTitle,
    });
  };

  const deleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
    
    if (task) {
      toast({
        title: "Task deleted",
        description: task.title,
        variant: "destructive"
      });
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  const changePriority = (taskId: string) => {
    const priorities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
    
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const currentIndex = priorities.indexOf(task.priority);
        const nextIndex = (currentIndex + 1) % priorities.length;
        return { ...task, priority: priorities[nextIndex] };
      }
      return task;
    }));
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
                {editingTask === task.id ? (
                  <div className="flex flex-1 items-center">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border rounded-md mr-2"
                      autoFocus
                    />
                    <Button 
                      size="sm" 
                      className="h-7 mr-1" 
                      onClick={() => saveEdit(task.id)}
                    >
                      Save
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7" 
                      onClick={cancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 mr-1"
                        onClick={() => toggleTaskCompletion(task.id)}
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
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => changePriority(task.id)}
                      >
                        <div className="p-1 bg-gray-100 rounded flex items-center">
                          {priorityIcons[task.priority]}
                        </div>
                      </Button>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {task.dueDate}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-blue-500"
                        onClick={() => startEditing(task)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 text-red-500"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </>
                )}
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
