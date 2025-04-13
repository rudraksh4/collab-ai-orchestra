
import React, { useState } from 'react';
import { Bell, Clock, Calendar, Tag, Plus, Trash2 } from 'lucide-react';
import AgentCard from '../AgentCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const ReminderAgent = ({ reminders: initialReminders, status = 'idle', notifications = 0 }: ReminderAgentProps) => {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    title: '',
    time: '',
    date: '',
    category: 'Work',
    recurring: false
  });
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.time || !newReminder.date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title || '',
      time: newReminder.time || '',
      date: newReminder.date || '',
      category: newReminder.category || 'Work',
      recurring: Boolean(newReminder.recurring)
    };

    setReminders([...reminders, reminder]);
    toast({
      title: "Reminder added",
      description: `'${reminder.title}' has been scheduled for ${reminder.date} at ${reminder.time}`
    });

    // Reset form and close dialog
    setNewReminder({
      title: '',
      time: '',
      date: '',
      category: 'Work',
      recurring: false
    });
    setOpen(false);
  };

  const handleDeleteReminder = (id: string) => {
    const reminderToDelete = reminders.find(r => r.id === id);
    setReminders(reminders.filter(reminder => reminder.id !== id));
    
    toast({
      title: "Reminder deleted",
      description: `'${reminderToDelete?.title}' has been removed`
    });
  };

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
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Upcoming Reminders</h3>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Plus className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Reminder</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Reminder</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={newReminder.title} 
                    onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                    placeholder="Enter reminder title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input 
                      id="time" 
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                      placeholder="e.g. 3:00 PM"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      id="date" 
                      value={newReminder.date}
                      onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
                      placeholder="e.g. Today, Tomorrow"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newReminder.category} 
                    onValueChange={(value) => setNewReminder({...newReminder, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Work">Work</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                      <SelectItem value="Social">Social</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    className="rounded border-gray-300"
                    checked={newReminder.recurring}
                    onChange={(e) => setNewReminder({...newReminder, recurring: e.target.checked})}
                  />
                  <Label htmlFor="recurring">Recurring reminder</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleAddReminder}>
                  Add Reminder
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-2">
          {reminders.length > 0 ? (
            reminders.map((reminder) => (
              <div key={reminder.id} className="p-2 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{reminder.title}</span>
                  <div className="flex items-center gap-2">
                    {reminder.recurring && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 text-xs">
                        Recurring
                      </Badge>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-gray-500 hover:text-red-600"
                      onClick={() => handleDeleteReminder(reminder.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
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
