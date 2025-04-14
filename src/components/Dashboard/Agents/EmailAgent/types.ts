
export interface Email {
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

export interface EmailAgentProps {
  emails: Email[];
  status?: 'idle' | 'working' | 'completed';
  notifications?: number;
}
