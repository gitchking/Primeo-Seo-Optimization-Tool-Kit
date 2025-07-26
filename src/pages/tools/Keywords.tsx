import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApi } from '@/contexts/ApiContext';
import { openRouterAPI } from '@/services/openRouterApi';
import { Search, Copy, Download, RefreshCw, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Keywords: React.FC = () => {
  const [seedKeyword, setSeedKeyword] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey, isConfigured } = useApi();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!seedKeyword.trim()) {
      toast({
        title: "Keyword Required",
        description: "Please enter a seed keyword to generate related keywords.",
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
      const result = await openRouterAPI.generateKeywords(seedKeyword, apiKey);
      setOutput(result);
      toast({
        title: "Keywords Generated!",
        description: "Your keyword research has been completed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate keywords",
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
      description: "Keywords copied to clipboard.",
    });
  };

  const downloadText = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keywords-${seedKeyword.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const quickKeywords = [
    'digital marketing',
    'content strategy',
    'SEO optimization',
    'social media marketing',
    'email marketing',
    'brand awareness'
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <Search className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">Keyword Research Tool</h1>
          <p className="text-muted-foreground">Discover high-value keywords for your content strategy</p>
        </div>
      </div>

      {/* Input Form */}
      <Card className="card-premium p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seedKeyword">Seed Keyword *</Label>
            <Input
              id="seedKeyword"
              placeholder="e.g., digital marketing, fitness, cryptocurrency"
              value={seedKeyword}
              onChange={(e) => setSeedKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Quick Start Examples:</Label>
            <div className="flex flex-wrap gap-2">
              {quickKeywords.map((keyword) => (
                <Button
                  key={keyword}
                  variant="outline"
                  size="sm"
                  onClick={() => setSeedKeyword(keyword)}
                  className="text-xs"
                >
                  {keyword}
                </Button>
              ))}
            </div>
          </div>
          
          <Button 
            variant="premium" 
            onClick={handleGenerate}
            disabled={isLoading || !isConfigured}
            className="w-full"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Researching Keywords...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Generate Keywords
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Output Section */}
      {output && (
        <Card className="card-premium p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Keyword Research Results</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="ghost" size="sm" onClick={downloadText}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            
            <div className="p-6 bg-muted/30 rounded-lg border border-border/50 max-h-96 overflow-y-auto">
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {output}
                </pre>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Keyword Research Tips */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold mb-4">🎯 Keyword Research Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <TrendingUp className="w-4 h-4" />
              Search Intent Types
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <strong>Informational:</strong> "How to", "What is"</li>
              <li>• <strong>Commercial:</strong> "Best", "Reviews"</li>
              <li>• <strong>Transactional:</strong> "Buy", "Purchase"</li>
              <li>• <strong>Navigational:</strong> Brand names</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Search className="w-4 h-4" />
              Keyword Types
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <strong>Short-tail:</strong> 1-2 words</li>
              <li>• <strong>Long-tail:</strong> 3+ words</li>
              <li>• <strong>LSI Keywords:</strong> Semantic variants</li>
              <li>• <strong>Questions:</strong> FAQ opportunities</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <TrendingUp className="w-4 h-4" />
              Optimization Tips
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Focus on search volume + difficulty</li>
              <li>• Target user intent alignment</li>
              <li>• Create keyword clusters</li>
              <li>• Monitor competitor keywords</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Keywords;