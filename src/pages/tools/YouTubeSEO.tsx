import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApi } from '@/contexts/ApiContext';
import { openRouterAPI } from '@/services/openRouterApi';
import { Video, Copy, RefreshCw, TrendingUp, Eye, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface YouTubeSuggestion {
  title: string;
  searchVolume: string;
  competition: string;
}

const YouTubeSEO: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [videoType, setVideoType] = useState('educational');
  const [output, setOutput] = useState('');
  const [suggestions, setSuggestions] = useState<YouTubeSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const { apiKey, isConfigured } = useApi();
  const { toast } = useToast();

  const fetchYouTubeSuggestions = async () => {
    if (!topic.trim()) return;
    
    setIsLoadingSuggestions(true);
    try {
      // Simulate YouTube API suggestions (in real implementation, you'd use YouTube Data API)
      const mockSuggestions: YouTubeSuggestion[] = [
        { title: `${topic} tutorial for beginners`, searchVolume: 'High', competition: 'Medium' },
        { title: `How to ${topic} in 2024`, searchVolume: 'Very High', competition: 'High' },
        { title: `${topic} tips and tricks`, searchVolume: 'Medium', competition: 'Low' },
        { title: `Best ${topic} strategies`, searchVolume: 'High', competition: 'Medium' },
        { title: `${topic} mistakes to avoid`, searchVolume: 'Medium', competition: 'Low' }
      ];
      
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a video topic to generate YouTube SEO content.",
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
      const prompt = `Create highly engaging YouTube SEO content for:

📹 Topic: ${topic}
🎯 Niche: ${niche || 'General'}
👥 Target Audience: ${targetAudience || 'General audience'}
📱 Video Type: ${videoType}

Generate:

1. **5 VIRAL TITLE OPTIONS** (60 characters max each):
   - Use power words, numbers, and emotional triggers
   - Include trending keywords
   - Make them click-worthy and curiosity-driven
   - Add relevant emojis

2. **OPTIMIZED DESCRIPTION** (2000+ characters):
   - Hook in first 125 characters
   - Detailed video breakdown with timestamps
   - Call-to-actions throughout
   - Relevant hashtags (10-15)
   - Social media links placeholders
   - Subscribe reminder
   - Use emojis strategically

3. **TAGS** (15-20 relevant tags):
   - Mix of broad and specific keywords
   - Include trending terms
   - Long-tail variations

4. **THUMBNAIL IDEAS** (3 concepts):
   - Visual elements suggestions
   - Text overlay ideas
   - Color schemes

Make everything highly engaging, creative, and optimized for YouTube algorithm!`;

      const systemPrompt = `You are a YouTube SEO expert and viral content creator. Create content that:

🎯 MAXIMIZES click-through rates with irresistible titles
📈 BOOSTS search rankings with strategic keyword placement  
🔥 DRIVES engagement with compelling descriptions
✨ USES emojis and formatting for visual appeal
🚀 FOLLOWS YouTube best practices for algorithm optimization

Focus on:
- Emotional triggers in titles
- Strategic keyword density
- Engaging call-to-actions
- Visual formatting with emojis
- Trending terminology
- Audience retention tactics

Make everything feel fresh, exciting, and professional!`;

      const result = await openRouterAPI.generateContent(prompt, systemPrompt, apiKey, {
        model: 'openai/gpt-4o-mini',
        temperature: 0.8,
        maxTokens: 3000
      });
      
      setOutput(result);
      toast({
        title: "🎉 YouTube SEO Generated!",
        description: "Your viral YouTube content is ready to boost your views!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate YouTube SEO content",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    toast({
      title: "📋 Copied!",
      description: "YouTube SEO content copied to clipboard.",
    });
  };

  const useSuggestion = (suggestion: YouTubeSuggestion) => {
    setTopic(suggestion.title);
    toast({
      title: "✨ Suggestion Applied!",
      description: "Topic updated with YouTube suggestion.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center glow-primary">
          <Video className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">🎬 YouTube SEO Generator</h1>
          <p className="text-muted-foreground">Create viral titles, descriptions & tags that boost your views</p>
        </div>
      </div>

      {/* Input Form */}
      <Card className="card-premium p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">🎯 Video Topic *</Label>
              <div className="flex gap-2">
                <Input
                  id="topic"
                  placeholder="e.g., ChatGPT productivity hacks"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  onClick={fetchYouTubeSuggestions}
                  disabled={isLoadingSuggestions || !topic.trim()}
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
              <Label htmlFor="niche">🏷️ Niche/Category</Label>
              <Input
                id="niche"
                placeholder="e.g., Tech, Fitness, Business"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="videoType">📱 Video Type</Label>
              <Select value={videoType} onValueChange={setVideoType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="educational">📚 Educational</SelectItem>
                  <SelectItem value="entertainment">🎭 Entertainment</SelectItem>
                  <SelectItem value="tutorial">🛠️ Tutorial/How-to</SelectItem>
                  <SelectItem value="review">⭐ Review</SelectItem>
                  <SelectItem value="vlog">📹 Vlog</SelectItem>
                  <SelectItem value="news">📰 News/Commentary</SelectItem>
                  <SelectItem value="gaming">🎮 Gaming</SelectItem>
                  <SelectItem value="lifestyle">✨ Lifestyle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="targetAudience">👥 Target Audience</Label>
              <Textarea
                id="targetAudience"
                placeholder="e.g., Young professionals, students, entrepreneurs..."
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                rows={3}
              />
            </div>
            
            {/* YouTube Suggestions */}
            {suggestions.length > 0 && (
              <div className="space-y-2">
                <Label>💡 YouTube Trending Suggestions</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => useSuggestion(suggestion)}
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium">{suggestion.title}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {suggestion.searchVolume}
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
              🚀 Generating Viral Content...
            </>
          ) : (
            <>
              <Video className="w-4 h-4 mr-2" />
              🎬 Generate YouTube SEO Content
            </>
          )}
        </Button>
      </Card>

      {/* Output Section */}
      {output && (
        <Card className="card-premium p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">🎉 Your Viral YouTube Content</h3>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                📋 Copy All
              </Button>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg border border-border/50 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {output}
              </pre>
            </div>
          </div>
        </Card>
      )}

      {/* YouTube SEO Tips */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold mb-4">🚀 YouTube SEO Mastery Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Video className="w-4 h-4" />
              🎯 Title Optimization
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• 📏 Keep under 60 characters</li>
              <li>• 🔥 Use power words & numbers</li>
              <li>• 😮 Create curiosity gaps</li>
              <li>• 🎯 Include main keyword early</li>
              <li>• ✨ Add relevant emojis</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <TrendingUp className="w-4 h-4" />
              📝 Description Strategy
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• 🎣 Hook in first 125 characters</li>
              <li>• ⏰ Include timestamps</li>
              <li>• 🔗 Add relevant links</li>
              <li>• #️⃣ Use 10-15 hashtags</li>
              <li>• 📢 Multiple CTAs</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Eye className="w-4 h-4" />
              🏷️ Tags & Thumbnails
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• 🎯 Mix broad & specific tags</li>
              <li>• 📈 Include trending keywords</li>
              <li>• 🖼️ Eye-catching thumbnails</li>
              <li>• 🎨 Consistent branding</li>
              <li>• 📊 A/B test variations</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default YouTubeSEO;