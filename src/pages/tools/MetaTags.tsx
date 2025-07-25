import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useApi } from '@/contexts/ApiContext';
import { openRouterAPI } from '@/services/openRouterApi';
import { Tag, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MetaTags: React.FC = () => {
  const [pageTitle, setPageTitle] = useState('');
  const [pageDescription, setPageDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey, isConfigured } = useApi();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!pageTitle.trim()) {
      toast({
        title: "Page Title Required",
        description: "Please enter a page title to generate meta tags.",
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
      const prompt = `Generate comprehensive meta tags for a webpage with the following details:

Page Title: ${pageTitle}
${pageDescription ? `Page Description: ${pageDescription}` : ''}
${keywords ? `Keywords: ${keywords}` : ''}

Please provide:
1. 🎯 Optimized meta title (55-60 characters) - Make it compelling and click-worthy
2. 📝 Meta description (150-160 characters) - Include emotional triggers and CTAs
3. Open Graph tags for social sharing
4. Twitter Card tags
5. Additional relevant meta tags
6. JSON-LD structured data (if applicable)
7. 🚀 Alternative title variations for A/B testing
8. ✨ Engaging social media snippets

Format the output as clean, well-organized HTML with emojis and clear sections that can be copied directly into the <head> section.`;

      const systemPrompt = `You are an expert SEO specialist and conversion optimization expert. Generate clean, optimized meta tags that improve search engine visibility and social media sharing. Focus on:

1. SEO best practices
2. Character limits for titles and descriptions
3. Compelling copy that improves CTR with emotional triggers
4. Proper Open Graph implementation
5. Complete Twitter Card setup
6. Schema.org structured data when relevant
7. Psychological triggers for higher engagement
8. A/B testing variations
9. Visual appeal with strategic formatting

Return well-organized HTML meta tags with clear sections, emojis for visual appeal, and ready-to-use code.`;

      const result = await openRouterAPI.generateContent(prompt, systemPrompt, apiKey, {
        model: 'openai/gpt-4o-mini',
        temperature: 0.3,
        maxTokens: 1500
      });
      
      setOutput(result);
      toast({
        title: "Meta Tags Generated!",
        description: "Your optimized meta tags have been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate meta tags",
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
      description: "Meta tags copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
          <Tag className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">Meta Tag Optimizer</h1>
          <p className="text-muted-foreground">Generate perfect meta titles, descriptions, and social tags</p>
        </div>
      </div>

      {/* Input Form */}
      <Card className="card-premium p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pageTitle">Page Title *</Label>
            <Input
              id="pageTitle"
              placeholder="e.g., Ultimate Guide to Digital Marketing in 2024"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pageDescription">Page Description (Optional)</Label>
            <Textarea
              id="pageDescription"
              placeholder="Brief description of what this page is about..."
              value={pageDescription}
              onChange={(e) => setPageDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="keywords">Target Keywords (Optional)</Label>
            <Input
              id="keywords"
              placeholder="e.g., digital marketing, SEO, content strategy"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
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
                Generating Meta Tags...
              </>
            ) : (
              <>
                <Tag className="w-4 h-4 mr-2" />
                Generate Meta Tags
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
              <h3 className="text-lg font-semibold">Generated Meta Tags</h3>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy HTML
              </Button>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50 max-h-96 overflow-y-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          </div>
        </Card>
      )}

      {/* Meta Tags Guide */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold mb-4">📋 Meta Tags Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Title Tag Guidelines:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Keep under 60 characters</li>
              <li>• Include primary keyword near the beginning</li>
              <li>• Make it compelling and clickable</li>
              <li>• Avoid keyword stuffing</li>
              <li>• Each page should have a unique title</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Meta Description Tips:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Aim for 150-160 characters</li>
              <li>• Include a clear call-to-action</li>
              <li>• Summarize page content accurately</li>
              <li>• Use action words to increase CTR</li>
              <li>• Include target keywords naturally</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MetaTags;