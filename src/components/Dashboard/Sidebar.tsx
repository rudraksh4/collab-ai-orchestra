
import React from 'react';
import { Home, Calendar, Mail, CheckSquare, Bell, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  activeAgent: string;
  setActiveAgent: (agent: string) => void;
}

const sidebarItems = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'scheduler', name: 'Scheduler', icon: Calendar },
  { id: 'email', name: 'Email Handler', icon: Mail },
  { id: 'task', name: 'Task Tracker', icon: CheckSquare },
  { id: 'reminder', name: 'Reminder', icon: Bell },
];

const Sidebar = ({ isOpen, toggleSidebar, activeAgent, setActiveAgent }: SidebarProps) => {
  return (
    <aside 
      className={cn(
        "fixed top-0 left-0 z-40 h-screen transition-transform bg-sidebar border-r",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        "lg:w-64 w-64"
      )}
    >
      <div className="h-full flex flex-col overflow-y-auto p-3">
        <div className="flex items-center justify-between mb-6 px-1 py-2">
          <a href="#" className="flex items-center">
            <Bell className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold">CollabAssist</span>
          </a>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-8 flex-1">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeAgent === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-secondary font-medium"
                  )}
                  onClick={() => setActiveAgent(item.id)}
                >
                  <Icon 
                    className={cn(
                      "h-5 w-5 mr-3",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )} 
                  />
                  {item.name}
                </Button>
              );
            })}
          </nav>
        </div>
        
        <Separator />
      </div>
    </aside>
  );
};

export default Sidebar;
