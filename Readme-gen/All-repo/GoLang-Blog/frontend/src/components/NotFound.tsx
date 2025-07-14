import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1B1F38] p-4">
      {/* Logo or Brand Name */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#E0B0FF] tracking-tight">Blog It Up</h1>
      </div>

      <Card className="w-full max-w-md bg-[#16172B] border-[#3C3F51] shadow-xl shadow-[#6A0DAD]/10 p-8">
        <div className="text-center space-y-6">
          {/* 404 Text */}
          <h2 className="text-8xl font-bold text-[#6A0DAD]">404</h2>
          
          {/* Error Message */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#E0B0FF]">Page Not Found</h3>
            <p className="text-[#A6A6A6]">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              className="bg-[#6A0DAD] hover:bg-[#5B2C6F] text-[#D9D9D9] font-medium shadow-lg shadow-[#6A0DAD]/20 hover:shadow-[#6A0DAD]/30 transition-all"
              onClick={() => navigate('/home')}
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
            <Button
              variant="outline"
              className="border-[#3C3F51] text-[#D9D9D9] hover:bg-[#3C3F51] hover:text-[#E0B0FF]"
              onClick={() => navigate('/login')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;