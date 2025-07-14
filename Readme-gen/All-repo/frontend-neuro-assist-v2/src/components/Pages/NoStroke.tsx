import { 
  AlertCircle, 
  HeartCrackIcon,
  BriefcaseMedicalIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const NoStroke = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-card text-card-foreground rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle
            className="text-destructive"
            size={80}
            strokeWidth={1.5}
          />
        </div>

        <h1 className="text-4xl font-bold text-primary mb-4">
          No Stroke Detected
        </h1>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          While no immediate signs of stroke have been identified, it's crucial
          to consult with a healthcare professional for a comprehensive medical
          evaluation.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-muted p-4 rounded-lg text-center">
            <HeartCrackIcon className="mx-auto mb-2 text-primary" size={40} />
            <h3 className="text-lg font-semibold text-accent">Next Steps</h3>
            <p className="text-sm text-muted-foreground">
              Schedule a follow-up appointment
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg text-center">
            <BriefcaseMedicalIcon
              className="mx-auto mb-2 text-primary"
              size={40}
            />
            <h3 className="text-lg font-semibold text-accent">
              Preventive Care
            </h3>
            <p className="text-sm text-muted-foreground">
              Discuss lifestyle and risk factors
            </p>
          </div>
        </div>

        <div className="bg-background border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground italic">
            Disclaimer: This result is not a substitute for professional medical
            advice. Always consult with a healthcare provider for accurate
            diagnosis and treatment.
          </p>
        </div>

        <div className="mt-6">
          <Link
            to="/patient/survey"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Restart Evaluation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoStroke;