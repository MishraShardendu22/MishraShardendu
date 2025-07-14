/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import toast from "react-hot-toast";
import { PickerOverlay } from "filestack-react";
import axiosInstance from "@/lib/axiosInstance";
import { PatientStore } from "@/store/patient.store";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Alert, 
  AlertDescription 
} from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  File, 
  X, 
  AlertTriangle, 
  Send,
  ChevronRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Thrombectomy = () => {
  const patient = PatientStore((state) => state.patient);
  const patientEmail = patient?.patientEmail;
  
  const [documentUrl, setDocumentUrl] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [isPickerOverlayVisible, setIsPickerOverlayVisible] = useState(false);

  const navigate = useNavigate();

  const options = {
    accept: [
      ".pdf", ".doc", ".csv", ".ppt", ".txt", ".xls", ".pptx", ".docx", 
      ".xlsx", "image/*", "video/*", "image/png", "image/jpeg"
    ],
    fromSources: ["url", "camera", "local_file_system"],
    transformations: { crop: true, circle: true, rotate: true },
    maxFiles: 5,
    storeTo: { location: "s3" },
  };

  const sendDocument = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Sending document", documentUrl, documentName);
    console.log("Patient email", patientEmail);

    if (!patientEmail || !documentUrl || !documentName) {
      toast.error("Missing required fields: Patient email, document name, or document URL.");
      return;
    }

    try {
      await axiosInstance.put("/patient/sendDocument", {
        email: patientEmail,
        documentName,
        documentUrl,
      });

      setDocumentUrl("");
      toast.success("Document sent successfully");
      setDocumentName("");

      navigate("/patient/allReports")
    } catch (error) {
      console.error(error);
      toast.error("Failed to send document");
    }
  };

  const onSuccess = (result: any) => {
    if (result.filesUploaded.length > 0) {
      setDocumentUrl(result.filesUploaded[0].url);
      setDocumentName(result.filesUploaded[0].filename || "Uploaded File");
      toast.success("File uploaded successfully");
      setIsPickerOverlayVisible(false);
    }
  };

  const onError = (error: any) => {
    console.error("Upload error:", error);
    toast.error("File upload failed");
    setIsPickerOverlayVisible(false);
  };

  const openFilePicker = () => {
    setIsPickerOverlayVisible(true);
  };

  return (
    <div className="px-4 py-6">
      <Card className="max-w-3xl mx-auto border-t-4 border-t-blue-600 shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-white">
          <CardTitle className="text-2xl text-blue-700 flex items-center gap-2">
            <File className="h-6 w-6 text-blue-600" />
            Thrombectomy Document Upload
          </CardTitle>
          {patientEmail && (
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span className="font-medium mr-2">Patient:</span>
              <span className="text-blue-600">{patientEmail}</span>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6 p-6">
          {!patientEmail && (
            <Alert variant="destructive" className="border border-red-200 bg-red-50 text-red-800 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <AlertDescription className="ml-2 text-red-700">
                No patient selected. Please select a patient before uploading documents.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1">
                <label htmlFor="documentName" className="text-sm font-medium text-gray-700 mb-1 block">
                  Document Name
                </label>
                <Input
                  id="documentName"
                  placeholder="Enter document name"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="bg-white text-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={openFilePicker}
                className="flex items-center gap-2 h-10 whitespace-nowrap border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 shadow-sm"
              >
                <Upload className="h-4 w-4" />
                Upload File
              </Button>
            </div>
            
            {documentUrl && (
              <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-md">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mr-2 py-1">
                  File
                </Badge>
                <span className="text-sm text-gray-800 flex-1 truncate">{documentName}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {setDocumentUrl(""); setDocumentName("");}}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full p-1 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end border-t border-gray-200 pt-4 px-6 pb-6 bg-gray-50">
          <form onSubmit={sendDocument} className="w-full">
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-md"
                disabled={!documentUrl || !documentName}
              >
                <Send className="h-4 w-4" />
                Send Document
              </Button>
            </div>
          </form>
        </CardFooter>
        
        {isPickerOverlayVisible && (
          <PickerOverlay
            apikey={import.meta.env.VITE_FILESTACK_API_KEY as string}
            onError={onError}
            onSuccess={onSuccess}
            pickerOptions={options}
          />
        )}
      </Card>

      <div className="max-w-3xl mx-auto mt-6 flex justify-end">
        <Link to="/patient/allReports">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 shadow-md">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Thrombectomy;