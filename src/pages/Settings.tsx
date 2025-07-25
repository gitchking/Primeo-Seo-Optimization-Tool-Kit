import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useApi } from '@/contexts/ApiContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Settings as SettingsIcon, Key, Eye, EyeOff, ExternalLink, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { apiKey, setApiKey, isConfigured } = useApi();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  const handleSaveApiKey = () => {
    if (tempApiKey.trim()) {
      setApiKey(tempApiKey.trim());
      toast({
        title: "API Key Saved!",
        description: "Your OpenRouter API key has been saved successfully.",
      });
    } else {
      setApiKey('');
      toast({
        title: "API Key Removed",
        description: "Your OpenRouter API key has been removed.",
        variant: "destructive"
      });
    }
  };

  const handleTestApiKey = async () => {
    if (!tempApiKey.trim()) {
      toast({
        title: "No API Key",
        description: "Please enter an API key to test.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tempApiKey.trim()}`,
        }
      });

      if (response.ok) {
        toast({
          title: "API Key Valid!",
          description: "Your OpenRouter API key is working correctly.",
        });
      } else {
        toast({
          title: "Invalid API Key",
          description: "The API key appears to be invalid or expired.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Could not verify API key. Please check your connection.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
          <SettingsIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">Settings</h1>
          <p className="text-muted-foreground">Configure your Premio experience</p>
        </div>
      </div>

      {/* API Configuration */}
      <Card className="card-premium p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">OpenRouter API Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Connect your OpenRouter account to unlock all AI-powered features
              </p>
            </div>
            {isConfigured && (
              <CheckCircle className="w-5 h-5 text-success ml-auto" />
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">OpenRouter API Key</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="apiKey"
                    type={showApiKey ? "text" : "password"}
                    placeholder="sk-or-v1-..."
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <Button variant="outline" onClick={handleTestApiKey}>
                  Test
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your API key is stored locally in your browser and never sent to our servers.
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="premium" 
                onClick={handleSaveApiKey}
                className="flex-1"
              >
                Save API Key
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open('https://openrouter.ai/keys', '_blank')}
              >
                Get API Key <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* API Info */}
          <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
            <h4 className="font-medium mb-2">About OpenRouter</h4>
            <p className="text-sm text-muted-foreground mb-3">
              OpenRouter provides access to multiple AI models including GPT-4, Claude, and more. 
              You only pay for what you use with transparent, per-token pricing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-primary">Features:</h5>
                <ul className="text-muted-foreground space-y-1 mt-1">
                  <li>• Multiple AI models</li>
                  <li>• Pay-per-use pricing</li>
                  <li>• No monthly subscriptions</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-primary">Recommended Models:</h5>
                <ul className="text-muted-foreground space-y-1 mt-1">
                  <li>• GPT-4o-mini (fast & affordable)</li>
                  <li>• Claude-3-haiku (balanced)</li>
                  <li>• GPT-4o (premium quality)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Appearance Settings */}
      <Card className="card-premium p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Appearance</h3>
            <p className="text-sm text-muted-foreground">
              Customize the look and feel of Premio
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="theme-toggle" className="text-sm font-medium">
                Dark Mode
              </Label>
              <p className="text-xs text-muted-foreground">
                Switch between light and dark themes
              </p>
            </div>
            <Switch
              id="theme-toggle"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>
      </Card>

      {/* About */}
      <Card className="card-premium p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">About Premio</h3>
            <p className="text-sm text-muted-foreground">
              Version 1.0.0 - Premium AI-powered SEO and content creation suite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-primary mb-2">Features:</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• AI content humanization</li>
                <li>• SEO article generation</li>
                <li>• Keyword research</li>
                <li>• Meta tag optimization</li>
                <li>• Email outreach templates</li>
                <li>• YouTube script creation</li>
                <li>• Prompt generation</li>
                <li>• And much more...</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-primary mb-2">Built With:</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• React + TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• OpenRouter API</li>
                <li>• Radix UI Components</li>
                <li>• Framer Motion</li>
                <li>• Premium Design System</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;