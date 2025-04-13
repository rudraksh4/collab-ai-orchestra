
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, X } from 'lucide-react';
import AgentCard from '../AgentCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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

const SchedulerAgent = ({ events: initialEvents, status = 'idle', notifications = 0 }: SchedulerAgentProps) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      title: '',
      time: '',
      type: 'meeting' as 'meeting' | 'reminder' | 'task'
    }
  });

  const onSubmit = (data: { title: string; time: string; type: 'meeting' | 'reminder' | 'task' }) => {
    // Create new event
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      title: data.title,
      time: data.time,
      type: data.type
    };

    // Add to events
    setEvents([...events, newEvent]);
    setDialogOpen(false);
    form.reset();
    
    // Show toast notification
    toast({
      title: "Event added",
      description: `"${data.title}" has been added to your schedule.`,
    });
  };

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
          <Button size="sm" variant="outline" className="h-8" onClick={() => setDialogOpen(true)}>
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

      {/* Add Event Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 10:00 AM" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Event Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="meeting" id="meeting" />
                          <Label htmlFor="meeting">Meeting</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="task" id="task" />
                          <Label htmlFor="task">Task</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="reminder" id="reminder" />
                          <Label htmlFor="reminder">Reminder</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Add Event</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AgentCard>
  );
};

export default SchedulerAgent;
