/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PatientDetailsType } from "@/Types/Patient.types";
import { 
    Thermometer, 
    Heart, 
    Gauge, 
    ChevronLeft, 
    ChevronRight, 
    Activity, 
    Droplet,
    Wind,
    Scale,
    Ruler
    } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useThemeStore } from "@/store/themeStore";
import axiosInstance from "@/util/axiosInstance";
import { useState, useEffect } from "react";

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
    const { theme } = useThemeStore();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.get("/user/verifyUser");
            setUserData(data.data);
        } catch (error) {
            console.error("Error fetching user info:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    

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

        case "RespiratoryRate":
            if (numValue > 20) return "high";
            if (numValue < 12) return "low";
            return "normal";

        case "BMI":
            if (numValue < 18.5) return "low";
            if (numValue >= 25 && numValue < 30) return "borderline";
            if (numValue >= 30) return "high";
            return "normal";

        case "Height":
            return "normal";

        case "Weight":
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
        borderline: <Badge variant="secondary">Borderline</Badge>,
        normal: <Badge variant="outline" className="bg-primary/10 text-primary">Normal</Badge>
        };
        
        return statusMap[status as keyof typeof statusMap];
    };

    const vitalTooltips = {
        BP: "Normal blood pressure: 90/60mmHg to 120/80mmHg",
        OxygenSaturation: "Normal oxygen saturation: 95-100%",
        HeartRate: "Normal resting heart rate: 60-100 beats per minute",
        Temperature: "Normal adult temperature range: 36.1°C to 37.2°C",
        RespiratoryRate: "Normal respiratory rate: 12-20 breaths per minute",
        Height: "Patient's height in centimeters",
        Weight: "Patient's weight in kilograms",
        BMI: "Body Mass Index: Normal range 18.5-24.9"
    };

    // Get height and weight from backend data or fallback to form values
    const getHeightValue = () => {
        return userData?.height || patientDetails.vitalSigns.Height || "";
    };

    const getWeightValue = () => {
        return userData?.weight || patientDetails.vitalSigns.Weight || "";
    };

    // Calculate BMI using backend data or form values
    const calculateBMI = () => {
        const height = parseFloat(String(getHeightValue()));
        const weight = parseFloat(String(getWeightValue()));
        
        if (height > 0 && weight > 0) {
            const heightInMeters = height / 100;
            return (weight / (heightInMeters * heightInMeters)).toFixed(1);
        }
        return "";
    };

    const vitalFields = [
        {
        id: "Temperature",
        label: "Temperature (°C)",
        placeholder: "36.5",
        type: "number",
        step: "0.1",
        icon: Thermometer,
        tooltip: vitalTooltips.Temperature
        },
        {
        id: "BP",
        label: "Blood Pressure (mmHg)",
        placeholder: "120/80",
        type: "text",
        icon: Gauge,
        tooltip: vitalTooltips.BP
        },
        {
        id: "HeartRate",
        label: "Heart Rate (bpm)",
        placeholder: "72",
        type: "number",
        icon: Heart,
        tooltip: vitalTooltips.HeartRate
        },
        {
        id: "OxygenSaturation",
        label: "Oxygen Saturation (%)",
        placeholder: "98",
        type: "number",
        icon: Droplet,
        tooltip: vitalTooltips.OxygenSaturation
        },
        {
        id: "RespiratoryRate",
        label: "Respiratory Rate (per min)",
        placeholder: "16",
        type: "number",
        icon: Wind,
        tooltip: vitalTooltips.RespiratoryRate
        }
    ];

    const allVitalsRecorded = vitalFields.every(field => 
        patientDetails.vitalSigns[field.id as keyof typeof patientDetails.vitalSigns]
    );

    return (
        <div className="space-y-6 text-slate-800">
        <Card className="border-2 shadow-md border-primary/20">
            <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <CardTitle>Vital Signs & Measurements</CardTitle>
                </div>
                {allVitalsRecorded && (
                <Badge variant="outline" className="bg-primary/5">
                    All vitals recorded
                </Badge>
                )}
            </div>
            <CardDescription>
                Record the patient's current vital measurements and physical data
            </CardDescription>
            <Separator className="mt-2" />
            </CardHeader>
            
            <CardContent className="grid gap-5 pt-4">
            {loading ? (
                <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading patient data...</div>
                </div>
            ) : (
                vitalFields.map((field) => {
                const IconComponent = field.icon;
                const fieldValue = patientDetails.vitalSigns[field.id as keyof typeof patientDetails.vitalSigns] || "";
                
                return (
                    <div key={field.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                        <Label htmlFor={field.id} className="text-base">
                            {field.label}
                        </Label>
                        <TooltipProvider>
                            <Tooltip>
                            <TooltipTrigger asChild>
                                <IconComponent className={`h-4 w-4 cursor-help ${
                                theme === "light" ? "text-muted-foreground" : "text-base-content/70"
                                }`} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{field.tooltip}</p>
                            </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </div>
                        {renderStatusBadge(getVitalStatus(field.id, String(fieldValue)))}
                    </div>
                    <div className="relative">
                        <IconComponent className={`absolute left-3 top-3 h-4 w-4 ${
                        theme === "light" ? "text-muted-foreground" : "text-base-content/70"
                        }`} />
                        <Input 
                        id={field.id}
                        name={field.id}
                        placeholder={field.placeholder}
                        type={field.type}
                        step={field.step}
                        className="pl-10"
                        value={typeof fieldValue === "number" || typeof fieldValue === "string" ? fieldValue : String(fieldValue ?? "")}
                        onChange={handleVitalSignsChange}
                        />
                    </div>
                    </div>
                );
                })
            )}

            {/* Height and Weight Display (From Backend) */}
            {userData && (userData.height || userData.weight) && (
                <div className="p-4 space-y-3 border rounded-lg bg-primary/5 border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-5 h-5 text-primary" />
                    <Label className="text-base font-medium text-primary">
                        Patient Measurements
                    </Label>
                    <Badge variant="outline" className="text-xs">
                        From Profile
                    </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {userData.height && (
                    <div className="flex items-center gap-3">
                        <Ruler className="w-4 h-4 text-muted-foreground" />
                        <div>
                        <div className="text-sm text-muted-foreground">Height</div>
                        <div className="font-semibold">{userData.height} cm</div>
                        </div>
                    </div>
                    )}
                    {userData.weight && (
                    <div className="flex items-center gap-3">
                        <Scale className="w-4 h-4 text-muted-foreground" />
                        <div>
                        <div className="text-sm text-muted-foreground">Weight</div>
                        <div className="font-semibold">{userData.weight} kg</div>
                        </div>
                    </div>
                    )}
                </div>
                </div>
            )}

            {/* BMI Display (Auto-calculated) */}
            {(getHeightValue() && getWeightValue()) && (
                <div className="p-4 space-y-2 border rounded-lg bg-muted/30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <Label className="text-base font-medium">
                        BMI (Calculated)
                    </Label>
                    <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <Activity className={`h-4 w-4 cursor-help ${
                            theme === "light" ? "text-muted-foreground" : "text-base-content/70"
                            }`} />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{vitalTooltips.BMI}</p>
                        </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    </div>
                    {renderStatusBadge(getVitalStatus("BMI", calculateBMI()))}
                </div>
                <div className="text-2xl font-bold text-primary">
                    {calculateBMI()}
                </div>
                </div>
            )}
            </CardContent>
            
            <CardFooter className="flex justify-between pt-2 pb-4">
            <Button 
                variant="outline" 
                onClick={prevTab} 
                className="flex items-center gap-1"
            >
                <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            <Button 
                onClick={nextTab}
                className={`flex items-center gap-1 ${
                theme === "light"
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
            >
                Next <ChevronRight className="w-4 h-4" />
            </Button>
            </CardFooter>
        </Card>
        </div>
    );
};

export default VitalSignsForm;