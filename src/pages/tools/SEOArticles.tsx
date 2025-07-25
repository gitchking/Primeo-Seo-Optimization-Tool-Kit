import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApi } from '@/contexts/ApiContext';
import { openRouterAPI } from '@/services/openRouterApi';
import { FileText, Copy, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SEOArticles: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [wordCount, setWordCount] = useState('1000');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey, isConfigured } = useApi();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for your SEO article.",
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
      const prompt = `Write a comprehensive SEO-optimized article about "${topic}". 

Requirements:
- Tone: ${tone}
- Target word count: ${wordCount} words
- Include an engaging introduction with a hook
- Use H2 and H3 headings for structure
- Add a compelling conclusion with call-to-action
- Naturally integrate relevant keywords
- Focus on providing real value to readers
- Make it scannable with bullet points and short paragraphs
- Include actionable insights

The article should rank well in search engines while being genuinely helpful and engaging for readers.`;

      const result = await openRouterAPI.generateSEOContent(prompt, apiKey);
      setOutput(result);
      toast({
        title: "Article Generated!",
        description: "Your SEO-optimized article has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate article",
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
      description: "Article copied to clipboard.",
    });
  };

  const downloadText = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-article-${topic.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">SEO Article Generator</h1>
          <p className="text-muted-foreground">Create comprehensive, SEO-optimized blog posts and articles</p>
        </div>
      </div>

      {/* Input Form */}
      <Card className="card-premium p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Article Topic *</Label>
            <Input
              id="topic"
              placeholder="e.g., Digital Marketing Strategies for 2024"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="conversational">Conversational</SelectItem>
                <SelectItem value="authoritative">Authoritative</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wordCount">Target Word Count</Label>
            <Select value={wordCount} onValueChange={setWordCount}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="500">500 words</SelectItem>
                <SelectItem value="1000">1,000 words</SelectItem>
                <SelectItem value="1500">1,500 words</SelectItem>
                <SelectItem value="2000">2,000 words</SelectItem>
                <SelectItem value="2500">2,500 words</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button 
            variant="premium" 
            onClick={handleGenerate}
            disabled={isLoading || !isConfigured}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating Article...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Generate SEO Article
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
              <h3 className="text-lg font-semibold">Generated Article</h3>
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

      {/* SEO Tips Section */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold mb-4">🎯 SEO Article Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Content Structure:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Compelling headline with target keyword</li>
              <li>• Engaging introduction with hook</li>
              <li>• Clear H2/H3 heading hierarchy</li>
              <li>• Scannable content with bullet points</li>
              <li>• Strong conclusion with CTA</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-primary">SEO Optimization:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Natural keyword integration</li>
              <li>• Focus on search intent</li>
              <li>• Include related keywords</li>
              <li>• Optimize for featured snippets</li>
              <li>• Add internal linking opportunities</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SEOArticles;