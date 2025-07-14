/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PickerOverlay } from "filestack-react";
import axiosInstance from "@/lib/axiosInstance";
import { PatientStore } from "@/store/patient.store";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  File,
  X,
  AlertTriangle,
  Send,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface ThrombectomyProps {
  nextTab: () => void;
  prevTab: () => void;
  handleSubmit?: () => void;
}

const UploadComponent: React.FC<ThrombectomyProps> = ({ nextTab, prevTab }) => {
  const patient = PatientStore((state) => state.patient);
  const patientEmail = patient?.patientEmail;

  const navigate = useNavigate();

  const [documentUrl, setDocumentUrl] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [isPickerOverlayVisible, setIsPickerOverlayVisible] = useState(false);

  const options = {
    accept: [
      ".pdf",
      ".doc",
      ".csv",
      ".ppt",
      ".txt",
      ".xls",
      ".pptx",
      ".docx",
      ".xlsx",
      "image/*",
      "video/*",
      "image/png",
      "image/jpeg",
    ],
    fromSources: ["url", "camera", "local_file_system"],
    transformations: { crop: true, circle: true, rotate: true },
    maxFiles: 5,
    storeTo: { location: "s3" },
  };

  const sendDocument = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!patientEmail || !documentUrl || !documentName) {
      toast.error(
        "Missing required fields: Patient email, document name, or document URL."
      );
      return;
    }

    try {
      await axiosInstance.put("/patient/sendDocument", {
        documentUrl,
        patientEmail,
        documentName,
      });

      setDocumentUrl("");
      setDocumentName("");
      toast.success("Document sent successfully");
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

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

const selectCategory = async () => {
  enum PatientConditionEnum {
    HEMORRHAGE = "hemorrhage",
    NO_HEMORRHAGE = "no_hemorrhage",
    LARGE_VESSEL_OCCLUSION = "large_vessel_occlusion",
  }

  if (selectedOption) {
    const patientCondition =
      selectedOption === "Hemorrhage"
        ? PatientConditionEnum.HEMORRHAGE
        : selectedOption === "No Hemorrhage"
        ? PatientConditionEnum.NO_HEMORRHAGE
        : PatientConditionEnum.LARGE_VESSEL_OCCLUSION;

    try {
      await axiosInstance.put("/patient/tellCondition", {
        patientEmail,
        patientCondition,
      });

      if (patientCondition === PatientConditionEnum.HEMORRHAGE) {
        navigate("/patient/hemorrhage");
      } else if (patientCondition === PatientConditionEnum.NO_HEMORRHAGE) {
        navigate("/patient/no-hemorrhage");
      } else {
        navigate("/patient/occlusionclot");
      }
    } catch (error) {
      toast.error("Failed to update patient condition");
      console.error(error);
    }
  }
};


  return (
    <div className="px-4 py-6">
      <Card className="w-full max-w-4xl mx-auto border-t-4 border-t-primary shadow-lg rounded-lg overflow-hidden dark:bg-card dark:border-t-primary/80">
        <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-background dark:from-primary/20 dark:to-background/20">
          <CardTitle className="text-2xl text-primary flex items-center gap-2">
            <File className="h-6 w-6 text-primary" />
            CTA and CT Upload
          </CardTitle>
          {patientEmail && (
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span className="font-medium mr-2">Patient:</span>
              <span className="text-primary">{patientEmail}</span>
            </div>
          )}
        </CardHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {selectedOption || "Select Condition"}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Condition</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setSelectedOption("Hemorrhage")}>
              Hemorrhage
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedOption("No Hemorrhage")}
            >
              No Hemorrhage
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedOption("Large vessel occlusion")}
            >
              Large vessel occlusion / abrupt cut-off
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <CardContent className="space-y-6 p-6">
          {!patientEmail && (
            <Alert
              variant="destructive"
              className="border border-destructive/20 bg-destructive/10 text-destructive rounded-lg"
            >
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <AlertDescription className="ml-2">
                No patient selected. Please select a patient before uploading
                documents.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1">
                <label
                  htmlFor="documentName"
                  className="text-sm font-medium text-foreground mb-1 block"
                >
                  Document Name
                </label>
                <Input
                  id="documentName"
                  placeholder="Enter document name"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="bg-background text-foreground border-border focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={openFilePicker}
                className="flex items-center gap-2 h-10 whitespace-nowrap border-border text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Upload className="h-4 w-4" />
                Upload File
              </Button>
            </div>

            {documentUrl && (
              <div className="flex items-center p-3 bg-accent/20 border border-border rounded-md">
                <Badge className="bg-accent text-accent-foreground hover:bg-accent/80 mr-2 py-1">
                  File
                </Badge>
                <span className="text-sm text-foreground flex-1 truncate">
                  {documentName}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDocumentUrl("");
                    setDocumentName("");
                  }}
                  className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 rounded-full p-1 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between border-t border-border pt-4 px-6 pb-6 bg-muted/30">
          <div className="flex w-full justify-between items-center space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevTab}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <form
                onSubmit={sendDocument}
                className="flex flex-col sm:flex-row items-center gap-2 w-full"
              >
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 shadow-md w-full sm:w-auto mb-2 sm:mb-0"
                  disabled={!documentUrl || !documentName}
                >
                  <Send className="h-4 w-4" />
                  Send Document
                </Button>
                {selectedOption && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      selectCategory();
                      nextTab();
                    }}
                    className="flex items-center gap-2 w-full sm:w-auto"
                  >
                    Process Report
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </form>
            </div>
          </div>
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
    </div>
  );
};

export default UploadComponent;