import { useEffect, useState } from "react";
import axios from "axios";
import { PatientStore } from "@/store/patient.store";
import { marked } from "marked";
import { FileText, Loader2 } from "lucide-react";

const Upload = () => {
  const patient = PatientStore((state) => state.patient);
  const [report, setReport] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!patient?.patientEmail) {
      setReport("Patient data is not available.");
      return;
    }

    setIsLoading(true);

    const prompt = `
You are a medical AI assistant. Based on the following patient data, generate a detailed stroke assessment report. Include analysis of symptoms, vital signs, exclusion criteria, and any medical concerns. Output in clinical summary format.

Patient Data:
- DOB: ${patient.patientDOB || "N/A"}
- Email: ${patient.patientEmail}
- Weight: ${patient.patientWeight || "N/A"}
- Last Known Normal: ${patient.patientLastKnownNormal || "N/A"}
- Medical History: ${patient.patientMedicalHistory || "N/A"}

Symptoms:
${Object.entries(patient.symptoms || {}).map(([k, v]) => `- ${k}: ${v}`).join("\n") || "None provided"}

Vital Signs:
- BP: ${patient.vitalSigns?.BP || "N/A"}
- Heart Rate: ${patient.vitalSigns?.HeartRate || "N/A"}
- Temperature: ${patient.vitalSigns?.Temperature || "N/A"}
- Oxygen Saturation: ${patient.vitalSigns?.OxygenSaturation || "N/A"}
- Height: ${patient.vitalSigns?.Height || "N/A"}
- Weight: ${patient.vitalSigns?.Weight || "N/A"}

Exclusion Criteria:
${Object.entries(patient.exclusionList?.anticoagulantMedicationsLast48Hours || {}).map(([k, v]) => `- ${k}: ${v}`).join("\n") || "None provided"}
- History of Intracranial Hemorrhage: ${patient.exclusionList?.historyIntracranialHemorrhage || "N/A"}
- GI Bleed (last 21 days): ${patient.exclusionList?.gastrointestinalBleedLast21Days || "N/A"}
- Intracranial/Intraspinal Surgery (last 3 months): ${patient.exclusionList?.intracranialIntraspinalSurgeryLast3Months || "N/A"}
`;

    try {
      const res = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": import.meta.env.VITE_GOOGLE_API_KEY,
          },
        }
      );

      const text =
        res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No report generated.";
      setReport(text);
    } catch (err) {
      console.error(err);
      setReport("Error generating report.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (patient?.patientEmail) handleGenerate();
  }, [patient]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Stroke Assessment Report</h1>
            </div>
          </div>
          
          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Generating comprehensive report...</p>
                  <p className="text-gray-500 text-sm mt-2">Analyzing patient data and medical indicators</p>
                </div>
              </div>
            ) : report ? (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <div
                  className="prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: marked(report) }}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No report available</p>
                <p className="text-gray-500 text-sm mt-2">Patient data is required to generate a report</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;