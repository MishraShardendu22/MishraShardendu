"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useThemeStore } from "@/store/themeStore";
import { toast } from "react-hot-toast";
import { 
  Activity, 
  AlertCircle, 
  ClipboardList, 
  Stethoscope, 
  Upload,
  FileImage,
  CheckCircle,
  Clock,
  Brain,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import CloudinaryUpload from "./Cloud";
import ReactMarkdown from "react-markdown";

const DiseaseCheckerForm = () => {
  const [formData, setFormData] = useState({
    currentSymptoms: "",
    previousDiseases: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [llmResponse, setLlmResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useThemeStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.currentSymptoms || !formData.previousDiseases || !imageUrl) {
      toast.error("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    setLlmResponse("");

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GEMMA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-3-27b-it:free",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: `Symptoms: ${formData.currentSymptoms}` },
                { type: "text", text: `History: ${formData.previousDiseases}` },
                { type: "image_url", image_url: { url: imageUrl } },
              ],
            },
          ],
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) {
        setLlmResponse(reply);
      } else {
        toast.error("No response from LLM.");
      }
    } catch (error) {
      console.error(error);
      toast.error("LLM request failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormComplete = formData.currentSymptoms && formData.previousDiseases && imageUrl;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card className={`${
        theme === "light"
          ? "bg-white border-gray-200 text-slate-600 shadow-sm hover:shadow-md transition-shadow duration-200"
          : "bg-base-200/50 backdrop-blur-sm border-primary/10 shadow-sm hover:shadow-md transition-shadow duration-200"
      } overflow-hidden`}>
        <CardHeader className={`${
          theme === "light" 
            ? "bg-gray-50 border-b border-gray-200" 
            : "bg-base-300/30 border-b border-primary/10"
        }`}>
          <CardTitle className={`flex items-center text-lg font-semibold ${
            theme === "light" ? "text-gray-800" : "text-primary"
          }`}>
            <div className={`p-2 rounded-lg mr-3 ${
              theme === "light" ? "bg-white shadow-sm" : "bg-base-100/50"
            }`}>
              <Activity className={`w-5 h-5 ${
                theme === "light" ? "text-blue-500" : "text-primary"
              }`} />
            </div>
            AI Health Assessment
            <Badge className={`ml-3 ${
              theme === "light" 
                ? "bg-blue-100 text-blue-800 hover:bg-blue-200" 
                : "bg-primary/20 text-primary hover:bg-primary/30"
            }`}>
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Symptoms Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.3 }}
              className={`p-4 rounded-lg border ${
                theme === "light" 
                  ? "bg-gray-50 border-gray-200" 
                  : "bg-base-300/30 border-primary/10"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <label className={`flex items-center text-sm font-semibold ${
                  theme === "light" ? "text-gray-800" : "text-primary"
                }`}>
                  <div className={`p-1.5 rounded-md mr-2 ${
                    theme === "light" ? "bg-white shadow-sm" : "bg-base-100/50"
                  }`}>
                    <Stethoscope className={`w-4 h-4 ${
                      theme === "light" ? "text-red-500" : "text-error"
                    }`} />
                  </div>
                  Current Symptoms
                </label>
                {formData.currentSymptoms && (
                  <Badge variant="outline" className={`${
                    theme === "light" 
                      ? "border-green-200 text-green-700" 
                      : "border-success/30 text-success"
                  }`}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <Textarea
                name="currentSymptoms"
                value={formData.currentSymptoms}
                onChange={handleInputChange}
                rows={4}
                placeholder="Please describe your current symptoms in detail. Include when they started, severity, and any patterns you've noticed..."
                className={`resize-none ${
                  theme === "light" 
                    ? "bg-white border-gray-300 focus:border-blue-500" 
                    : "bg-base-100/50 border-base-300 focus:border-primary"
                } transition-colors`}
              />
            </motion.div>

            {/* Medical History Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.4 }}
              className={`p-4 rounded-lg border ${
                theme === "light" 
                  ? "bg-gray-50 border-gray-200" 
                  : "bg-base-300/30 border-primary/10"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <label className={`flex items-center text-sm font-semibold ${
                  theme === "light" ? "text-gray-800" : "text-primary"
                }`}>
                  <div className={`p-1.5 rounded-md mr-2 ${
                    theme === "light" ? "bg-white shadow-sm" : "bg-base-100/50"
                  }`}>
                    <ClipboardList className={`w-4 h-4 ${
                      theme === "light" ? "text-purple-500" : "text-secondary"
                    }`} />
                  </div>
                  Medical History
                </label>
                {formData.previousDiseases && (
                  <Badge variant="outline" className={`${
                    theme === "light" 
                      ? "border-green-200 text-green-700" 
                      : "border-success/30 text-success"
                  }`}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <Textarea
                name="previousDiseases"
                value={formData.previousDiseases}
                onChange={handleInputChange}
                rows={4}
                placeholder="Please provide your medical history including any previous diseases, surgeries, medications, allergies, and family medical history..."
                className={`resize-none ${
                  theme === "light" 
                    ? "bg-white border-gray-300 focus:border-blue-500" 
                    : "bg-base-100/50 border-base-300 focus:border-primary"
                } transition-colors`}
              />
            </motion.div>

            {/* Image Upload Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.5 }}
              className={`p-4 rounded-lg border ${
                theme === "light" 
                  ? "bg-gray-50 border-gray-200" 
                  : "bg-base-300/30 border-primary/10"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <label className={`flex items-center text-sm font-semibold ${
                  theme === "light" ? "text-gray-800" : "text-primary"
                }`}>
                  <div className={`p-1.5 rounded-md mr-2 ${
                    theme === "light" ? "bg-white shadow-sm" : "bg-base-100/50"
                  }`}>
                    <Upload className={`w-4 h-4 ${
                      theme === "light" ? "text-green-500" : "text-success"
                    }`} />
                  </div>
                  Upload Medical Image
                </label>
                {imageUrl && (
                  <Badge variant="outline" className={`${
                    theme === "light" 
                      ? "border-green-200 text-green-700" 
                      : "border-success/30 text-success"
                  }`}>
                    <FileImage className="w-3 h-3 mr-1" />
                    Image Uploaded
                  </Badge>
                )}
              </div>
              <div className="space-y-3">
                <CloudinaryUpload onUpload={setImageUrl} />
                {imageUrl && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ delay: 0.2 }}
                    className={`p-3 rounded-lg border ${
                      theme === "light" 
                        ? "bg-white border-gray-200" 
                        : "bg-base-100/50 border-base-300"
                    }`}
                  >
                    <p className={`text-xs font-medium uppercase tracking-wide mb-2 ${
                      theme === "light" ? "text-gray-500" : "text-base-content/70"
                    }`}>Uploaded Image Preview</p>
                    <img 
                      src={imageUrl} 
                      alt="Uploaded medical image" 
                      className="object-cover w-32 h-32 border rounded-lg shadow-sm"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Important Notice */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }}
            >
              <Alert className={`${
                theme === "light" 
                  ? "bg-amber-50 border-amber-200" 
                  : "bg-warning/10 border-warning/30"
              }`}>
                <AlertCircle className={`h-4 w-4 ${
                  theme === "light" ? "text-amber-600" : "text-warning"
                }`} />
                <AlertTitle className={`font-semibold ${
                  theme === "light" ? "text-amber-800" : "text-warning"
                }`}>
                  Important Medical Disclaimer
                </AlertTitle>
                <AlertDescription className={`${
                  theme === "light" ? "text-amber-700" : "text-warning/90"
                }`}>
                  This AI analysis is for informational purposes only and should not replace professional medical advice. 
                  Always consult with qualified healthcare professionals for proper diagnosis and treatment.
                </AlertDescription>
              </Alert>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.7 }}
              className="flex justify-center pt-2"
            >
              <Button
                type="submit"
                disabled={isSubmitting || !isFormComplete}
                className={`px-8 py-3 font-semibold transition-all duration-200 ${
                  isSubmitting 
                    ? "cursor-not-allowed opacity-50" 
                    : isFormComplete 
                      ? "hover:scale-105 shadow-lg hover:shadow-xl" 
                      : "opacity-60 cursor-not-allowed"
                }`}
                size="lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing with AI...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Get AI Health Assessment
                  </div>
                )}
              </Button>
            </motion.div>
          </form>

          {/* AI Response Section */}
          {llmResponse && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <div className={`p-4 rounded-lg border ${
                theme === "light" 
                  ? "bg-gray-50 border-gray-200" 
                  : "bg-base-300/30 border-primary/10"
              }`}>
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg mr-3 ${
                    theme === "light" ? "bg-white shadow-sm" : "bg-base-100/50"
                  }`}>
                    <Brain className={`w-5 h-5 ${
                      theme === "light" ? "text-blue-500" : "text-primary"
                    }`} />
                  </div>
                  <h3 className={`text-lg font-semibold ${
                    theme === "light" ? "text-gray-800" : "text-primary"
                  }`}>
                    AI Health Assessment Results
                  </h3>
                  <Badge className={`ml-3 ${
                    theme === "light" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-success/20 text-success"
                  }`}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Analysis Complete
                  </Badge>
                </div>
                <div className={`p-4 rounded-lg ${
                  theme === "light" ? "bg-white border border-gray-200" : "bg-base-100/50 border border-base-300"
                }`}>
                  <div className={`prose max-w-none ${
                    theme === "light" ? "prose-gray" : "prose-invert"
                  }`}>
                    <ReactMarkdown>{llmResponse}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DiseaseCheckerForm;