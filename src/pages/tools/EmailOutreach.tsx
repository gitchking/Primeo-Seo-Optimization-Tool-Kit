import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApi } from '@/contexts/ApiContext';
import { openRouterAPI } from '@/services/openRouterApi';
import { Mail, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmailOutreach: React.FC = () => {
  const [recipientName, setRecipientName] = useState('');
  const [company, setCompany] = useState('');
  const [purpose, setPurpose] = useState('');
  const [emailType, setEmailType] = useState('cold_outreach');
  const [context, setContext] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { apiKey, isConfigured } = useApi();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!purpose.trim()) {
      toast({
        title: "Purpose Required",
        description: "Please enter the purpose of your email outreach.",
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
      const prompt = `Create a high-converting ${emailType.replace('_', ' ')} email with the following details:

${recipientName ? `Recipient Name: ${recipientName}` : ''}
${company ? `Company: ${company}` : ''}
Purpose: ${purpose}
${context ? `Additional Context: ${context}` : ''}

Requirements:
- 🎯 Compelling subject line with emotional hook
- 👋 Personalized opening that builds rapport
- 💎 Clear value proposition in first 2 lines
- 🚀 Specific call-to-action that drives action
- 💬 Professional but conversational tone
- ⏱️ Keep it concise (under 150 words)
- 📈 High conversion focus with psychological triggers
- ✨ Strategic use of emojis for visual appeal
- 🎨 Professional formatting with line breaks

Format: Provide both subject line and email body with clear visual structure and engaging elements.`;

      const systemPrompt = `You are an expert email marketing specialist and conversion copywriter who writes high-converting outreach emails. Focus on:

1. Personalization that builds rapport
2. Clear value proposition in the first few lines
3. Social proof or credibility indicators
4. Specific, actionable CTAs
5. Professional yet conversational tone
6. Brevity - respect the recipient's time
7. Psychological triggers that drive responses
8. Visual appeal with strategic formatting
9. Emotional engagement techniques
10. Strategic emoji usage for modern appeal

Create emails that feel personal, visually appealing, and conversion-focused while maintaining professionalism.`;

      const result = await openRouterAPI.generateContent(prompt, systemPrompt, apiKey, {
        model: 'openai/gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 1000
      });
      
      setOutput(result);
      toast({
        title: "Email Generated!",
        description: "Your outreach email has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate email",
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
      description: "Email content copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">Email Outreach Composer</h1>
          <p className="text-muted-foreground">Craft compelling cold emails that get responses</p>
        </div>
      </div>

      {/* Input Form */}
      <Card className="card-premium p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailType">Email Type</Label>
              <Select value={emailType} onValueChange={setEmailType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cold_outreach">Cold Outreach</SelectItem>
                  <SelectItem value="partnership">Partnership Proposal</SelectItem>
                  <SelectItem value="guest_post">Guest Post Pitch</SelectItem>
                  <SelectItem value="collaboration">Collaboration Request</SelectItem>
                  <SelectItem value="interview">Interview Request</SelectItem>
                  <SelectItem value="feedback">Feedback Request</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name (Optional)</Label>
              <Input
                id="recipientName"
                placeholder="e.g., John Smith"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                placeholder="e.g., TechCorp Inc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="purpose">Email Purpose *</Label>
              <Textarea
                id="purpose"
                placeholder="e.g., I want to propose a guest post collaboration about digital marketing trends..."
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="context">Additional Context (Optional)</Label>
              <Textarea
                id="context"
                placeholder="e.g., I noticed their recent article about SEO, our companies have similar audiences..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={3}
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
              Composing Email...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Generate Email
            </>
          )}
        </Button>
      </Card>

      {/* Output Section */}
      {output && (
        <Card className="card-premium p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Generated Email</h3>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Email
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

      {/* Email Tips */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold mb-4">📧 Email Outreach Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Subject Lines:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Keep under 50 characters</li>
              <li>• Avoid spammy words</li>
              <li>• Create curiosity</li>
              <li>• Personalize when possible</li>
              <li>• A/B test different versions</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Email Body:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Start with personalization</li>
              <li>• Lead with value proposition</li>
              <li>• Keep under 150 words</li>
              <li>• Include one clear CTA</li>
              <li>• End with a soft ask</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Follow-up Strategy:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Wait 3-5 days between emails</li>
              <li>• Add new value each time</li>
              <li>• Reference previous email</li>
              <li>• Limit to 3-4 follow-ups</li>
              <li>• Use different angles</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmailOutreach;