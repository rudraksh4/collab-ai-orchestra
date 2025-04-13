
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface AgentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  status?: 'idle' | 'working' | 'completed';
  notifications?: number;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const AgentCard = ({
  title,
  description,
  icon: Icon,
  color,
  status = 'idle',
  notifications = 0,
  children,
  className,
  onClick
}: AgentCardProps) => {
  const statusColors = {
    idle: 'bg-gray-200 text-gray-700',
    working: 'bg-yellow-100 text-yellow-800 animate-pulse-slow',
    completed: 'bg-green-100 text-green-800'
  };

  return (
    <Card 
      className={cn("h-full cursor-pointer transition-all duration-300 hover:translate-y-[-5px]", className)}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div 
            className="p-2 rounded-full" 
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
          {notifications > 0 && (
            <Badge variant="destructive" className="ml-2">
              {notifications}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="pt-1 flex justify-between">
        <Badge variant="outline" className={cn(statusColors[status])}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
