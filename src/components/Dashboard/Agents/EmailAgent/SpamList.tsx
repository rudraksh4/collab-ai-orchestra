
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Email } from './types';

interface SpamListProps {
  emails: Email[];
  removeFromSpam: (id: string) => void;
  deleteEmail: (id: string) => void;
}

const SpamList = ({ emails, removeFromSpam, deleteEmail }: SpamListProps) => {
  return (
    <div className="space-y-2">
      {emails.length > 0 ? (
        emails.map((email) => (
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
  );
};

export default SpamList;
