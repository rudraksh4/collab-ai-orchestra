
import React from 'react';
import { Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';
import AgentCard from '../AgentCard';
import { Button } from '@/components/ui/button';

interface Event {
  id: string;
  title: string;
  time: string;
  type: 'meeting' | 'reminder' | 'task';
}

interface SchedulerAgentProps {
  events: Event[];
  status?: 'idle' | 'working' | 'completed';
  notifications?: number;
}

const SchedulerAgent = ({ events, status = 'idle', notifications = 0 }: SchedulerAgentProps) => {
  return (
    <AgentCard
      title="Scheduler Agent"
      description="Manages your calendar and schedules"
      icon={CalendarIcon}
      color="#7E69AB"
      status={status}
      notifications={notifications}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Upcoming Events</h3>
          <Button size="sm" variant="outline" className="h-8">
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                <div className="flex items-center">
                  <div className="mr-2 p-1.5 bg-assistant-scheduler/10 rounded">
                    <CalendarIcon className="h-3.5 w-3.5 text-assistant-scheduler" />
                  </div>
                  <span className="text-sm font-medium">{event.title}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {event.time}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-3 text-muted-foreground text-sm">
              No upcoming events
            </div>
          )}
        </div>
      </div>
    </AgentCard>
  );
};

export default SchedulerAgent;
