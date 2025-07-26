import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sparkles, 
  FileText, 
  Search, 
  Tag, 
  Mail, 
  Video, 
  Zap, 
  Settings,
  HelpCircle,
  BarChart3,
  Target,
  Brain,
  Shield,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { LucideProps } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<LucideProps>;
  color: string;
}

const tools: NavItem[] = [
  { label: 'Humanize AI', path: '/humanize', icon: Brain, color: 'text-purple-500' },
  { label: 'AI Detector', path: '/ai-detector', icon: Shield, color: 'text-emerald-500' },
  { label: 'SEO Articles', path: '/seo-articles', icon: FileText, color: 'text-blue-500' },
  { label: 'Keywords', path: '/keywords', icon: Search, color: 'text-green-500' },
  { label: 'Meta Tags', path: '/meta-tags', icon: Tag, color: 'text-orange-500' },
  { label: 'Email Outreach', path: '/email-outreach', icon: Mail, color: 'text-pink-500' },
  { label: 'YouTube Scripts', path: '/youtube-scripts', icon: Video, color: 'text-red-500' },
  { label: 'Prompt Generator', path: '/prompt-generator', icon: Zap, color: 'text-yellow-500' },
];

const bonusTools: NavItem[] = [
  { label: 'YouTube SEO', path: '/youtube-seo', icon: Video, color: 'text-red-500' },
  { label: 'YouTube Tags', path: '/youtube-tags', icon: Tag, color: 'text-cyan-500' },
  { label: 'Video Ideas', path: '/video-ideas', icon: Lightbulb, color: 'text-yellow-500' },
];

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  return (
    <div className={cn(
      "h-full bg-gradient-surface border border-border/30 backdrop-blur-md transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <NavLink to="/" className="no-underline">
          <div className={cn(
            "flex items-center gap-4 p-6 border-b border-border/50",
            isCollapsed ? "px-5 justify-center" : "px-4"
          )}>
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center glow-primary">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-2xl font-bold text-gradient">Premio</h1>
                <p className="text-xs text-muted-foreground">SEO Optimization Toolkit</p>
              </div>
            )}
          </div>
        </NavLink>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto" style={{ padding: isCollapsed ? '1rem 0.75rem' : '1rem' }}>
          {/* Core Tools */}
          <div className="mb-6">
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-4">
                Core Tools
              </h3>
            )}
            <nav className="space-y-1">
              {tools.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg transition-all duration-200 group",
                      isCollapsed ? "p-3 justify-center" : "px-4 py-3",
                      isActive 
                        ? "bg-primary/10 text-primary border-l-2 border-primary" 
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                    )
                  }
                >
                  <item.icon className={cn("transition-colors w-6 h-6", item.color)} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Bonus Tools & Settings */}
          <div>
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-4">
                Bonus Tools
              </h3>
            )}
            <nav className="space-y-1">
              {bonusTools.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg transition-all duration-200 group",
                      isCollapsed ? "p-3 justify-center" : "px-4 py-3",
                      isActive 
                        ? "bg-primary/10 text-primary border-l-2 border-primary" 
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                    )
                  }
                >
                  <item.icon className={cn("transition-colors w-6 h-6", item.color)} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </NavLink>
              ))}
              <NavLink
                to="/guide"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg transition-all duration-200 group",
                    isCollapsed ? "p-3 justify-center" : "px-4 py-3",
                    isActive
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                  )
                }
              >
                <HelpCircle className="w-6 h-6 text-blue-500" />
                {!isCollapsed && (
                  <span className="font-medium">Guide</span>
                )}
              </NavLink>
              {!isCollapsed && (
                <div className="border-t border-border/50 my-3" />
              )}
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg transition-all duration-200 w-full",
                    isCollapsed ? "p-3 justify-center" : "px-4 py-3",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                  )
                }
              >
                <Settings className="w-6 h-6" />
                {!isCollapsed && <span className="font-medium">Settings</span>}
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
