/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";
import { PatientDetailsType } from "@/Types/Patient.types";
import TabsNavigation from "./TabsNavigation";
import PersonalDetails from "./PersonalDetails";
import VitalSigns from "./VitalSigns";
import Symptoms from "./Symptoms";
import ExclusionForm from "./ExclusionForm";
import Upload from "./Upload";

const StrokeAssessment = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [patientDetails, setPatientDetails] = useState<PatientDetailsType>({
    patientWeight: "",
    patientDOB: "",
    patientEmail: "",
    patientMedicalHistory: "",
    patientLastKnownNormal: "",
    vitalSigns: {
      BP: "",
      HeartRate: "",
      Temperature: "",
      OxygenSaturation: "",
      Height: 0,
      Weight: 0
    },
    symptoms: {
      Weakness: false,
      Numbness: false,
      FacialDroop: false,
      LossOfBalance: false,
      SpeechDifficulties: false,
      SuddenVisionChanges: false,
    },
    exclusionList: {
      anticoagulantMedicationsLast48Hours: {
        pradaxa: false,
        xarelto: false,
        coumadin: false,
        apixaban: false,
        edoxaban: false,
        therapeuticLovenox: false,
      },
      historyIntracranialHemorrhage: false,
      gastrointestinalBleedLast21Days: false,
      intracranialIntraspinalSurgeryLast3Months: false,
    },
  });

  const { theme } = useThemeStore();

  const handleVitalSignsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientDetails(prev => ({
      ...prev,
      vitalSigns: { ...prev.vitalSigns, [e.target.name]: e.target.value }
    }));
  };

  const handleCheckboxChange = (symptom: string, checked: boolean) => {
    setPatientDetails(prev => ({
      ...prev,
      symptoms: { ...prev.symptoms, [symptom]: checked }
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleExclusionChange = (key: string, checked: boolean) => {
    if (key.includes(".")) {
      const [parent, child] = key.split(".");
      setPatientDetails(prev => ({
        ...prev,
        exclusionList: {
          ...prev.exclusionList,
          [parent]: {
            ...(prev.exclusionList as any)[parent],
            [child]: checked
          }
        }
      }));
    } else {
      setPatientDetails(prev => ({
        ...prev,
        exclusionList: {
          ...prev.exclusionList,
          [key]: checked
        }
      }));
    }
  };

  return (
    <div className="container p-4 mx-auto md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="mb-6 md:mb-8"
      >
        <h1 className={`text-2xl md:text-4xl font-bold ${
          theme === "light" ? "text-gray-800" : "text-primary"
        }`}>
          Stroke Assessment
        </h1>
        <p className={`mt-2 text-sm ${
          theme === "light" ? "text-gray-600" : "text-base-content/70"
        }`}>
          Complete the stroke assessment form step by step
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.1 }}
      >
        <Card className={`${
          theme === "light"
            ? "bg-white border-gray-200 shadow-sm hover:shadow-md"
            : "bg-base-200/50 backdrop-blur-sm border-primary/10 shadow-sm hover:shadow-md"
        } transition-shadow duration-200 overflow-hidden`}>
          <CardContent className="p-6">
            <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="mt-6">
              {activeTab === "personal" && (
                <PersonalDetails
                  patientDetails={patientDetails}
                  handleChange={handleChange}
                  nextTab={() => setActiveTab("vitals")}
                />
              )}
              
              {activeTab === "vitals" && (
                <VitalSigns
                  patientDetails={patientDetails}
                  handleVitalSignsChange={handleVitalSignsChange}
                  nextTab={() => setActiveTab("symptoms")}
                  prevTab={() => setActiveTab("personal")}
                />
              )}
              
              {activeTab === "symptoms" && (
                <Symptoms
                  patientDetails={patientDetails}
                  handleCheckboxChange={handleCheckboxChange}
                  nextTab={() => setActiveTab("exclusion")}
                  prevTab={() => setActiveTab("vitals")}
                />
              )}
              
              {activeTab === "exclusion" && (
                <ExclusionForm
                  patientDetails={patientDetails}
                  handleCheckboxChange={handleExclusionChange}
                  nextTab={() => setActiveTab("upload")}
                  prevTab={() => setActiveTab("symptoms")}
                />
              )}
              
              {activeTab === "upload" && (
                <Upload />
              )}
              
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StrokeAssessment;