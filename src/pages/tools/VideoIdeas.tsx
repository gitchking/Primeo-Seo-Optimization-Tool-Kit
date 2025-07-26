import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApi } from '@/contexts/ApiContext';
import { openRouterAPI } from '@/services/openRouterApi';
import { Lightbulb, Copy, RefreshCw, TrendingUp, Play, Eye, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VideoIdea {
  title: string;
  description: string;
  estimatedViews: string;
  difficulty: string;
  trending: boolean;
}

const VideoIdeas: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [category, setCategory] = useState('general');
  const [audience, setAudience] = useState('general');
  const [output, setOutput] = useState('');
  const [trendingIdeas, setTrendingIdeas] = useState<VideoIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const { apiKey, isConfigured } = useApi();
  const { toast } = useToast();

  const fetchTrendingIdeas = async () => {
    setIsLoadingTrending(true);
    try {
      // Simulate trending video ideas from various APIs
      const mockTrendingIdeas: VideoIdea[] = [
        {
          title: "24 Hours Living Like a Millionaire",
          description: "Challenge video with luxury lifestyle",
          estimatedViews: "2M+",
          difficulty: "Medium",
          trending: true
        },
        {
          title: "AI Tools That Will Replace Your Job in 2024",
          description: "Tech review and predictions",
          estimatedViews: "800K+",
          difficulty: "Easy",
          trending: true
        },
        {
          title: "I Tried Every Viral TikTok Life Hack",
          description: "Testing popular social media trends",
          estimatedViews: "1.5M+",
          difficulty: "Easy",
          trending: true
        },
        {
          title: "Building a $10,000 Gaming Setup",
          description: "Tech build and review content",
          estimatedViews: "600K+",
          difficulty: "Medium",
          trending: false
        },
        {
          title: "Reacting to My First YouTube Video",
          description: "Nostalgic reaction content",
          estimatedViews: "400K+",
          difficulty: "Easy",
          trending: false
        }
      ];
      
      // Shuffle the array to simulate a refresh
      const shuffledIdeas = mockTrendingIdeas.sort(() => Math.random() - 0.5);
      
      setTrendingIdeas(shuffledIdeas);
      toast({
        title: "🔥 Trending Ideas Loaded!",
        description: "Latest viral video concepts fetched successfully.",
      });
    } catch (error) {
      console.error('Error fetching trending ideas:', error);
      toast({
        title: "Error",
        description: "Failed to fetch trending video ideas.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingTrending(false);
    }
  };

  const handleGenerate = async () => {
    if (!niche.trim()) {
      toast({
        title: "Niche Required",
        description: "Please enter your content niche to generate video ideas.",
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
      const prompt = `Generate 15 highly engaging, viral-potential video ideas for the "${niche}" niche in the ${category} category, targeting ${audience} audience.

Create diverse content types including:

🎬 **VIRAL CONCEPTS** (5 ideas):
- Challenge-based content
- Trending format adaptations
- Controversial/debate topics
- Behind-the-scenes content
- Transformation videos

📚 **EDUCATIONAL CONTENT** (5 ideas):
- How-to tutorials
- Myth-busting videos
- Beginner guides
- Advanced techniques
- Tool/software reviews

🎭 **ENTERTAINMENT FORMATS** (5 ideas):
- Reaction videos
- List/ranking content
- Story-time videos
- Collaboration ideas
- Interactive content

For each idea, provide:
- 🎯 **Catchy Title** (optimized for CTR)
- 📝 **Brief Description** (2-3 sentences)
- 📊 **Estimated Views Potential** (realistic range)
- ⏱️ **Ideal Video Length** (shorts/medium/long)
- 🔥 **Trending Score** (1-10)
- 💡 **Unique Hook** (what makes it special)
- 🎨 **Thumbnail Ideas** (visual concepts)

Format with emojis, clear sections, and engaging presentation that sparks creativity!`;

      const systemPrompt = `You are a viral content strategist and YouTube algorithm expert. Generate video ideas that:

🎯 MAXIMIZE viral potential through trending formats
📈 BOOST engagement with proven content types
🔥 DRIVE clicks with irresistible titles and concepts
✨ USE current trends and popular formats
🚀 FOLLOW YouTube algorithm preferences

Focus on:
- High-engagement content formats
- Trending topics and challenges
- Clickable titles with emotional triggers
- Diverse content mix for sustained growth
- Audience-specific interests
- Seasonal and timely opportunities
- Cross-platform potential
- Monetization-friendly concepts

Create visually appealing, organized ideas that inspire immediate action!`;

      const result = await openRouterAPI.generateContent(prompt, systemPrompt, apiKey, {
        model: 'openai/gpt-4o-mini',
        temperature: 0.8,
        maxTokens: 3000,
        humanize: true
      });
      
      setOutput(result);
      toast({
        title: "💡 Video Ideas Generated!",
        description: "Your viral video concepts are ready to create!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate video ideas",
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
      description: "Video ideas copied to clipboard.",
    });
  };

  const handleUseIdea = (idea: VideoIdea) => {
    setNiche(idea.title);
    toast({
      title: "✨ Idea Applied!",
      description: "Video concept added to your niche field.",
    });
  };

  React.useEffect(() => {
    fetchTrendingIdeas();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center glow-primary">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">💡 Viral Video Ideas Generator</h1>
          <p className="text-muted-foreground">Discover trending video concepts that drive massive engagement</p>
        </div>
      </div>

      {/* Trending Ideas Section */}
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">🔥 Currently Trending Video Ideas</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchTrendingIdeas}
            disabled={isLoadingTrending}
          >
            {isLoadingTrending ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingIdeas.map((idea, index) => (
            <div 
              key={index}
              className="p-4 bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => handleUseIdea(idea)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm line-clamp-2">{idea.title}</h4>
                {idea.trending && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                    🔥 Hot
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{idea.description}</p>
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {idea.estimatedViews}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {idea.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Input Form */}
      <Card className="card-premium p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="niche">🎯 Your Niche/Topic *</Label>
            <Input
              id="niche"
              placeholder="e.g., tech reviews, fitness, cooking"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">📂 Content Category</Label>
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
                <SelectItem value="diy">🔨 DIY & Crafts</SelectItem>
                <SelectItem value="music">🎵 Music</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="audience">👥 Target Audience</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">🌍 General Audience</SelectItem>
                <SelectItem value="teens">👦 Teens (13-17)</SelectItem>
                <SelectItem value="young_adults">🧑 Young Adults (18-25)</SelectItem>
                <SelectItem value="millennials">👨 Millennials (26-35)</SelectItem>
                <SelectItem value="professionals">💼 Professionals (25-45)</SelectItem>
                <SelectItem value="parents">👨‍👩‍👧‍👦 Parents</SelectItem>
                <SelectItem value="seniors">👴 Seniors (50+)</SelectItem>
                <SelectItem value="students">🎓 Students</SelectItem>
              </SelectContent>
            </Select>
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
              🚀 Generating Viral Ideas...
            </>
          ) : (
            <>
              <Lightbulb className="w-4 h-4 mr-2" />
              💡 Generate Video Ideas
            </>
          )}
        </Button>
      </Card>

      {/* Output Section */}
      {output && (
        <Card className="card-premium p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">🎉 Your Viral Video Ideas</h3>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                📋 Copy Ideas
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

      {/* Video Ideas Tips */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold mb-4">🚀 Viral Video Strategy Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Play className="w-4 h-4" />
              🎬 Content Types
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• 🔥 Challenge videos (high engagement)</li>
              <li>• 📚 Educational content (evergreen)</li>
              <li>• 🎭 Entertainment (broad appeal)</li>
              <li>• 📊 List/ranking videos (clickable)</li>
              <li>• 🎯 Behind-the-scenes (personal)</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <TrendingUp className="w-4 h-4" />
              📈 Viral Factors
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• ⏰ Timing with trends</li>
              <li>• 🎯 Strong emotional hooks</li>
              <li>• 🔄 Shareable moments</li>
              <li>• 💬 Comment-driving content</li>
              <li>• 📱 Cross-platform potential</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Clock className="w-4 h-4" />
              ⏱️ Optimization Tips
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• 🎬 Hook viewers in first 15 seconds</li>
              <li>• 📊 Analyze competitor content</li>
              <li>• 🔄 Adapt trending formats</li>
              <li>• 📅 Plan content calendar</li>
              <li>• 📈 Track performance metrics</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VideoIdeas;
