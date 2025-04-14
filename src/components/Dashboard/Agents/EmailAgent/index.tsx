
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import AgentCard from '../../AgentCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import EmailList from './EmailList';
import SpamList from './SpamList';
import { Email, EmailAgentProps } from './types';

const EmailAgent = ({ emails: initialEmails, status = 'idle', notifications = 0 }: EmailAgentProps) => {
  const { toast } = useToast();
  const [emails, setEmails] = useState<Email[]>(initialEmails);

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
          </TabsList>
          
          <TabsContent value="inbox" className="mt-3">
            <h3 className="text-sm font-medium mb-2">Important Emails</h3>
            <EmailList 
              emails={regularEmails} 
              deleteEmail={deleteEmail} 
              markAsSpam={markAsSpam} 
            />
          </TabsContent>
          
          <TabsContent value="spam" className="mt-3">
            <h3 className="text-sm font-medium mb-2">Spam Emails</h3>
            <SpamList 
              emails={spamEmails} 
              removeFromSpam={removeFromSpam} 
              deleteEmail={deleteEmail} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </AgentCard>
  );
};

export default EmailAgent;
