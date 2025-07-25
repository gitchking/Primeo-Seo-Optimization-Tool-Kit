import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useApi } from '@/contexts/ApiContext';
import { openRouterAPI } from '@/services/openRouterApi';
import { Brain, Copy, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HumanizeAI: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey, isConfigured } = useApi();
  const { toast } = useToast();

  const handleHumanize = async () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some AI-generated content to humanize.",
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
      const result = await openRouterAPI.humanizeContent(input, apiKey);
      setOutput(result);
      toast({
        title: "Content Humanized!",
        description: "Your AI content has been successfully humanized.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to humanize content",
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
      description: "Humanized content copied to clipboard.",
    });
  };

  const downloadText = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'humanized-content.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">Humanize AI Content</h1>
          <p className="text-muted-foreground">Transform AI-generated text into natural, human-like content</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="card-premium p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">AI-Generated Content</h3>
              <span className="text-sm text-muted-foreground">
                {input.length} characters
              </span>
            </div>
            
            <Textarea
              placeholder="Paste your AI-generated content here. The tool will make it sound more natural and human-written..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[300px] resize-none"
            />
            
            <div className="flex gap-3">
              <Button 
                variant="premium" 
                onClick={handleHumanize}
                disabled={isLoading || !isConfigured}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Humanizing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Humanize Content
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setInput('')}
                disabled={!input}
              >
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {/* Output Section */}
        <Card className="card-premium p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Humanized Content</h3>
              {output && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={downloadText}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="h-[300px] p-4 bg-muted/30 rounded-lg border border-border/50 overflow-y-auto">
              {output ? (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {output}
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Your humanized content will appear here...
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Tips Section */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold mb-4">💡 Tips for Better Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-medium text-primary">Best Practices:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Use complete paragraphs or sections</li>
              <li>• Include context when possible</li>
              <li>• Longer content generally produces better results</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-primary">What This Tool Does:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Removes robotic language patterns</li>
              <li>• Adds natural flow and personality</li>
              <li>• Varies sentence structure</li>
              <li>• Maintains original meaning</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HumanizeAI;