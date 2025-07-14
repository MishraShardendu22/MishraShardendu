import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Clock, Mail, Calendar, WeightIcon, HistoryIcon } from "lucide-react";
import { PatientDetailsType } from "@/Types/Patient.types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PatientDetailsFormProps {
  patientDetails: PatientDetailsType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextTab: () => void;
}

const PatientDetailsForm: React.FC<PatientDetailsFormProps> = ({ 
  patientDetails, 
  handleChange, 
  nextTab 
}) => {
  // Check if all required fields are filled
  const isFormComplete = () => {
    return patientDetails.patientEmail && 
           patientDetails.patientDOB && 
           patientDetails.patientLastKnownNormal &&
           patientDetails.patientWeight &&
           patientDetails.patientMedicalHistory
    };

  return (
    <>
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Patient Details</CardTitle>
          <CardDescription>
            Enter patient information to begin stroke assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-0">
          <div className="space-y-2">
            <Label htmlFor="patientEmail" className="font-medium">
              Email Address
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Mail className="h-4 w-4" />
              </div>
              <Input 
                id="patientEmail" 
                name="patientEmail" 
                type="email"
                placeholder="patient@example.com"
                className="pl-10"
                value={patientDetails.patientEmail} 
                onChange={handleChange} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="patientDOB" className="font-medium">
              Date of Birth
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Calendar className="h-4 w-4" />
              </div>
              <Input 
                id="patientDOB" 
                name="patientDOB" 
                type="date" 
                className="pl-10"
                value={patientDetails.patientDOB} 
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="patientLastKnownNormal" className="font-medium">
              Last Known Normal Time
            </Label>
            <div className="relative flex items-center rounded-md border overflow-hidden focus-within:ring-1 focus-within:ring-ring">
              <div className="flex items-center pl-3 text-muted-foreground">
                <Clock className="h-4 w-4" />
              </div>
              <Input 
                id="patientLastKnownNormal"
                type="datetime-local"
                name="patientLastKnownNormal" 
                defaultValue={new Date().toISOString()}
                value={patientDetails.patientLastKnownNormal} 
                onChange={handleChange}
                className="border-none focus-visible:ring-0 pl-2"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              The time when the patient was last known to be without symptoms
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="patientWeight" className="font-medium">
              Weight of The Patient
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <WeightIcon className="h-4 w-4" />
              </div>
              <Input 
                id="patientWeight" 
                name="patientWeight" 
                type="number" 
                className="pl-10"
                value={patientDetails.patientWeight} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="patientMedicalHistory" className="font-medium">
              History of Patient
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <HistoryIcon className="h-4 w-4" />
              </div>
              <Input 
                id="patientMedicalHistory" 
                name="patientMedicalHistory" 
                type="text" 
                className="pl-10"
                value={patientDetails.patientMedicalHistory} 
                onChange={handleChange} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 flex justify-between">
        <span className="text-sm text-muted-foreground self-center">
          {!isFormComplete() && "Please complete all fields"}
        </span>
        <Button 
          onClick={nextTab} 
          disabled={!isFormComplete()}
          className="px-5 font-medium"
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default PatientDetailsForm;