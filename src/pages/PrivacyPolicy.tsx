import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-surface text-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <Card className="card-premium p-6 sm:p-8 md:p-12 border border-border/50 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block p-3 bg-gradient-primary rounded-xl glow-primary mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gradient">Privacy Policy</h1>
            <p className="text-muted-foreground mt-2">Last Updated: July 25, 2025</p>
          </div>

          <div className="space-y-6 text-left">
            <p className="text-muted-foreground">This Privacy Policy explains how Premio ("we," "us," or "our") collects, uses, and discloses information about you when you use our Services. We use Firebase for authentication and store user data securely.</p>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">1. Information We Collect</h3>
              <p className="text-muted-foreground">We collect information you provide directly to us, such as when you create an account. This includes your name, email address, and password. We also collect information automatically when you use our Services, including your IP address, device type, and usage data related to the AI tools you interact with.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">2. How We Use Your Information</h3>
              <p className="text-muted-foreground">We use the information we collect to: (i) provide, maintain, and improve our Services; (ii) process transactions and send you related information; (iii) respond to your comments, questions, and requests, and provide customer service; (iv) monitor and analyze trends, usage, and activities in connection with our Services.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">3. Data Storage and Security</h3>
              <p className="text-muted-foreground">Your personal data is stored and processed securely using Firebase's infrastructure. We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">4. Third-Party Services</h3>
              <p className="text-muted-foreground">We may use third-party services, such as analytics providers, to help us understand our user base. These third parties may have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">5. Your Choices</h3>
              <p className="text-muted-foreground">You may update, correct, or delete your account information at any time by logging into your account. If you wish to delete your account, please contact us at the email address below.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">6. Contact Us</h3>
              <p className="text-muted-foreground">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@premio.ai" className="text-primary/90 hover:underline">support@premio.ai</a>.</p>
            </div>
          </div>
        </Card>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="bg-transparent hover:bg-white/5">
            <Link to="/login">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
