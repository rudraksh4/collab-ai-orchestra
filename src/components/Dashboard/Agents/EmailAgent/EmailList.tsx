
import React from 'react';
import { Star, Info, Archive, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Email } from './types';

interface EmailListProps {
  emails: Email[];
  deleteEmail: (id: string) => void;
  markAsSpam: (id: string) => void;
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-600',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const EmailList = ({ emails, deleteEmail, markAsSpam }: EmailListProps) => {
  return (
    <div className="space-y-2">
      {emails.length > 0 ? (
        emails.map((email) => (
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
  );
};

export default EmailList;
