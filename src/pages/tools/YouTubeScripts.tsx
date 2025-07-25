import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApi } from '@/contexts/ApiContext';
import { openRouterAPI } from '@/services/openRouterApi';
import { Video, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const YouTubeScripts: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('educational');
  const [duration, setDuration] = useState('5-10');
  const [audience, setAudience] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey, isConfigured } = useApi();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a video topic to generate a script.",
        variant: "destructive"
      });
      return;
    }

    if (!isConfigured) {
      toast({
        title: "API Key Required",
        description: "Please configure your OpenRouter API key in settings.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const prompt = `Create a compelling YouTube video script for:

Topic: ${topic}
Style: ${style}
Duration: ${duration} minutes
${audience ? `Target Audience: ${audience}` : ''}

Structure the script with:
1. Hook (first 15 seconds)
2. Introduction
3. Main content sections
4. Call-to-action
5. Outro

Include:
- Engaging opening hook to grab attention
- Clear transitions between sections
- Practical tips and actionable advice
- Engagement prompts (like, subscribe, comment)
- Strong call-to-action
- Visual/editing notes where helpful

Make it conversational and engaging for YouTube audience.`;

      const systemPrompt = `You are an expert YouTube script writer who creates viral, engaging content. Focus on:

1. Powerful hooks that stop scrollers
2. Storytelling techniques that maintain retention
3. Clear structure with smooth transitions
4. Audience engagement throughout
5. Strategic CTAs placement
6. Conversational, energetic tone
7. Visual suggestions for editors

Create scripts that maximize watch time, engagement, and subscriber growth.`;

      const result = await openRouterAPI.generateContent(prompt, systemPrompt, apiKey, {
        model: 'openai/gpt-4o-mini',
        temperature: 0.8,
        maxTokens: 2500
      });
      
      setOutput(result);
      toast({
        title: "Script Generated!",
        description: "Your YouTube video script has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate script",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "YouTube script copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
          <Video className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">YouTube Script Generator</h1>
          <p className="text-muted-foreground">Generate engaging video scripts with hooks and CTAs</p>
        </div>
      </div>

      {/* Input Form */}
      <Card className="card-premium p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Video Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g., 5 ChatGPT Prompts That Will Change Your Life"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="style">Video Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="tutorial">Tutorial/How-to</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="vlog">Vlog</SelectItem>
                  <SelectItem value="motivational">Motivational</SelectItem>
                  <SelectItem value="news">News/Commentary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Video Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-3">1-3 minutes (Short)</SelectItem>
                  <SelectItem value="5-10">5-10 minutes (Standard)</SelectItem>
                  <SelectItem value="10-15">10-15 minutes (Long-form)</SelectItem>
                  <SelectItem value="15+">15+ minutes (Deep dive)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience (Optional)</Label>
              <Textarea
                id="audience"
                placeholder="e.g., Entrepreneurs, students, beginners in digital marketing..."
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        </div>
        
        <Button 
          variant="premium" 
          onClick={handleGenerate}
          disabled={isLoading || !isConfigured}
          className="w-full mt-6"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating Script...
            </>
          ) : (
            <>
              <Video className="w-4 h-4 mr-2" />
              Generate YouTube Script
            </>
          )}
        </Button>
      </Card>

      {/* Output Section */}
      {output && (
        <Card className="card-premium p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Generated YouTube Script</h3>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Script
              </Button>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {output}
              </pre>
            </div>
          </div>
        </Card>
      )}

      {/* YouTube Tips */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold mb-4">🎥 YouTube Success Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Hook Strategies:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Start with the payoff</li>
              <li>• Use pattern interrupts</li>
              <li>• Ask compelling questions</li>
              <li>• Make bold statements</li>
              <li>• Create curiosity gaps</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Retention Tips:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Use quick cuts and transitions</li>
              <li>• Vary your delivery pace</li>
              <li>• Include visual elements</li>
              <li>• Break content into segments</li>
              <li>• Use cliffhangers</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Engagement Tactics:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Ask questions throughout</li>
              <li>• Request specific actions</li>
              <li>• Create polls in comments</li>
              <li>• Share personal stories</li>
              <li>• Include clear CTAs</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default YouTubeScripts;