import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PatientDetailsType } from "@/Types/Patient.types";
import { Thermometer, Heart, Gauge, ChevronLeft, ChevronRight, Activity, Droplet } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

interface VitalSignsFormProps {
  patientDetails: PatientDetailsType;
  handleVitalSignsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextTab: () => void;
  prevTab: () => void;
}

const VitalSignsForm: React.FC<VitalSignsFormProps> = ({ 
  patientDetails, 
  handleVitalSignsChange, 
  nextTab, 
  prevTab 
}) => {
  const getVitalStatus = (type: string, value: string) => {
    if (!value) return null;
    
    const numValue = parseFloat(value);
    
    switch (type) {
      case "BP": {
        const parts = value.split('/');
        if (parts.length !== 2) return null;
        
        const systolic = parseInt(parts[0]);
        const diastolic = parseInt(parts[1]);
        
        if (systolic > 140 || diastolic > 90) return "high";
        if (systolic < 90 || diastolic < 60) return "low";
        return "normal";
      }
      case "HeartRate":
        if (numValue > 100) return "high";
        if (numValue < 60) return "low";
        return "normal";
        
      case "Temperature":
        if (numValue > 37.5) return "high";
        if (numValue < 36) return "low";
        return "normal";

      case "OxygenSaturation":
        if (numValue < 90) return "low";
        if (numValue < 95) return "borderline";
        return "normal";
        
      default:
        return "normal";
    }
  };
  
  const renderStatusBadge = (status: string | null) => {
    if (!status) return null;
    
    const statusMap = {
      high: <Badge variant="destructive">High</Badge>,
      low: <Badge variant="destructive">Low</Badge>,
      normal: <Badge variant="outline" className="bg-primary/10 text-primary">Normal</Badge>
    };
    
    return statusMap[status as keyof typeof statusMap];
  };

  const vitalTooltips = {
    BP: "Normal blood pressure: 90/60mmHg to 120/80mmHg",
    OxygenSaturation: "Normal oxygen saturation: 95-100%",
    HeartRate: "Normal resting heart rate: 60-100 beats per minute",
    Temperature: "Normal adult temperature range: 36.1°C to 37.2°C",
  };

  return (
    <>
      <Card className="border-2 border-primary/20 shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle>Vital Signs</CardTitle>
            </div>
            {patientDetails.vitalSigns.OxygenSaturation &&
             patientDetails.vitalSigns.Temperature && 
             patientDetails.vitalSigns.HeartRate &&
             patientDetails.vitalSigns.BP && (
              <Badge variant="outline" className="bg-primary/5">
                All vitals recorded
              </Badge>
            )}
          </div>
          <CardDescription>
            Record the patient's current vital measurements
          </CardDescription>
          <Separator className="mt-2" />
        </CardHeader>
        
        <CardContent className="grid gap-5 pt-4">
          {/* Temperature Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="Temperature" className="text-base">Temperature (°C)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Thermometer className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{vitalTooltips.Temperature}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {renderStatusBadge(getVitalStatus("Temperature", patientDetails.vitalSigns.Temperature))}
            </div>
            <div className="relative">
              <Thermometer className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="Temperature" 
                name="Temperature" 
                placeholder="36.5" 
                type="number"
                step="0.1"
                className="pl-10"
                value={patientDetails.vitalSigns.Temperature} 
                onChange={(e) => {
                  const newEvent = {
                    ...e,
                    target: {
                      ...e.target,
                      name: e.target.name,
                      value: e.target.value
                    }
                  };
                  handleVitalSignsChange(newEvent);
                }} 
              />
            </div>
          </div>
          
          {/* Blood Pressure Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="BP" className="text-base">Blood Pressure (mmHg)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Gauge className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{vitalTooltips.BP}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {renderStatusBadge(getVitalStatus("BP", patientDetails.vitalSigns.BP))}
            </div>
            <div className="relative">
              <Gauge className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="BP" 
                name="BP" 
                placeholder="120/80" 
                className="pl-10"
                value={patientDetails.vitalSigns.BP} 
                onChange={(e) => {
                  const newEvent = {
                    ...e,
                    target: {
                      ...e.target,
                      name: e.target.name,
                      value: e.target.value
                    }
                  };
                  handleVitalSignsChange(newEvent);
                }}
              />
            </div>
          </div>

          {/* Heart Rate Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="HeartRate" className="text-base">Heart Rate (bpm)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Heart className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{vitalTooltips.HeartRate}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {renderStatusBadge(getVitalStatus("HeartRate", patientDetails.vitalSigns.HeartRate))}
            </div>
            <div className="relative">
              <Heart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="HeartRate" 
                name="HeartRate" 
                placeholder="72" 
                type="number"
                className="pl-10"
                value={patientDetails.vitalSigns.HeartRate} 
                onChange={(e) => {
                  const newEvent = {
                    ...e,
                    target: {
                      ...e.target,
                      name: e.target.name,
                      value: e.target.value
                    }
                  };
                  handleVitalSignsChange(newEvent);
                }}
              />
            </div>
          </div>

          {/* Oxygen Saturation Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="OxygenSaturation" className="text-base">Oxygen Saturation Level</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Droplet className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{vitalTooltips.OxygenSaturation}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              {renderStatusBadge(getVitalStatus("OxygenSaturation", patientDetails.vitalSigns.OxygenSaturation))}
            </div>
            <div className="relative">
              <Droplet className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="OxygenSaturation" 
                name="OxygenSaturation" 
                placeholder="98" 
                type="number"
                className="pl-10"
                value={patientDetails.vitalSigns.OxygenSaturation} 
                onChange={(e) => {
                  const newEvent = {
                    ...e,
                    target: {
                      ...e.target,
                      name: e.target.name,
                      value: e.target.value
                    }
                  };
                  handleVitalSignsChange(newEvent);
                }}
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-2 pb-4">
          <Button 
            variant="outline" 
            onClick={prevTab} 
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          <Button 
            onClick={nextTab}
            className="flex items-center gap-1 bg-primary"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default VitalSignsForm;