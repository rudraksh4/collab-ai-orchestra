
import React from 'react';
import { Bell, Clock, Calendar, Tag } from 'lucide-react';
import AgentCard from '../AgentCard';
import { Badge } from '@/components/ui/badge';

interface Reminder {
  id: string;
  title: string;
  time: string;
  date: string;
  category: string;
  recurring: boolean;
}

interface ReminderAgentProps {
  reminders: Reminder[];
  status?: 'idle' | 'working' | 'completed';
  notifications?: number;
}

const ReminderAgent = ({ reminders, status = 'idle', notifications = 0 }: ReminderAgentProps) => {
  return (
    <AgentCard
      title="Reminder Agent"
      description="Sends smart, contextual reminders"
      icon={Bell}
      color="#D946EF"
      status={status}
      notifications={notifications}
    >
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Upcoming Reminders</h3>
        <div className="space-y-2">
          {reminders.length > 0 ? (
            reminders.map((reminder) => (
              <div key={reminder.id} className="p-2 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{reminder.title}</span>
                  {reminder.recurring && (
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 text-xs">
                      Recurring
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-xs space-x-3 text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {reminder.time}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {reminder.date}
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {reminder.category}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-3 text-muted-foreground text-sm">
              No upcoming reminders
            </div>
          )}
        </div>
      </div>
    </AgentCard>
  );
};

export default ReminderAgent;
