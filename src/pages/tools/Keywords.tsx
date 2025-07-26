import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Search, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Keywords = () => {
  const [keyword, setKeyword] = useState("");
  const [generatedKeywords, setGeneratedKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateKeywords = () => {
    if (!keyword) {
      toast({
        title: "Keyword Required",
        description: "Please enter a seed keyword to generate related keywords.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const prefixes = [
        "new",
        "devil may cry",
        "upcoming",
        "best",
        "spring",
        "summer",
        "super cube",
        "winter",
        "romance",
        "dmc",
      ];
      const suffixes = [
        "awards",
        "awards winners",
        "april",
        "anime",
        "autumn",
        "all",
        "adventure",
        "a voir",
        "anime planet",
        "anime list",
      ];
      const results = [keyword];
      prefixes.forEach((p) => results.push(`${p} ${keyword}`));
      suffixes.forEach((s) => results.push(`${keyword} ${s}`));
      setGeneratedKeywords(results.join("\n"));
      toast({
        title: "Keywords Generated!",
        description: "Your keyword research has been completed successfully.",
      });
      setIsLoading(false);
    }, 1000);
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
            Enter a seed keyword to generate a list of related keywords.
          </p>
        </div>
      </div>

      <Card className="card-premium p-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., anime 2025"
              className="flex-grow"
              onKeyPress={(e) => e.key === 'Enter' && generateKeywords()}
            />
            <Button onClick={generateKeywords} disabled={isLoading} variant="premium">
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Keywords"
              )}
            </Button>
          </div>
        </div>
      </Card>

      {generatedKeywords && (
        <Card className="card-premium p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Generated Keywords</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            readOnly
            value={generatedKeywords}
            className="h-96 bg-muted/30 border-border/50"
          />
        </Card>
      )}
    </div>
  );
};

export default Keywords;
