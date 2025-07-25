import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useApi } from '@/contexts/ApiContext';
import { 
  Brain, 
  FileText, 
  Search, 
  Tag, 
  Mail, 
  Video, 
  Zap,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isConfigured } = useApi();

  const quickActions = [
    {
      title: 'Humanize AI Content',
      description: 'Transform AI-generated text into natural, human-like content',
      icon: Brain,
      path: '/humanize',
      color: 'from-purple-500 to-purple-600',
      popular: true
    },
    {
      title: 'SEO Article Generator',
      description: 'Create comprehensive, SEO-optimized blog posts and articles',
      icon: FileText,
      path: '/seo-articles',
      color: 'from-blue-500 to-blue-600',
      popular: true
    },
    {
      title: 'Keyword Research',
      description: 'Discover high-value keywords for your content strategy',
      icon: Search,
      path: '/keywords',
      color: 'from-green-500 to-green-600',
      popular: true
    },
    {
      title: 'Meta Tag Optimizer',
      description: 'Generate perfect meta titles, descriptions, and OG tags',
      icon: Tag,
      path: '/meta-tags',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Email Outreach',
      description: 'Craft compelling cold emails that get responses',
      icon: Mail,
      path: '/email-outreach',
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'YouTube Scripts',
      description: 'Generate engaging video scripts with hooks and CTAs',
      icon: Video,
      path: '/youtube-scripts',
      color: 'from-red-500 to-red-600'
    }
  ];

  const stats = [
    { label: 'Tools Available', value: '10+', icon: Zap },
    { label: 'Content Generated', value: '1M+', icon: TrendingUp },
    { label: 'Happy Users', value: '50K+', icon: Users },
    { label: 'Time Saved', value: '10K hrs', icon: Clock }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center animate-glow-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gradient leading-tight">
          Welcome to Premio
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Your AI-powered suite for SEO and content creation.
        </p>

        {!isConfigured && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-warning font-medium mb-3">
              ⚡ Quick Setup Required
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Add your OpenRouter API key to unlock all features
            </p>
            <Button 
              variant="premium" 
              onClick={() => navigate('/settings')}
              className="w-full"
            >
              Configure API Key
            </Button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="card-premium p-4 text-center">
            <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gradient">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          <Button variant="ghost" size="sm">
            View All Tools <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="card-premium p-6 cursor-pointer group relative overflow-hidden"
              onClick={() => navigate(action.path)}
            >
              {action.popular && (
                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                    Popular
                  </span>
                </div>
              )}
              
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {action.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {action.description}
              </p>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-auto text-primary hover:text-primary-glow"
                disabled={!isConfigured}
              >
                Get Started <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Feature Highlight */}
      <div className="bg-gradient-primary rounded-2xl p-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-3">
            🚀 Powered by OpenRouter
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Access the latest AI models including GPT-4, Claude, and more. 
            Experience cutting-edge AI capabilities with enterprise-grade reliability.
          </p>
          <Button 
            variant="glass" 
            size="lg"
            onClick={() => window.open('https://openrouter.ai', '_blank')}
          >
            Learn More About OpenRouter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
