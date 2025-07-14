import { Link } from "react-router-dom";
import { HeartPulse, Home } from "lucide-react";

export const MedicalHeader = () => {
  return (
    <header className="bg-background border-b border-border py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-3">
          <HeartPulse className="text-primary" size={30} />
          <h1 className="text-xl font-bold text-primary">Stroke Assessment</h1>
        </div>
        <nav className="flex space-x-4 items-center">
          <Link
            to="/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Home size={24} />
          </Link>
          <Link
            to="/patient/survey"
            className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Restart Evaluation
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default MedicalHeader;
