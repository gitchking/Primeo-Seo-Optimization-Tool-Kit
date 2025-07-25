import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Guide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-surface text-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <Card className="card-premium p-6 sm:p-8 md:p-12 border border-border/50 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block p-3 bg-gradient-primary rounded-xl glow-primary mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient">API Key Guide</h1>
            <p className="text-muted-foreground mt-2">How to get your OpenRouter API Key</p>
          </div>

          <div className="space-y-6 text-left">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">1. Sign up for OpenRouter</h3>
              <p className="text-muted-foreground">First, you need an account on OpenRouter. If you don't have one, go to the <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-primary/90 hover:underline">OpenRouter website</a> and sign up.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">2. Fund Your Account</h3>
              <p className="text-muted-foreground">OpenRouter is a pay-as-you-go service. To use their models, you'll need to add credits to your account. You can do this from your account dashboard.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">3. Create a New API Key</h3>
              <p className="text-muted-foreground">Navigate to the "Keys" section of your OpenRouter account. Click on the "Create Key" button. Give your key a descriptive name (e.g., "Premio-Toolkit") so you can remember what it's used for.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">4. Copy Your API Key</h3>
              <p className="text-muted-foreground">Once the key is created, copy it to your clipboard. For security reasons, OpenRouter will only show you the key once. Make sure to save it in a safe place.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">5. Add the Key to Premio</h3>
              <p className="text-muted-foreground">Go to the "Settings" page in the Premio toolkit. You will find a field to enter your OpenRouter API key. Paste your key there and save the settings. The application will then be able to connect to the OpenRouter API.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">6. Recommended Free Models</h3>
              <p className="text-muted-foreground">Here are some of the latest, free-to-use models on OpenRouter that are well-suited for SEO and content generation tasks:</p>
              <div className="overflow-x-auto rounded-lg border border-border/50">
                <table className="w-full text-left">
                  <thead className="bg-muted/20">
                    <tr>
                      <th className="p-4 text-sm font-semibold text-foreground">Model Name</th>
                      <th className="p-4 text-sm font-semibold text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border/50 hover:bg-muted/20">
                      <td className="p-4 font-medium">Qwen: Qwen3 Coder (free)</td>
                      <td className="p-4 text-muted-foreground">Optimized for agentic coding tasks, function calling, and long-context reasoning.</td>
                    </tr>
                    <tr className="border-t border-border/50 hover:bg-muted/20">
                      <td className="p-4 font-medium">Qwen: Qwen3 235B A22B Instruct 2507 (free)</td>
                      <td className="p-4 text-muted-foreground">A multilingual model optimized for general-purpose text generation, including instruction following and logical reasoning.</td>
                    </tr>
                    <tr className="border-t border-border/50 hover:bg-muted/20">
                      <td className="p-4 font-medium">MoonshotAI: Kimi K2 (free)</td>
                      <td className="p-4 text-muted-foreground">A large-scale model optimized for agentic capabilities, including advanced tool use, reasoning, and code synthesis.</td>
                    </tr>
                     <tr className="border-t border-border/50 hover:bg-muted/20">
                      <td className="p-4 font-medium">Venice: Uncensored (free)</td>
                      <td className="p-4 text-muted-foreground">An instruct-tuned LLM designed for advanced and unrestricted use cases, emphasizing steerability and transparent behavior.</td>
                    </tr>
                     <tr className="border-t border-border/50 hover:bg-muted/20">
                      <td className="p-4 font-medium">Google: Gemma 3n 2B (free)</td>
                      <td className="p-4 text-muted-foreground">A multimodal, instruction-tuned model designed for efficient operation and strong multilingual and reasoning performance.</td>
                    </tr>
                     <tr className="border-t border-border/50 hover:bg-muted/20">
                      <td className="p-4 font-medium">Tencent: Hunyuan A13B Instruct (free)</td>
                      <td className="p-4 text-muted-foreground">A 13B active parameter Mixture-of-Experts (MoE) language model that offers competitive benchmark performance.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="bg-transparent hover:bg-white/5">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Guide;
