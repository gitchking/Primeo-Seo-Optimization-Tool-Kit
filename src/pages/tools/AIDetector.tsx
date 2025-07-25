import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useApi } from '@/contexts/ApiContext';
import { openRouterAPI } from '@/services/openRouterApi';
import { Shield, Copy, Download, RefreshCw, Bot, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DetectionResult {
  aiScore: number;
  humanScore: number;
  confidence: number;
  analysis: string;
}

const AIDetector: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey, isConfigured } = useApi();
  const { toast } = useToast();

  const detectContent = async () => {
    if (!input.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some content to analyze.",
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
      const systemPrompt = `You are an expert AI content detector. Analyze the given text and determine whether it was written by AI or humans. Return your analysis in the following JSON format:

{
  "aiScore": [percentage 0-100],
  "humanScore": [percentage 0-100], 
  "confidence": [confidence level 0-100],
  "analysis": "[detailed explanation of your reasoning]"
}

Consider factors like:
- Writing patterns and flow
- Vocabulary choices and repetition
- Sentence structure variety
- Natural imperfections vs AI patterns
- Context and creativity level

Be precise and analytical in your assessment.`;

      const prompt = `Analyze this content for AI vs Human authorship:\n\n"${input}"`;
      
      const response = await openRouterAPI.generateContent(prompt, systemPrompt, apiKey, {
        model: 'openai/gpt-4o-mini',
        temperature: 0.3,
        maxTokens: 1000
      });

      // Parse the JSON response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedResult = JSON.parse(jsonMatch[0]);
        setResult(parsedResult);
        toast({
          title: "Analysis Complete!",
          description: "Content has been analyzed for AI detection.",
        });
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze content",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyResults = async () => {
    if (!result) return;
    
    const resultText = `AI Detection Results:
AI-Generated: ${result.aiScore}%
Human-Written: ${result.humanScore}%
Confidence: ${result.confidence}%

Analysis: ${result.analysis}`;

    await navigator.clipboard.writeText(resultText);
    toast({
      title: "Copied!",
      description: "Detection results copied to clipboard.",
    });
  };

  const downloadResults = () => {
    if (!result) return;
    
    const resultText = `AI Detection Analysis Report
Generated on: ${new Date().toLocaleString()}

Content Analyzed:
"${input}"

Results:
- AI-Generated Likelihood: ${result.aiScore}%
- Human-Written Likelihood: ${result.humanScore}%
- Confidence Level: ${result.confidence}%

Detailed Analysis:
${result.analysis}`;

    const blob = new Blob([resultText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-detection-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">AI Content Detector</h1>
          <p className="text-muted-foreground">Analyze content to determine if it's AI-generated or human-written</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="card-premium p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Content to Analyze</h3>
              <span className="text-sm text-muted-foreground">
                {input.length} characters
              </span>
            </div>
            
            <Textarea
              placeholder="Paste the content you want to analyze for AI detection. The tool will determine if it's human-written or AI-generated..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-[300px] resize-none overflow-y-auto"
            />
            
            <div className="flex gap-3">
              <Button 
                variant="premium" 
                onClick={detectContent}
                disabled={isLoading || !isConfigured}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Detect AI Content
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setInput('');
                  setResult(null);
                }}
                disabled={!input}
              >
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <Card className="card-premium p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Detection Results</h3>
              {result && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={copyResults}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={downloadResults}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="h-[300px] overflow-y-auto">
              {result ? (
                <div className="space-y-6">
                  {/* Score Indicators */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Bot className="w-5 h-5 text-red-500" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">AI-Generated</span>
                          <span className="text-sm font-bold text-red-500">{result.aiScore}%</span>
                        </div>
                        <Progress value={result.aiScore} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-green-500" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Human-Written</span>
                          <span className="text-sm font-bold text-green-500">{result.humanScore}%</span>
                        </div>
                        <Progress value={result.humanScore} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-blue-500" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Confidence Level</span>
                          <span className="text-sm font-bold text-blue-500">{result.confidence}%</span>
                        </div>
                        <Progress value={result.confidence} className="h-2" />
                      </div>
                    </div>
                  </div>

                  {/* Analysis */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-primary">Detailed Analysis</h4>
                    <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {result.analysis}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Your detection results will appear here...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Tips Section */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold mb-4">🔍 How AI Detection Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-medium text-primary">Detection Factors:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Writing patterns and linguistic markers</li>
              <li>• Sentence structure variety</li>
              <li>• Vocabulary complexity and repetition</li>
              <li>• Natural imperfections vs AI patterns</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-primary">Important Notes:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Results are probabilistic, not definitive</li>
              <li>• Longer content provides more accurate analysis</li>
              <li>• Human-edited AI content may show mixed results</li>
              <li>• Consider context and source when interpreting</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIDetector;