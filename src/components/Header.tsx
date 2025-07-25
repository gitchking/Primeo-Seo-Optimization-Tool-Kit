import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Menu, Sun, Moon, Sparkles, ArrowRight, LogOut, User as UserIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useApi } from '@/contexts/ApiContext';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from '@/lib/firebase';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const { theme, toggleTheme } = useTheme();
  const { isConfigured } = useApi();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-card/80 backdrop-blur-md border-b border-border/50 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hover:bg-muted/50"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        {/* API Status Indicator */}
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
          isConfigured 
            ? "bg-success/10 text-success border border-success/20" 
            : "bg-warning/10 text-warning border border-warning/20"
        )}>
          <div className={cn(
            "w-2 h-2 rounded-full",
            isConfigured ? "bg-success animate-pulse" : "bg-warning animate-pulse"
          )} />
          {isConfigured ? "API Connected" : "API Not Set"}
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-4">
          <Sun className="w-4 h-4 text-muted-foreground" />
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
            className="data-[state=checked]:bg-primary"
          />
          <Moon className="w-4 h-4 text-muted-foreground" />
          
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || 'User'} />
                    <AvatarFallback>{currentUser.displayName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-black" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.displayName || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="premium" 
              size="sm"
              className="ml-2"
              onClick={() => navigate('/login')}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
