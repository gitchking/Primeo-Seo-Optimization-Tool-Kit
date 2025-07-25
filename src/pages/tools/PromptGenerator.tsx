import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApi } from '@/contexts/ApiContext';
import { openRouterAPI } from '@/services/openRouterApi';
import { Zap, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PromptGenerator: React.FC = () => {
  const [category, setCategory] = useState('content_writing');
  const [objective, setObjective] = useState('');
  const [context, setContext] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey, isConfigured } = useApi();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!objective.trim()) {
      toast({
        title: "Objective Required",
        description: "Please enter what you want the prompt to achieve.",
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
      const prompt = `Create highly effective AI prompts for ${category.replace('_', ' ')} with the following requirements:

Objective: ${objective}
${context ? `Context: ${context}` : ''}

Generate 3-5 different prompt variations that are:
- Specific and clear in instructions
- Include relevant context and constraints
- Optimize for the desired output quality
- Include examples or format specifications when helpful
- Use effective prompt engineering techniques

For each prompt, briefly explain why it would be effective.`;

      const systemPrompt = `You are an expert prompt engineer who creates highly effective AI prompts. Apply these principles:

1. Clarity and Specificity - Be precise about what you want
2. Context Setting - Provide relevant background information
3. Role Assignment - Give the AI a specific role or persona
4. Output Format - Specify desired structure and format
5. Examples - Include examples when they improve results
6. Constraints - Set appropriate limitations and boundaries
7. Chain of Thought - Use step-by-step reasoning when needed

Create prompts that consistently produce high-quality, relevant outputs.`;

      const result = await openRouterAPI.generateContent(prompt, systemPrompt, apiKey, {
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 2000
      });
      
      setOutput(result);
      toast({
        title: "Prompts Generated!",
        description: "Your optimized AI prompts have been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate prompts",
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
      description: "AI prompts copied to clipboard.",
    });
  };

  const quickObjectives = [
    'Write compelling blog post titles',
    'Generate social media captions',
    'Create email subject lines',
    'Summarize long documents',
    'Generate creative story ideas',
    'Write product descriptions'
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">AI Prompt Generator</h1>
          <p className="text-muted-foreground">Create highly effective prompts for any AI task</p>
        </div>
      </div>

      {/* Input Form */}
      <Card className="card-premium p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Prompt Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="content_writing">Content Writing</SelectItem>
                    <SelectItem value="copywriting">Copywriting</SelectItem>
                    <SelectItem value="social_media">Social Media</SelectItem>
                    <SelectItem value="creative_writing">Creative Writing</SelectItem>
                    <SelectItem value="business">Business Strategy</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="analysis">Analysis & Research</SelectItem>
                    <SelectItem value="coding">Programming</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="objective">What should the prompt achieve? *</Label>
                <Textarea
                  id="objective"
                  placeholder="e.g., Generate engaging Instagram captions that increase engagement and followers..."
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="context">Additional Context (Optional)</Label>
                <Textarea
                  id="context"
                  placeholder="e.g., For a fitness brand targeting young professionals, posts should be motivational..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Quick Examples:</Label>
                <div className="grid grid-cols-1 gap-1">
                  {quickObjectives.map((example) => (
                    <Button
                      key={example}
                      variant="ghost"
                      size="sm"
                      onClick={() => setObjective(example)}
                      className="text-xs justify-start text-muted-foreground hover:text-foreground"
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </div>
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
                Generating Prompts...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate AI Prompts
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
              <h3 className="text-lg font-semibold">Generated AI Prompts</h3>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Prompts
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

      {/* Prompt Engineering Tips */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold mb-4">⚡ Prompt Engineering Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Structure Elements:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <strong>Role:</strong> "You are an expert..."</li>
              <li>• <strong>Task:</strong> Clear objective</li>
              <li>• <strong>Context:</strong> Background info</li>
              <li>• <strong>Format:</strong> Desired output structure</li>
              <li>• <strong>Examples:</strong> Sample outputs</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Optimization Techniques:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Use specific, descriptive language</li>
              <li>• Break complex tasks into steps</li>
              <li>• Include relevant constraints</li>
              <li>• Specify tone and style</li>
              <li>• Test and iterate</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Common Patterns:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Chain of thought reasoning</li>
              <li>• Few-shot learning examples</li>
              <li>• Template-based outputs</li>
              <li>• Persona-based prompts</li>
              <li>• Multi-step instructions</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PromptGenerator;