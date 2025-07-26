import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApi } from '@/contexts/ApiContext';
import { openRouterAPI } from '@/services/openRouterApi';
import { Tag, Copy, RefreshCw, TrendingUp, Hash, Eye, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface TagSuggestion {
  tag: string;
  volume: string;
  competition: string;
  trending: boolean;
}

const YouTubeTags: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('general');
  const [language, setLanguage] = useState('en');
  const [output, setOutput] = useState('');
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<TagSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const { apiKey, isConfigured } = useApi();
  const { toast } = useToast();

  const fetchYouTubeSuggestions = async () => {
    if (!keyword.trim()) return;

    setIsLoadingSuggestions(true);
    try {
      const response = await fetch(`https://tuber.vercel.app/api/youtube-search-suggestions?q=${encodeURIComponent(keyword)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      const data = await response.json();
      
      const formattedSuggestions: TagSuggestion[] = data.suggestions.map((tag: string) => ({
        tag,
        volume: 'N/A',
        competition: 'N/A',
        trending: false,
      }));

      setSuggestions(formattedSuggestions);
      toast({
        title: "🔥 Suggestions Loaded!",
        description: "YouTube trending tags fetched successfully.",
      });
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch YouTube suggestions.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleGenerate = async () => {
    if (!keyword.trim()) {
      toast({
        title: "Keyword Required",
        description: "Please enter a keyword to generate YouTube tags.",
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
      const prompt = `Generate a comma-separated list of highly effective YouTube tags for the keyword "${keyword}" in the ${category} category (${language} language). The list should be ready to be copied and pasted directly into the YouTube tags section. Provide a comprehensive list of tags including primary, trending, long-tail, and format-specific tags. Do not include any titles, categories, or any formatting other than the comma-separated tags. For example: tag1, tag2, tag3, tag4, tag5`;

      const systemPrompt = `You are a YouTube SEO expert. Your task is to generate a clean, comma-separated list of YouTube tags. The output must be only the tags separated by commas, with no extra text, titles, or formatting.`;

      const result = await openRouterAPI.generateContent(prompt, systemPrompt, apiKey, {
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000,
        humanize: true
      });
      
      const tags = result.split(',').map(tag => tag.trim()).filter(tag => tag);
      setGeneratedTags(tags); // Keep the array for potential future use
      setOutput(tags.join(', ')); // Create a CSV string for display
      toast({
        title: "🏷️ Tags Generated!",
        description: "Your YouTube tags are ready to boost discoverability!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate YouTube tags",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedTags.join(', '));
    toast({
      title: "📋 Copied!",
      description: "YouTube tags copied to clipboard.",
    });
  };

  const handleTagClick = (tag: string) => {
    setKeyword(tag);
    toast({
      title: "✨ Tag Applied!",
      description: "Keyword updated with suggestion.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center glow-primary">
          <Hash className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">🏷️ YouTube Tags Generator</h1>
          <p className="text-muted-foreground">Generate trending tags that boost your video discoverability</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="card-premium p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keyword">🎯 Main Keyword *</Label>
              <div className="flex gap-2">
                <Input
                  id="keyword"
                  placeholder="e.g., digital marketing"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  onClick={fetchYouTubeSuggestions}
                  disabled={isLoadingSuggestions || !keyword.trim()}
                  size="sm"
                >
                  {isLoadingSuggestions ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <TrendingUp className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">📂 Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">🌐 General</SelectItem>
                  <SelectItem value="tech">💻 Technology</SelectItem>
                  <SelectItem value="gaming">🎮 Gaming</SelectItem>
                  <SelectItem value="education">📚 Education</SelectItem>
                  <SelectItem value="entertainment">🎭 Entertainment</SelectItem>
                  <SelectItem value="lifestyle">✨ Lifestyle</SelectItem>
                  <SelectItem value="business">💼 Business</SelectItem>
                  <SelectItem value="health">🏥 Health & Fitness</SelectItem>
                  <SelectItem value="travel">✈️ Travel</SelectItem>
                  <SelectItem value="food">🍳 Food & Cooking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">🌍 Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                  <SelectItem value="fr">🇫🇷 French</SelectItem>
                  <SelectItem value="de">🇩🇪 German</SelectItem>
                  <SelectItem value="it">🇮🇹 Italian</SelectItem>
                  <SelectItem value="pt">🇧🇷 Portuguese</SelectItem>
                  <SelectItem value="ja">🇯🇵 Japanese</SelectItem>
                  <SelectItem value="ko">🇰🇷 Korean</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {suggestions.length > 0 && (
            <div className="space-y-2 mt-4">
              <Label>💡 YouTube Trending Suggestions</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handleTagClick(suggestion.tag)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{suggestion.tag}</p>
                        {suggestion.trending && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            🔥 Trending
                          </span>
                        )}
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {suggestion.volume}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {suggestion.competition}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Button 
            variant="premium" 
            onClick={handleGenerate}
            disabled={isLoading || !isConfigured}
            className="w-full mt-6"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                🚀 Generating Trending Tags...
              </>
            ) : (
              <>
                <Hash className="w-4 h-4 mr-2" />
                🏷️ Generate YouTube Tags
              </>
            )}
          </Button>
        </Card>

        {/* Output Section */}
        <Card className="card-premium p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">🎉 Your Trending YouTube Tags</h3>
              <Button variant="ghost" size="sm" onClick={copyToClipboard} disabled={!output}>
                <Copy className="w-4 h-4 mr-2" />
                📋 Copy Tags
              </Button>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg border border-border/50 min-h-[200px]">
              <p className="text-sm text-muted-foreground">{output || 'Your generated tags will appear here...'}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* YouTube Tags Tips */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold mb-4">🚀 YouTube Tags Mastery Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Hash className="w-4 h-4" />
              🎯 Tag Strategy
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• 🏷️ Use 10-15 tags maximum</li>
              <li>• 🎯 Mix broad and specific tags</li>
              <li>• 🔥 Include trending keywords</li>
              <li>• 📈 Target different search intents</li>
              <li>• ✨ Add seasonal/timely tags</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <TrendingUp className="w-4 h-4" />
              📊 Tag Types
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• 🎯 Primary: Main topic tags</li>
              <li>• 🔥 Trending: Viral keywords</li>
              <li>• 📝 Long-tail: Specific phrases</li>
              <li>• 🎬 Format: Content type tags</li>
              <li>• 💎 Bonus: Strategic additions</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Eye className="w-4 h-4" />
              🎨 Best Practices
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• 🚫 Avoid misleading tags</li>
              <li>• 🎯 Match video content exactly</li>
              <li>• 📊 Research competitor tags</li>
              <li>• 🔄 Update tags regularly</li>
              <li>• 📈 Monitor performance metrics</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default YouTubeTags;
