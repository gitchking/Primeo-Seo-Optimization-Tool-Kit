import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Search, RefreshCw, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Keywords = () => {
  const [keyword, setKeyword] = useState("");
  const [generatedKeywords, setGeneratedKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!keyword.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter your keywords in the input field.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setGeneratedKeywords(keyword);
      toast({
        title: "Keywords Processed!",
        description: "Your keywords are now in the output box.",
      });
      setIsLoading(false);
    }, 500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedKeywords);
    toast({
      title: "Copied!",
      description: "Keywords copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <Search className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gradient">Keywords Tool</h1>
          <p className="text-muted-foreground">
            Format and manage your keyword lists.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Card */}
        <Card className="card-premium p-6">
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-4">Your Keywords</h3>
            <Textarea
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter your keywords here, one per line..."
              className="flex-grow h-80"
            />
            <Button onClick={handleGenerate} disabled={isLoading} variant="premium" className="mt-4 w-full">
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Process Keywords"
              )}
            </Button>
          </div>
        </Card>

        {/* Output Card */}
        <Card className="card-premium p-6">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Formatted Output</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                disabled={!generatedKeywords}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              readOnly
              value={generatedKeywords}
              className="h-full bg-muted/30 border-border/50"
              placeholder="Your formatted keywords will appear here..."
            />
          </div>
        </Card>
      </div>

      {/* Best Practices Card */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold mb-4">🎯 Keyword Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <TrendingUp className="w-4 h-4" />
              Search Intent
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <strong>Informational:</strong> Users looking for information. (e.g., "how to bake a cake")</li>
              <li>• <strong>Commercial:</strong> Users investigating products or services. (e.g., "best running shoes")</li>
              <li>• <strong>Transactional:</strong> Users ready to buy. (e.g., "buy iphone 14 pro")</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Search className="w-4 h-4" />
              Keyword Types
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <strong>Short-tail:</strong> Broad, high-volume keywords (1-2 words).</li>
              <li>• <strong>Long-tail:</strong> Specific, lower-volume keywords (3+ words) with higher conversion rates.</li>
              <li>• <strong>LSI Keywords:</strong> Thematically related keywords.</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <TrendingUp className="w-4 h-4" />
              Optimization Tips
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Balance search volume with keyword difficulty.</li>
              <li>• Ensure content aligns with user search intent.</li>
              <li>• Group related keywords into thematic clusters.</li>
              <li>• Analyze competitor keywords for opportunities.</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Keywords;
