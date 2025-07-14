/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Upload, FileText, AlertCircle, CheckCircle, Eye, Activity, Brain, Scan, Image, Target, Stethoscope } from "lucide-react"
import { toast } from "react-hot-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const TBDetection = () => {
    const [tbFile, setTbFile] = useState<File | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisResult, setAnalysisResult] = useState<any>(null)
    const [heatmapImage, setHeatmapImage] = useState<string | null>(null)
    const [originalImage, setOriginalImage] = useState<string | null>(null)
    const { theme } = useThemeStore()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setTbFile(file)
            setAnalysisResult(null)
            setHeatmapImage(null)
            
            // Create preview of original image
            const reader = new FileReader()
            reader.onload = (e) => {
                setOriginalImage(e.target?.result as string)
            }
            reader.readAsDataURL(file)
            toast.success("Image uploaded successfully!")
        }
    }

    const handleAnalyze = async () => {
        if (!tbFile) {
            toast.error("Please select an image file first.")
            return
        }

        setIsAnalyzing(true)
        try {
            const formData = new FormData()
            formData.append('file', tbFile)
            
            // Call your Flask backend endpoint
            const response = await fetch('http://localhost:5001/vit_analyze', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const result = await response.json()
            
            if (result.success) {
                setAnalysisResult(result)
                setHeatmapImage(`data:image/png;base64,${result.heatmap_image}`)
                toast.success("TB analysis completed successfully!")
            } else {
                throw new Error(result.error || "Analysis failed")
            }
        } catch (error) {
            console.error("Error analyzing TB image:", error)
            toast.error("Failed to analyze TB image. Please ensure the backend server is running.")
        } finally {
            setIsAnalyzing(false)
        }
    }

    const resetAnalysis = () => {
        setTbFile(null)
        setAnalysisResult(null)
        setHeatmapImage(null)
        setOriginalImage(null)
        toast.success("Analysis reset successfully!")
    }

    const getResultColor = (prediction: string) => {
        if (prediction === "TB Detected") {
            return theme === "light" ? "text-red-600" : "text-red-400"
        }
        return theme === "light" ? "text-green-600" : "text-green-400"
    }

    const getResultBgColor = (prediction: string) => {
        if (prediction === "TB Detected") {
            return theme === "light" ? "bg-red-50 border-red-200 border-l-4 border-l-red-500" : "bg-red-500/10 border-red-500/30 border-l-4 border-l-red-400"
        }
        return theme === "light" ? "bg-green-50 border-green-200 border-l-4 border-l-green-500" : "bg-green-500/10 border-green-500/30 border-l-4 border-l-green-400"
    }

    const getResultIcon = (prediction: string) => {
        if (prediction === "TB Detected") {
            return <AlertCircle className={`w-5 h-5 ${getResultColor(prediction)}`} />
        }
        return <CheckCircle className={`w-5 h-5 ${getResultColor(prediction)}`} />
    }

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
                    TB Detection
                </h1>
                <p className={`mt-2 text-sm md:text-base ${
                    theme === "light" ? "text-gray-600" : "text-base-content/70"
                }`}>
                    Upload chest X-ray images for AI-powered tuberculosis detection and analysis
                </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Upload Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1"
                >
                    <Card className={`${
                        theme === "light"
                            ? "bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
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
                                    <Brain className={`w-5 h-5 ${
                                        theme === "light" ? "text-blue-600" : "text-primary"
                                    }`} />
                                </div>
                                TB Detection
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {/* File Upload Area */}
                                <div className="space-y-3">
                                    <div className="flex items-center mb-2">
                                        <Image className={`w-4 h-4 mr-2 ${
                                            theme === "light" ? "text-gray-500" : "text-base-content/70"
                                        }`} />
                                        <label className={`text-sm font-semibold uppercase tracking-wide ${
                                            theme === "light" ? "text-gray-700" : "text-base-content"
                                        }`}>
                                            Chest X-Ray Image
                                        </label>
                                    </div>
                                    <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                                        theme === "light" 
                                            ? "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50" 
                                            : "border-base-300 bg-base-100 hover:border-primary hover:bg-primary/5"
                                    } transition-all duration-200 cursor-pointer group`}>
                                        <Upload className={`w-8 h-8 mx-auto mb-3 ${
                                            theme === "light" ? "text-gray-400 group-hover:text-blue-500" : "text-base-content/50 group-hover:text-primary"
                                        } transition-colors duration-200`} />
                                        <label className={`block text-sm font-medium cursor-pointer ${
                                            theme === "light" ? "text-gray-700" : "text-base-content"
                                        }`}>
                                            <Input
                                                type="file"
                                                accept=".jpg,.jpeg,.png"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            Click to upload or drag and drop
                                        </label>
                                        <p className={`text-xs mt-2 ${
                                            theme === "light" ? "text-gray-500" : "text-base-content/70"
                                        }`}>
                                            Supported formats: JPG, JPEG, PNG (Max 16MB)
                                        </p>
                                    </div>
                                </div>

                                {/* Selected File Display */}
                                {tbFile && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`p-4 rounded-lg border ${
                                            theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-100/50 border-base-300"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center flex-1 min-w-0">
                                                <div className={`p-2 rounded-lg mr-3 ${
                                                    theme === "light" ? "bg-blue-50" : "bg-primary/10"
                                                }`}>
                                                    <FileText className={`w-4 h-4 ${
                                                        theme === "light" ? "text-blue-500" : "text-primary"
                                                    }`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-medium truncate ${
                                                        theme === "light" ? "text-gray-700" : "text-base-content"
                                                    }`}>
                                                        {tbFile.name}
                                                    </p>
                                                    <p className={`text-xs ${
                                                        theme === "light" ? "text-gray-500" : "text-base-content/70"
                                                    }`}>
                                                        {Math.round(tbFile.size / 1024)} KB
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={resetAnalysis}
                                                className={`text-red-500 hover:text-red-700 hover:${
                                                    theme === "light" ? "bg-red-50" : "bg-red-500/10"
                                                } ml-2`}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Button
                                        onClick={handleAnalyze}
                                        disabled={!tbFile || isAnalyzing}
                                        className={`flex-1 h-12 text-base font-semibold ${
                                            theme === "light"
                                                ? "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300"
                                                : "bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-base-300"
                                        } transition-all duration-200 disabled:cursor-not-allowed`}
                                    >
                                        {isAnalyzing ? (
                                            <>
                                                <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                <Scan className="w-5 h-5 mr-2" />
                                                Analyze Image
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {/* Info Alert */}
                                {!tbFile && (
                                    <Alert className={`border-l-4 ${
                                        theme === "light" 
                                            ? "border-l-blue-500 bg-blue-50 border-blue-200" 
                                            : "border-l-info bg-info/10 border-info/30"
                                    }`}>
                                        <AlertCircle className={`w-4 h-4 ${
                                            theme === "light" ? "text-blue-500" : "text-info"
                                        }`} />
                                        <AlertTitle className={`${
                                            theme === "light" ? "text-blue-700" : "text-info"
                                        } font-semibold`}>
                                            Getting Started
                                        </AlertTitle>
                                        <AlertDescription className={`${
                                            theme === "light" ? "text-blue-600" : "text-info"
                                        }`}>
                                            Upload a clear chest X-ray image to begin AI-powered tuberculosis detection analysis.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Results Section */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Analysis Progress */}
                    {isAnalyzing && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: 0.2 }}
                        >
                            <Card className={`${
                                theme === "light"
                                    ? "bg-white border-gray-200 shadow-sm"
                                    : "bg-base-200/50 backdrop-blur-sm border-primary/10"
                            }`}>
                                <CardHeader>
                                    <CardTitle className={`flex items-center ${
                                        theme === "light" ? "text-gray-800" : ""
                                    }`}>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="mr-3"
                                        >
                                            <Activity className="w-6 h-6 text-blue-500" />
                                        </motion.div>
                                        AI Analysis in Progress
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {[
                                            { step: "Processing X-ray image", icon: "🖼️", delay: 0 },
                                            { step: "Running deep learning analysis", icon: "🧠", delay: 1 },
                                            { step: "Detecting TB patterns", icon: "🔍", delay: 2 },
                                            { step: "Generating heatmap visualization", icon: "🎯", delay: 3 }
                                        ].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: item.delay * 0.5 }}
                                                className={`flex items-center space-x-3 p-3 rounded-lg ${
                                                    theme === "light" ? "bg-gray-50" : "bg-base-100/50"
                                                }`}
                                            >
                                                <span className="text-2xl">{item.icon}</span>
                                                <span className={`${
                                                    theme === "light" ? "text-gray-700" : "text-base-content"
                                                }`}>
                                                    {item.step}
                                                </span>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ delay: item.delay * 0.5 + 0.5, duration: 1 }}
                                                    className="ml-auto h-1 bg-blue-500 rounded-full flex-1 max-w-[100px]"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Analysis Results */}
                    {analysisResult && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Prediction Result */}
                            <Card className={`${
                                theme === "light"
                                    ? "bg-white border-gray-200 shadow-sm"
                                    : "bg-base-200/50 backdrop-blur-sm border-primary/10"
                            }`}>
                                <CardHeader>
                                    <CardTitle className={`flex items-center ${
                                        theme === "light" ? "text-gray-800" : ""
                                    }`}>
                                        <Target className="w-6 h-6 mr-2 text-blue-500" />
                                        Detection Results
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Alert className={`${getResultBgColor(analysisResult.prediction)}`}>
                                        {getResultIcon(analysisResult.prediction)}
                                        <AlertTitle className={`font-bold text-xl ${getResultColor(analysisResult.prediction)}`}>
                                            {analysisResult.prediction}
                                        </AlertTitle>
                                        <AlertDescription className="mt-2">
                                            <div className={`text-sm ${
                                                theme === "light" ? "text-gray-600" : "text-base-content/70"
                                            }`}>
                                                {/* <p className="mb-1">
                                                    <strong>TB Detection Confidence:</strong> {(analysisResult.confidence.tb_detected * 100).toFixed(1)}%
                                                </p>
                                                <p>
                                                    <strong>Normal Confidence:</strong> {(analysisResult.confidence.normal * 100).toFixed(1)}%
                                                </p> */}
                                            </div>
                                        </AlertDescription>
                                    </Alert>
                                </CardContent>
                            </Card>

                           {/* Visual Analysis */}
                            <Card className={`${
                                theme === "light"
                                    ? "bg-white border-gray-200 shadow-sm"
                                    : "bg-base-200/50 backdrop-blur-sm border-primary/10"
                            }`}>
                            <CardHeader>
                                <CardTitle className={`flex items-center ${
                                    theme === "light" ? "text-gray-800" : ""
                                }`}>
                                <Eye className="w-6 h-6 mr-2 text-green-500" />
                                Visual Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Always show original image */}
                                {originalImage && (
                                    <div className="space-y-3">
                                    <h4 className="text-sm font-semibold">Original X‑ray</h4>
                                    <img 
                                        src={originalImage} 
                                        alt="Original X‑ray" 
                                        className="object-cover w-full h-64 rounded-lg"
                                    />
                                    </div>
                                )}

                                {/* Show heatmap only if TB Detected */}
                                {analysisResult.prediction === "TB Detected" && heatmapImage && (
                                    <div className="space-y-3">
                                    <h4 className="text-sm font-semibold">AI Heatmap</h4>
                                    <img 
                                        src={heatmapImage} 
                                        alt="AI Heatmap" 
                                        className="object-cover w-full h-64 rounded-lg"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Red areas = regions of highest TB attention
                                    </p>
                                    </div>
                                )}

                                {/* Friendly “normal” message */}
                                {analysisResult.prediction === "Normal" && (
                                    <div className="col-span-full text-center text-sm text-green-600">
                                    No suspicious patterns detected — TB confidence {(analysisResult.confidence.tb_detected * 100).toFixed(1)}%
                                    </div>
                                )}
                                </div>
                            </CardContent>
                            </Card>

                            {/* Medical Disclaimer */}
                            <Alert className={`${
                                theme === "light" 
                                    ? "bg-yellow-50 border-yellow-200 border-l-4 border-l-yellow-500" 
                                    : "bg-warning/10 border-warning/30 border-l-4 border-l-warning"
                            }`}>
                                <Stethoscope className={`w-4 h-4 ${
                                    theme === "light" ? "text-yellow-600" : "text-warning"
                                }`} />
                                <AlertTitle className={`${
                                    theme === "light" ? "text-yellow-700" : "text-warning"
                                } font-semibold`}>
                                    Medical Disclaimer
                                </AlertTitle>
                                <AlertDescription className={`${
                                    theme === "light" ? "text-yellow-600" : "text-warning"
                                }`}>
                                    This AI analysis is for informational and research purposes only. It should not be used as a substitute for professional medical diagnosis, treatment, or advice. Please consult with a qualified healthcare professional for proper medical evaluation and care.
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {!analysisResult && !isAnalyzing && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: 0.2 }}
                        >
                            <Card className={`${
                                theme === "light"
                                    ? "bg-white border-gray-200 shadow-sm"
                                    : "bg-base-200/50 backdrop-blur-sm border-primary/10"
                            }`}>
                                <CardContent className="p-12 text-center">
                                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                                        theme === "light" ? "bg-gradient-to-r from-blue-100 to-indigo-100" : "bg-gradient-to-r from-primary/20 to-secondary/20"
                                    }`}>
                                        <Brain className={`w-10 h-10 ${
                                            theme === "light" ? "text-blue-500" : "text-primary"
                                        }`} />
                                    </div>
                                    <h3 className={`text-xl font-bold mb-3 ${
                                        theme === "light" ? "text-gray-800" : "text-base-content"
                                    }`}>
                                        Advanced AI TB Detection
                                    </h3>
                                    <p className={`text-base mb-4 ${
                                        theme === "light" ? "text-gray-600" : "text-base-content/70"
                                    }`}>
                                        Upload a chest X-ray image to begin AI-powered analysis for tuberculosis detection
                                    </p>
                                    <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
                                        {[
                                            { icon: <Upload className="w-6 h-6" />, title: "Upload", desc: "High-quality X-ray" },
                                            { icon: <Brain className="w-6 h-6" />, title: "Analyze", desc: "AI deep learning" },
                                            { icon: <Target className="w-6 h-6" />, title: "Results", desc: "Detailed insights" }
                                        ].map((step, index) => (
                                            <div key={index} className={`p-4 rounded-lg ${
                                                theme === "light" ? "bg-gray-50" : "bg-base-100/50"
                                            }`}>
                                                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                                                    theme === "light" ? "bg-white shadow-sm" : "bg-base-200"
                                                }`}>
                                                    {step.icon}
                                                </div>
                                                <h4 className={`font-semibold text-sm ${
                                                    theme === "light" ? "text-gray-800" : "text-base-content"
                                                }`}>
                                                    {step.title}
                                                </h4>
                                                <p className={`text-xs ${
                                                    theme === "light" ? "text-gray-600" : "text-base-content/70"
                                                }`}>
                                                    {step.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TBDetection