import { HomeIcon, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      <main className="container flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center space-y-6">
            <AlertCircle className="h-20 w-20 text-destructive animate-pulse" />
            <div className="space-y-2 text-center">
              <h1 className="text-5xl font-bold text-foreground">404</h1>
              <h2 className="text-2xl font-semibold text-foreground/80">
                Page Not Found
              </h2>
            </div>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center space-y-6">
            <p className="text-center text-muted-foreground">
              Sorry, the page you are looking for doesn't exist or has been moved.
            </p>

            <Button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
              size="lg"
            >
              <HomeIcon className="w-4 h-4" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NotFound;