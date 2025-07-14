import { Button } from "../components/ui/button";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <XCircle className="w-24 h-24 text-red-500 mx-auto" />
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">404 Not Found</h1>
          <p className="text-lg text-gray-600">
            The page you're looking for doesn't exist!
          </p>
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <Button
            variant="default"
            onClick={() => navigate('/')}
          >
            Return Home
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;