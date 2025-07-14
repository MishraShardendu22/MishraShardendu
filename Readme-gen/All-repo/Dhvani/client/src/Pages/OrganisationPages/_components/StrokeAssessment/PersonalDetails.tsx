import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, Clock, Weight, FileText } from "lucide-react";
import { PatientDetailsType } from "@/Types/Patient.types";
import { useThemeStore } from "@/store/themeStore";

interface Props {
    patientDetails: PatientDetailsType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    nextTab: () => void;
}

const PersonalDetails = ({ patientDetails, handleChange, nextTab }: Props) => {
    const { theme } = useThemeStore();
    
    const isFormComplete = () => {
        return (
            patientDetails.patientEmail &&
            patientDetails.patientDOB &&
            patientDetails.patientLastKnownNormal &&
            patientDetails.patientWeight &&
            patientDetails.patientMedicalHistory
        );
    };

    const iconColor = theme === "light" ? "text-gray-500" : "text-base-content/70";

    return (
        <div className="space-y-8 text-slate-800">
            {/* Header */}
            <div className="space-y-1">
                <h2 className="text-lg font-semibold">Personal Details</h2>
                <p className={`text-sm ${iconColor}`}>
                    Please provide the following information to continue
                </p>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6">
                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="patientEmail" className="text-sm font-medium">
                        Email Address *
                    </Label>
                    <div className="relative">
                        <div className={`absolute inset-y-0 left-0 flex items-center pl-3 ${iconColor}`}>
                            <Mail className="w-4 h-4" />
                        </div>
                        <Input
                            id="patientEmail"
                            name="patientEmail"
                            type="email"
                            placeholder="patient@example.com"
                            className="pl-10 h-11"
                            value={patientDetails.patientEmail}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                    <Label htmlFor="patientDOB" className="text-sm font-medium">
                        Date of Birth *
                    </Label>
                    <div className="relative">
                        <div className={`absolute inset-y-0 left-0 flex items-center pl-3 ${iconColor}`}>
                            <Calendar className="w-4 h-4" />
                        </div>
                        <Input
                            id="patientDOB"
                            name="patientDOB"
                            type="date"
                            className="pl-10 h-11"
                            value={patientDetails.patientDOB}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Last Known Normal Time */}
                <div className="space-y-2">
                    <Label htmlFor="patientLastKnownNormal" className="text-sm font-medium">
                        Last Known Normal Time *
                    </Label>
                    <div className="relative">
                        <div className={`absolute inset-y-0 left-0 flex items-center pl-3 ${iconColor}`}>
                            <Clock className="w-4 h-4" />
                        </div>
                        <Input
                            id="patientLastKnownNormal"
                            name="patientLastKnownNormal"
                            type="datetime-local"
                            className="pl-10 h-11"
                            value={patientDetails.patientLastKnownNormal}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Weight */}
                <div className="space-y-2">
                    <Label htmlFor="patientWeight" className="text-sm font-medium">
                        Weight (kg) *
                    </Label>
                    <div className="relative">
                        <div className={`absolute inset-y-0 left-0 flex items-center pl-3 ${iconColor}`}>
                            <Weight className="w-4 h-4" />
                        </div>
                        <Input
                            id="patientWeight"
                            name="patientWeight"
                            type="number"
                            placeholder="70"
                            className="pl-10 h-11"
                            value={patientDetails.patientWeight}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Medical History */}
                <div className="space-y-2">
                    <Label htmlFor="patientMedicalHistory" className="text-sm font-medium">
                        Medical History *
                    </Label>
                    <div className="relative">
                        <div className={`absolute inset-y-0 left-0 flex items-center pl-3 ${iconColor}`}>
                            <FileText className="w-4 h-4" />
                        </div>
                        <Input
                            id="patientMedicalHistory"
                            name="patientMedicalHistory"
                            type="text"
                            placeholder="Brief medical history..."
                            className="pl-10 h-11"
                            value={patientDetails.patientMedicalHistory}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                    {!isFormComplete() && (
                        <>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                            <span className={`text-sm ${iconColor}`}>
                                Complete all required fields to continue
                            </span>
                        </>
                    )}
                    {isFormComplete() && (
                        <>
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className={`text-sm text-green-600 dark:text-green-400`}>
                                All fields completed
                            </span>
                        </>
                    )}
                </div>
                
                <Button
                    onClick={nextTab}
                    disabled={!isFormComplete()}
                    className={`${
                        theme === "light"
                            ? "bg-primary hover:bg-primary/90 text-white"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                    } px-6 h-11 font-medium transition-all duration-200 ${
                        isFormComplete() ? 'shadow-md hover:shadow-lg' : ''
                    }`}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default PersonalDetails;