/* eslint-disable @typescript-eslint/no-unused-vars */
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PatientDetailsType } from "@/Types/Patient.types";
import { useThemeStore } from "@/store/themeStore";
import { motion } from "framer-motion";
import { 
    AlertTriangle, 
    CheckCircle2, 
    Stethoscope, 
    ArrowLeft, 
    ArrowRight,
    Activity,
    Search
    } from "lucide-react";
    import { Input } from "@/components/ui/input";
    import { useState, useMemo } from "react";

    interface Props {
    patientDetails: PatientDetailsType;
    handleCheckboxChange: (symptom: string, checked: boolean) => void;
    nextTab: () => void;
    prevTab: () => void;
    }

    const Symptoms = ({ patientDetails, handleCheckboxChange, prevTab, nextTab }: Props) => {
    const { theme } = useThemeStore();
    const [searchTerm, setSearchTerm] = useState("");
    
    const symptoms = Object.entries(patientDetails.symptoms);
    const selectedSymptomsCount = symptoms.filter(([_, isChecked]) => isChecked).length;
    const totalSymptoms = symptoms.length;
    
    // Filter symptoms based on search
    const filteredSymptoms = useMemo(() => {
        if (!searchTerm) return symptoms;
        return symptoms.filter(([symptom]) => 
        symptom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        symptom.replace(/([A-Z])/g, " $1").trim().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [symptoms, searchTerm]);

    // Group symptoms by category (you can customize this based on your symptom structure)
    const groupedSymptoms = useMemo(() => {
        const groups: { [key: string]: [string, boolean][] } = {
        "General": [],
        "Respiratory": [],
        "Digestive": [],
        "Neurological": [],
        "Other": []
        };
        
        filteredSymptoms.forEach(([symptom, isChecked]) => {
        const lowerSymptom = symptom.toLowerCase();
        if (lowerSymptom.includes('fever') || lowerSymptom.includes('fatigue') || lowerSymptom.includes('weakness')) {
            groups["General"].push([symptom, isChecked]);
        } else if (lowerSymptom.includes('cough') || lowerSymptom.includes('breath') || lowerSymptom.includes('chest')) {
            groups["Respiratory"].push([symptom, isChecked]);
        } else if (lowerSymptom.includes('nausea') || lowerSymptom.includes('vomit') || lowerSymptom.includes('stomach') || lowerSymptom.includes('diarrhea')) {
            groups["Digestive"].push([symptom, isChecked]);
        } else if (lowerSymptom.includes('headache') || lowerSymptom.includes('dizz') || lowerSymptom.includes('confusion')) {
            groups["Neurological"].push([symptom, isChecked]);
        } else {
            groups["Other"].push([symptom, isChecked]);
        }
        });
        
        // Remove empty groups
        return Object.entries(groups).filter(([_, symptoms]) => symptoms.length > 0);
    }, [filteredSymptoms]);

    const formatSymptomName = (symptom: string) => {
        return symptom.replace(/([A-Z])/g, " $1").trim();
    };

    return (
        <div className="space-y-6">
        {/* Header Section */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
        >
            <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
            theme === "light" ? "bg-blue-100" : "bg-primary/20"
            }`}>
            <Stethoscope className={`w-6 h-6 ${
                theme === "light" ? "text-blue-600" : "text-primary"
            }`} />
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${
            theme === "light" ? "text-gray-800" : "text-primary"
            }`}>
            Select Your Symptoms
            </h2>
            <p className={`text-sm ${
            theme === "light" ? "text-gray-600" : "text-base-content/70"
            }`}>
            Choose all symptoms you're currently experiencing
            </p>
        </motion.div>

        {/* Stats Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
        >
            <Card className={`${
            theme === "light"
                ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
                : "bg-gradient-to-r from-primary/10 to-primary/20 border-primary/20"
            }`}>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                    theme === "light" ? "bg-white shadow-sm" : "bg-base-100/50"
                    }`}>
                    <Activity className={`w-5 h-5 ${
                        selectedSymptomsCount > 0 
                        ? (theme === "light" ? "text-green-600" : "text-success")
                        : (theme === "light" ? "text-gray-400" : "text-base-content/50")
                    }`} />
                    </div>
                    <div>
                    <p className={`text-sm font-medium ${
                        theme === "light" ? "text-gray-700" : "text-base-content"
                    }`}>
                        Symptoms Selected
                    </p>
                    <p className={`text-2xl font-bold ${
                        theme === "light" ? "text-gray-900" : "text-primary"
                    }`}>
                        {selectedSymptomsCount} / {totalSymptoms}
                    </p>
                    </div>
                </div>
                
                {selectedSymptomsCount === 0 ? (
                    <Alert className={`${
                    theme === "light" 
                        ? "bg-amber-50 border-amber-200" 
                        : "bg-warning/10 border-warning/30"
                    } p-3`}>
                    <AlertTriangle className={`w-4 h-4 ${
                        theme === "light" ? "text-amber-500" : "text-warning"
                    }`} />
                    <AlertDescription className={`${
                        theme === "light" ? "text-amber-700" : "text-warning"
                    } text-sm`}>
                        Please select at least one symptom
                    </AlertDescription>
                    </Alert>
                ) : (
                    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    theme === "light" ? "bg-green-100 text-green-700" : "bg-success/20 text-success"
                    }`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Ready to proceed</span>
                    </div>
                )}
                </div>
            </CardContent>
            </Card>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                theme === "light" ? "text-gray-400" : "text-base-content/50"
            }`} />
            <Input
                type="text"
                placeholder="Search symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${
                theme === "light" 
                    ? "bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                    : "bg-base-100 border-base-300 focus:border-primary focus:ring-primary"
                }`}
            />
            </div>
        </motion.div>

        {/* Symptoms Grid */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
        >
            {groupedSymptoms.map(([category, categorySymptoms], categoryIndex) => (
            <Card key={category} className={`${
                theme === "light"
                ? "bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                : "bg-base-200/50 backdrop-blur-sm border-primary/10 shadow-sm hover:shadow-md transition-shadow duration-200"
            }`}>
                <CardHeader className={`pb-3 ${
                theme === "light" 
                    ? "bg-gray-50 border-b border-gray-200" 
                    : "bg-base-300/30 border-b border-primary/10"
                }`}>
                <CardTitle className={`text-lg font-semibold ${
                    theme === "light" ? "text-gray-800" : "text-primary"
                }`}>
                    {category} Symptoms
                    <span className={`ml-2 text-sm font-normal ${
                    theme === "light" ? "text-gray-500" : "text-base-content/70"
                    }`}>
                    ({categorySymptoms.filter(([_, isChecked]) => isChecked).length}/{categorySymptoms.length})
                    </span>
                </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {categorySymptoms.map(([symptom, isChecked], index) => (
                    <motion.div
                        key={symptom}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                        className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                        isChecked
                            ? theme === "light"
                            ? "bg-blue-50 border-blue-200 shadow-sm"
                            : "bg-primary/10 border-primary/30 shadow-sm"
                            : theme === "light"
                            ? "bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                            : "bg-base-100 border-base-300 hover:border-primary/50 hover:bg-primary/5"
                        }`}
                        onClick={() => handleCheckboxChange(symptom, !isChecked)}
                    >
                        <Checkbox
                        id={symptom}
                        checked={isChecked}
                        onCheckedChange={checked => handleCheckboxChange(symptom, checked === true)}
                        className={`w-5 h-5 rounded-sm ${
                            isChecked && theme === "light" ? "border-blue-500" : ""
                        }`}
                        />
                        <Label 
                        htmlFor={symptom} 
                        className={`text-sm font-medium cursor-pointer flex-1 ${
                            isChecked
                            ? theme === "light" ? "text-blue-700" : "text-primary"
                            : theme === "light" ? "text-gray-700" : "text-base-content"
                        }`}
                        >
                        {formatSymptomName(symptom)}
                        </Label>
                        {isChecked && (
                        <CheckCircle2 className={`w-4 h-4 ${
                            theme === "light" ? "text-blue-500" : "text-primary"
                        }`} />
                        )}
                    </motion.div>
                    ))}
                </div>
                </CardContent>
            </Card>
            ))}
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between pt-6"
        >
            <Button 
            variant="outline" 
            onClick={prevTab}
            className={`flex items-center space-x-2 px-6 py-3 ${
                theme === "light" 
                ? "border-gray-300 hover:bg-gray-50" 
                : "border-base-300 hover:bg-base-200"
            }`}
            >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
            </Button>
            
            <Button
            onClick={nextTab}
            disabled={selectedSymptomsCount === 0}
            className={`flex items-center space-x-2 px-6 py-3 ${
                theme === "light"
                ? "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300"
                : "bg-primary hover:bg-primary/90 text-primary-content disabled:bg-base-300"
            } transition-colors duration-200`}
            >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
            </Button>
        </motion.div>
        </div>
    );
};

export default Symptoms;