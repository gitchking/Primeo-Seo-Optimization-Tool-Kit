import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ApiProvider } from "@/contexts/ApiContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Guide from "@/pages/Guide";

// Components
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import NotFound from "./pages/NotFound";

// Tool Pages
import HumanizeAI from "@/pages/tools/HumanizeAI";
import AIDetector from "@/pages/tools/AIDetector";
import SEOArticles from "@/pages/tools/SEOArticles";
import Keywords from "@/pages/tools/Keywords";
import MetaTags from "@/pages/tools/MetaTags";
import EmailOutreach from "@/pages/tools/EmailOutreach";
import YouTubeScripts from "@/pages/tools/YouTubeScripts";
import PromptGenerator from "@/pages/tools/PromptGenerator";
import YouTubeSEO from "@/pages/tools/YouTubeSEO";
import YouTubeTags from "@/pages/tools/YouTubeTags";
import VideoIdeas from "@/pages/tools/VideoIdeas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ApiProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <SonnerToaster />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="humanize" element={<HumanizeAI />} />
                  <Route path="ai-detector" element={<AIDetector />} />
                  <Route path="seo-articles" element={<SEOArticles />} />
                  <Route path="keywords" element={<Keywords />} />
                  <Route path="meta-tags" element={<MetaTags />} />
                  <Route path="email-outreach" element={<EmailOutreach />} />
                  <Route path="youtube-scripts" element={<YouTubeScripts />} />
                  <Route path="prompt-generator" element={<PromptGenerator />} />
                  <Route path="settings" element={<Settings />} />
                  
                  {/* Bonus Tools - Placeholder routes */}
                  <Route path="youtube-seo" element={<YouTubeSEO />} />
                  <Route path="youtube-tags" element={<YouTubeTags />} />
                  <Route path="video-ideas" element={<VideoIdeas />} />
                  <Route path="guide" element={<Guide />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ApiProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
