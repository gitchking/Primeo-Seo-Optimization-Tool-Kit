import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy } from "lucide-react";

const KeywordResearch = () => {
  const [keyword, setKeyword] = useState("");
  const [generatedKeywords, setGeneratedKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateKeywords = () => {
    if (!keyword) return;
    setIsLoading(true);
    // Simulate API call
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
      setGeneratedKeywords(results);
      setIsLoading(false);
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Keyword Research Tool</h1>
        <p className="text-muted-foreground mb-6">
          Enter a seed keyword to generate a list of related keywords.
        </p>
        <div className="flex gap-4 mb-6">
          <Input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., anime 2025"
            className="flex-grow"
          />
          <Button onClick={generateKeywords} disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Keywords"}
          </Button>
        </div>
        {generatedKeywords.length > 0 && (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generatedKeywords.map((kw, index) => (
                  <TableRow key={index}>
                    <TableCell>{kw}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(kw)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeywordResearch;
