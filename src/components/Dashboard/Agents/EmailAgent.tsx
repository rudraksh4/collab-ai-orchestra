
import React, { useState } from 'react';
import { Mail, Star, Info, Archive, Trash2, Filter, Clock } from 'lucide-react';
import AgentCard from '../AgentCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  starred: boolean;
  priority: 'low' | 'medium' | 'high';
  isSpam?: boolean;
}

interface EmailAgentProps {
  emails: Email[];
  status?: 'idle' | 'working' | 'completed';
  notifications?: number;
}

const EmailAgent = ({ emails: initialEmails, status = 'idle', notifications = 0 }: EmailAgentProps) => {
  const { toast } = useToast();
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [studyTime, setStudyTime] = useState(0); // Time in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  const priorityColors = {
    low: 'bg-gray-100 text-gray-600',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  // Email handling functions
  const deleteEmail = (id: string) => {
    setEmails(emails.filter(email => email.id !== id));
    toast({
      title: "Email deleted",
      description: "The email has been permanently deleted.",
    });
  };

  const markAsSpam = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, isSpam: true } : email
    ));
    toast({
      title: "Marked as spam",
      description: "The email has been marked as spam.",
    });
  };

  const removeFromSpam = (id: string) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, isSpam: false } : email
    ));
    toast({
      title: "Removed from spam",
      description: "The email has been moved back to inbox.",
    });
  };

  // Timer functions
  const startTimer = () => {
    if (!isTimerActive) {
      setIsTimerActive(true);
      const interval = setInterval(() => {
        setStudyTime(prevTime => prevTime + 1);
      }, 1000);
      setTimerInterval(interval);
      toast({
        title: "Study timer started",
        description: "Your study session has begun.",
      });
    }
  };

  const stopTimer = () => {
    if (isTimerActive && timerInterval) {
      clearInterval(timerInterval);
      setIsTimerActive(false);
      setTimerInterval(null);
      toast({
        title: "Study timer paused",
        description: `You've studied for ${formatTime(studyTime)}.`,
      });
    }
  };

  const resetTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    setStudyTime(0);
    setIsTimerActive(false);
    setTimerInterval(null);
    toast({
      title: "Study timer reset",
      description: "Your study timer has been reset to 0.",
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filter emails by spam status
  const regularEmails = emails.filter(email => !email.isSpam);
  const spamEmails = emails.filter(email => email.isSpam);

  return (
    <AgentCard
      title="Email Handler Agent"
      description="Manages your inbox intelligently"
      icon={Mail}
      color="#0EA5E9"
      status={status}
      notifications={notifications}
    >
      <div className="space-y-3">
        <Tabs defaultValue="inbox">
          <TabsList className="w-full">
            <TabsTrigger value="inbox" className="flex-1">Inbox</TabsTrigger>
            <TabsTrigger value="spam" className="flex-1">Spam</TabsTrigger>
            <TabsTrigger value="timer" className="flex-1">Study Timer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inbox" className="mt-3">
            <h3 className="text-sm font-medium mb-2">Important Emails</h3>
            <div className="space-y-2">
              {regularEmails.length > 0 ? (
                regularEmails.map((email) => (
                  <div 
                    key={email.id} 
                    className={`p-2 rounded-md ${email.read ? 'bg-gray-50' : 'bg-blue-50 border-l-2 border-blue-400'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium text-sm flex items-center">
                        {email.sender}
                        <Badge 
                          variant="outline" 
                          className={`ml-2 text-xs ${priorityColors[email.priority]}`}
                        >
                          {email.priority}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{email.time}</span>
                    </div>
                    <p className="text-sm mb-1 font-medium">{email.subject}</p>
                    <p className="text-xs text-muted-foreground truncate">{email.preview}</p>
                    <div className="flex gap-1 mt-1.5">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Star className={`h-3.5 w-3.5 ${email.starred ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Archive className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => markAsSpam(email.id)}
                      >
                        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => deleteEmail(email.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-3 text-muted-foreground text-sm">
                  No emails in inbox
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="spam" className="mt-3">
            <h3 className="text-sm font-medium mb-2">Spam Emails</h3>
            <div className="space-y-2">
              {spamEmails.length > 0 ? (
                spamEmails.map((email) => (
                  <div 
                    key={email.id} 
                    className="p-2 rounded-md bg-gray-50 border-l-2 border-red-400"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium text-sm flex items-center">
                        {email.sender}
                        <Badge 
                          variant="outline" 
                          className="ml-2 text-xs bg-red-100 text-red-800"
                        >
                          Spam
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{email.time}</span>
                    </div>
                    <p className="text-sm mb-1 font-medium">{email.subject}</p>
                    <p className="text-xs text-muted-foreground truncate">{email.preview}</p>
                    <div className="flex gap-1 mt-1.5">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => removeFromSpam(email.id)}
                      >
                        Not Spam
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 ml-auto"
                        onClick={() => deleteEmail(email.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-3 text-muted-foreground text-sm">
                  No spam emails
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="timer" className="mt-3">
            <div className="text-center space-y-4 py-2">
              <div className="inline-flex items-center bg-gray-100 px-4 py-6 rounded-lg">
                <Clock className="h-6 w-6 mr-2 text-primary" />
                <span className="text-3xl font-mono font-bold">{formatTime(studyTime)}</span>
              </div>
              
              <div className="flex justify-center gap-2">
                {!isTimerActive ? (
                  <Button 
                    variant="default" 
                    onClick={startTimer}
                    className="px-4"
                  >
                    Start
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={stopTimer}
                    className="px-4"
                  >
                    Pause
                  </Button>
                )}
                <Button 
                  variant="destructive" 
                  onClick={resetTimer}
                  className="px-4"
                >
                  Reset
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">
                Track your study time to improve productivity
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AgentCard>
  );
};

export default EmailAgent;
