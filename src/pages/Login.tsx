import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Chrome } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in to Premio.",
      });
      navigate('/');
    } catch (error) {
      let errorMessage = "An unknown error occurred. Please try again.";
      if (error instanceof Object && 'code' in error) {
        const firebaseError = error as { code: string; message: string };
        switch (firebaseError.code) {
          case "auth/invalid-email":
            errorMessage = "The email address is not valid.";
            break;
          case "auth/user-disabled":
            errorMessage = "This user account has been disabled.";
            break;
          case "auth/user-not-found":
            errorMessage = "No user found with this email.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password. Please try again.";
            break;
          case "auth/network-request-failed":
            errorMessage = "Network error. Please check your internet connection.";
            break;
          default:
            errorMessage = `An unexpected error occurred: ${firebaseError.message}`;
        }
      }
      console.error("Firebase Login Error:", error);
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: "Welcome!",
        description: "You have successfully signed in with Google.",
      });
      navigate('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Google Sign-In Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center glow-primary">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Welcome to Premio</h1>
          <p className="text-muted-foreground">Sign in to your SEO optimization toolkit</p>
        </div>

        {/* Login Form */}
        <Card className="card-premium p-8 border border-border/50">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <Label htmlFor="remember" className="text-sm text-muted-foreground">
                  Remember me
                </Label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary-glow transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="premium"
              className="w-full"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isGoogleLoading}
          >
            {isGoogleLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-border rounded-full animate-spin mr-2" />
                Please wait...
              </>
            ) : (
              <>
                <Chrome className="w-4 h-4 mr-2" />
                Continue with Google
              </>
            )}
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary hover:text-primary-glow font-medium transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:text-primary-glow">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:text-primary-glow">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
