
import React from 'react';
import { Bell, Menu, Search, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  toggleSidebar: () => void;
  userInfo: {
    name: string;
    avatar?: string;
    initials: string;
    notifications: number;
  };
}

const Header = ({ toggleSidebar, userInfo }: HeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <header className="w-full py-3 px-4 border-b bg-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        
        {!isMobile && (
          <div className="relative max-w-md w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search across agents..." 
              className="pl-8"
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            {userInfo.notifications > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                variant="destructive"
              >
                {userInfo.notifications}
              </Badge>
            )}
          </Button>
        </div>
        
        <Avatar className="cursor-pointer">
          <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
          <AvatarFallback>{userInfo.initials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
